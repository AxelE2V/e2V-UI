"""
Activities API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime, timedelta

from core.database import get_db
from models.activity import Activity, ActivityType
from models.contact import Contact
from schemas.activity import ActivityCreate, ActivityResponse
from services.hubspot import HubSpotService

router = APIRouter()


@router.get("/", response_model=List[ActivityResponse])
def list_activities(
    contact_id: Optional[int] = None,
    activity_type: Optional[ActivityType] = None,
    days: int = Query(30, ge=1, le=365),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    """List activities with filters"""
    query = db.query(Activity)

    if contact_id:
        query = query.filter(Activity.contact_id == contact_id)
    if activity_type:
        query = query.filter(Activity.activity_type == activity_type)

    # Filter by date
    since = datetime.utcnow() - timedelta(days=days)
    query = query.filter(Activity.performed_at >= since)

    activities = query.order_by(Activity.performed_at.desc()).limit(limit).all()
    return [ActivityResponse.model_validate(a) for a in activities]


@router.get("/contact/{contact_id}", response_model=List[ActivityResponse])
def get_contact_activities(
    contact_id: int,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """Get all activities for a specific contact"""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    activities = db.query(Activity).filter(
        Activity.contact_id == contact_id
    ).order_by(Activity.performed_at.desc()).limit(limit).all()

    return [ActivityResponse.model_validate(a) for a in activities]


@router.post("/", response_model=ActivityResponse)
def create_activity(
    activity_data: ActivityCreate,
    sync_to_hubspot: bool = False,
    db: Session = Depends(get_db)
):
    """Create a new activity (manual logging)"""
    # Validate contact exists
    contact = db.query(Contact).filter(Contact.id == activity_data.contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    activity = Activity(**activity_data.model_dump())
    db.add(activity)
    db.commit()
    db.refresh(activity)

    return ActivityResponse.model_validate(activity)


@router.post("/{activity_id}/sync-hubspot")
async def sync_activity_to_hubspot(
    activity_id: int,
    db: Session = Depends(get_db)
):
    """Sync a specific activity to HubSpot"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    if activity.hubspot_synced:
        return {"message": "Activity already synced", "engagement_id": activity.hubspot_engagement_id}

    contact = db.query(Contact).filter(Contact.id == activity.contact_id).first()
    if not contact or not contact.hubspot_id:
        raise HTTPException(status_code=400, detail="Contact not linked to HubSpot")

    hubspot = HubSpotService()
    success = await hubspot.sync_activity_to_hubspot(db, activity, contact)

    if success:
        return {"message": "Activity synced to HubSpot", "engagement_id": activity.hubspot_engagement_id}
    else:
        raise HTTPException(status_code=500, detail="Failed to sync to HubSpot")


@router.post("/sync-pending")
async def sync_pending_activities(db: Session = Depends(get_db)):
    """Sync all pending activities to HubSpot"""
    pending = db.query(Activity).filter(
        Activity.hubspot_synced == False
    ).all()

    hubspot = HubSpotService()
    results = {"synced": 0, "failed": 0, "skipped": 0}

    for activity in pending:
        contact = db.query(Contact).filter(Contact.id == activity.contact_id).first()

        if not contact or not contact.hubspot_id:
            results["skipped"] += 1
            continue

        success = await hubspot.sync_activity_to_hubspot(db, activity, contact)
        if success:
            results["synced"] += 1
        else:
            results["failed"] += 1

    return results
