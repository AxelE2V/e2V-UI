"""
Contacts API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional, List

from core.database import get_db
from models.contact import Contact, ContactStatus, Industry, Persona, CompanySegment, ICPTier
from schemas.contact import (
    ContactCreate, ContactUpdate, ContactResponse, ContactListResponse,
    ContactScoreUpdate, ICPScoreResponse, EnrichmentResponse, EnrichmentBatchResponse
)
from services.enrichment import enrichment_service

router = APIRouter()


@router.get("/", response_model=ContactListResponse)
def list_contacts(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100),
    status: Optional[ContactStatus] = None,
    industry: Optional[Industry] = None,
    persona: Optional[Persona] = None,
    search: Optional[str] = None,
    in_sequence: Optional[bool] = None,
    # ICP filters
    icp_tier: Optional[ICPTier] = None,
    company_segment: Optional[CompanySegment] = None,
    min_score: Optional[int] = Query(None, ge=0, le=10),
    # Sorting
    sort_by: Optional[str] = Query("created_at", regex="^(created_at|icp_score|company)$"),
    sort_order: Optional[str] = Query("desc", regex="^(asc|desc)$"),
    db: Session = Depends(get_db)
):
    """List contacts with filtering, ICP scoring, and pagination"""
    query = db.query(Contact)

    # Apply filters
    if status:
        query = query.filter(Contact.status == status)
    if industry:
        query = query.filter(Contact.industry == industry)
    if persona:
        query = query.filter(Contact.persona == persona)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Contact.email.ilike(search_term)) |
            (Contact.first_name.ilike(search_term)) |
            (Contact.last_name.ilike(search_term)) |
            (Contact.company.ilike(search_term))
        )

    # ICP filters
    if icp_tier:
        query = query.filter(Contact.icp_tier == icp_tier)
    if company_segment:
        query = query.filter(Contact.company_segment == company_segment)
    if min_score is not None:
        query = query.filter(Contact.icp_score >= min_score)

    # Get total count
    total = query.count()

    # Sorting
    sort_column = getattr(Contact, sort_by)
    if sort_order == "desc":
        sort_column = sort_column.desc()
    query = query.order_by(sort_column)

    # Paginate
    offset = (page - 1) * per_page
    contacts = query.offset(offset).limit(per_page).all()

    return ContactListResponse(
        contacts=[ContactResponse.model_validate(c) for c in contacts],
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/high-priority", response_model=List[ContactResponse])
def list_high_priority_contacts(
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get high priority contacts (Tier 1) sorted by score"""
    contacts = db.query(Contact).filter(
        Contact.icp_tier == ICPTier.TIER_1
    ).order_by(Contact.icp_score.desc()).limit(limit).all()

    return [ContactResponse.model_validate(c) for c in contacts]


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """Get single contact by ID"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return ContactResponse.model_validate(contact)


@router.post("/", response_model=ContactResponse)
def create_contact(contact_data: ContactCreate, db: Session = Depends(get_db)):
    """Create a new contact with automatic ICP scoring"""
    # Check if email already exists
    existing = db.query(Contact).filter(Contact.email == contact_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Contact with this email already exists")

    contact = Contact(**contact_data.model_dump())

    # Auto-calculate ICP score
    contact.update_icp_score()

    db.add(contact)
    db.commit()
    db.refresh(contact)

    return ContactResponse.model_validate(contact)


@router.put("/{contact_id}", response_model=ContactResponse)
def update_contact(
    contact_id: int,
    contact_data: ContactUpdate,
    db: Session = Depends(get_db)
):
    """Update a contact with automatic ICP score recalculation"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    update_data = contact_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    # Recalculate ICP score if scoring fields changed
    scoring_fields = [
        'company_segment', 'iscc_certified', 'iscc_in_progress',
        'multi_sites_eu', 'epr_ppwr_exposure', 'employees_over_100', 'visible_it_budget'
    ]
    if any(field in update_data for field in scoring_fields):
        contact.update_icp_score()

    db.commit()
    db.refresh(contact)

    return ContactResponse.model_validate(contact)


@router.post("/{contact_id}/score", response_model=ICPScoreResponse)
def update_contact_score(
    contact_id: int,
    score_data: ContactScoreUpdate,
    db: Session = Depends(get_db)
):
    """Update only the ICP scoring fields and recalculate score"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    update_data = score_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    # Recalculate score
    contact.update_icp_score()

    db.commit()
    db.refresh(contact)

    # Build scoring breakdown
    breakdown = {
        "iscc_certified_or_in_progress": 3 if (contact.iscc_certified or contact.iscc_in_progress) else 0,
        "multi_sites_eu": 2 if contact.multi_sites_eu else 0,
        "chemical_or_tire_recycling": 2 if contact.company_segment in [
            CompanySegment.CHEMICAL_RECYCLING, CompanySegment.TIRE_RECYCLING
        ] else 0,
        "epr_ppwr_exposure": 1 if contact.epr_ppwr_exposure else 0,
        "employees_over_100": 1 if contact.employees_over_100 else 0,
        "visible_it_budget": 1 if contact.visible_it_budget else 0,
    }

    return ICPScoreResponse(
        contact_id=contact.id,
        icp_score=contact.icp_score,
        icp_tier=contact.icp_tier,
        priority_label=contact.priority_label,
        scoring_breakdown=breakdown
    )


@router.post("/{contact_id}/recalculate-score", response_model=ContactResponse)
def recalculate_contact_score(contact_id: int, db: Session = Depends(get_db)):
    """Force recalculation of ICP score for a contact"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    contact.update_icp_score()
    db.commit()
    db.refresh(contact)

    return ContactResponse.model_validate(contact)


