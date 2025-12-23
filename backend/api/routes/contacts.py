"""
Contacts API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from core.database import get_db
from models.contact import Contact, ContactStatus, Industry, Persona
from schemas.contact import ContactCreate, ContactUpdate, ContactResponse, ContactListResponse

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
    db: Session = Depends(get_db)
):
    """List contacts with filtering and pagination"""
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

    # Get total count
    total = query.count()

    # Paginate
    offset = (page - 1) * per_page
    contacts = query.order_by(Contact.created_at.desc()).offset(offset).limit(per_page).all()

    return ContactListResponse(
        contacts=[ContactResponse.model_validate(c) for c in contacts],
        total=total,
        page=page,
        per_page=per_page
    )


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """Get single contact by ID"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return ContactResponse.model_validate(contact)


@router.post("/", response_model=ContactResponse)
def create_contact(contact_data: ContactCreate, db: Session = Depends(get_db)):
    """Create a new contact"""
    # Check if email already exists
    existing = db.query(Contact).filter(Contact.email == contact_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Contact with this email already exists")

    contact = Contact(**contact_data.model_dump())
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
    """Update a contact"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    update_data = contact_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    db.commit()
    db.refresh(contact)

    return ContactResponse.model_validate(contact)


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