@router.post("/recalculate-all-scores")
def recalculate_all_scores(db: Session = Depends(get_db)):
    """Recalculate ICP scores for all contacts"""
    contacts = db.query(Contact).all()
    updated = 0

    for contact in contacts:
        old_score = contact.icp_score
        contact.update_icp_score()
        if contact.icp_score != old_score:
            updated += 1

    db.commit()

    return {
        "message": f"Recalculated scores for {len(contacts)} contacts",
        "updated": updated
    }


@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """Delete a contact"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    db.delete(contact)
    db.commit()

    return {"message": "Contact deleted"}


@router.post("/{contact_id}/unsubscribe")
def unsubscribe_contact(contact_id: int, db: Session = Depends(get_db)):
    """Mark contact as unsubscribed"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    contact.is_unsubscribed = True
    contact.status = ContactStatus.UNSUBSCRIBED
    db.commit()

    return {"message": "Contact unsubscribed"}


@router.get("/segments/stats")
def get_segment_stats(db: Session = Depends(get_db)):
    """Get contact counts by segment and tier"""
    from sqlalchemy import func

    # Count by tier
    tier_stats = db.query(
        Contact.icp_tier,
        func.count(Contact.id)
    ).group_by(Contact.icp_tier).all()

    # Count by segment
    segment_stats = db.query(
        Contact.company_segment,
        func.count(Contact.id)
    ).group_by(Contact.company_segment).all()

    # Average score
    avg_score = db.query(func.avg(Contact.icp_score)).scalar() or 0

    return {
        "by_tier": {tier.value if tier else "unknown": count for tier, count in tier_stats},
        "by_segment": {seg.value if seg else "unknown": count for seg, count in segment_stats},
        "average_score": round(float(avg_score), 1),
        "total_contacts": db.query(Contact).count(),
        "high_priority_count": db.query(Contact).filter(Contact.icp_score >= 8).count(),
    }


# =============================================================================
# Enrichment Endpoints
# =============================================================================

@router.post("/{contact_id}/enrich", response_model=EnrichmentResponse)
async def enrich_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Enrich a single contact with Lusha data and auto-detect ICP criteria

    This will:
    - Fetch company/person data from Lusha API (if configured)
    - Auto-detect company segment from available data
    - Infer ICP criteria (ISCC, multi-sites EU, etc.)
    - Recalculate ICP score
    """
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    result = await enrichment_service.enrich_contact(contact, db)

    return EnrichmentResponse(
        contact_id=contact.id,
        enriched=result["enriched"],
        source=result.get("source"),
        updates=result.get("updates", {}),
        icp_updates=result.get("icp_updates", {}),
        new_score=contact.icp_score,
        new_tier=contact.icp_tier,
        errors=result.get("errors", [])
    )


@router.post("/enrich/batch", response_model=EnrichmentBatchResponse)
async def enrich_contacts_batch(
    contact_ids: Optional[List[int]] = None,
    unenriched_only: bool = Query(True, description="Only enrich contacts not yet enriched"),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """
    Enrich multiple contacts in batch

    If contact_ids not provided, will select unenriched contacts automatically.
    """
    if contact_ids:
        contacts = db.query(Contact).filter(Contact.id.in_(contact_ids)).all()
    else:
        query = db.query(Contact)
        if unenriched_only:
            # Consider "unenriched" as having default values
            query = query.filter(
                (Contact.company_segment == CompanySegment.OTHER) |
                (Contact.company_size == None)
            )
        contacts = query.limit(limit).all()

    if not contacts:
        return EnrichmentBatchResponse(
            total=0,
            enriched=0,
            errors=0,
            message="No contacts to enrich"
        )

    result = await enrichment_service.enrich_contacts_batch(contacts, db)

    return EnrichmentBatchResponse(
        total=result["total"],
        enriched=result["enriched"],
        errors=result["errors"],
        message=f"Enriched {result['enriched']}/{result['total']} contacts"
    )


@router.get("/enrichment/status")
def get_enrichment_status(db: Session = Depends(get_db)):
    """Get enrichment status and statistics"""
    from sqlalchemy import func
    from core.config import settings

    total = db.query(Contact).count()

    # Count contacts with enrichment data
    enriched = db.query(Contact).filter(
        (Contact.company_size != None) |
        (Contact.company_revenue != None) |
        (Contact.company_website != None)
    ).count()

    # Count by segment (non-OTHER)
    segmented = db.query(Contact).filter(
        Contact.company_segment != CompanySegment.OTHER
    ).count()

    # Count with ICP criteria detected
    with_criteria = db.query(Contact).filter(
        (Contact.iscc_certified == True) |
        (Contact.iscc_in_progress == True) |
        (Contact.multi_sites_eu == True) |
        (Contact.epr_ppwr_exposure == True) |
        (Contact.employees_over_100 == True)
    ).count()

    return {
        "total_contacts": total,
        "enriched_contacts": enriched,
        "unenriched_contacts": total - enriched,
        "segmented_contacts": segmented,
        "contacts_with_icp_criteria": with_criteria,
        "lusha_configured": bool(settings.LUSHA_API_KEY),
        "auto_enrichment_enabled": settings.ENRICHMENT_AUTO_ENABLED
    }
