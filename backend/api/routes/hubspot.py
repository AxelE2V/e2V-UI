"""
HubSpot Sync API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from core.database import get_db
from models.contact import Contact
from services.hubspot import HubSpotService

router = APIRouter()


@router.post("/sync/contacts/import")
async def import_contacts_from_hubspot(db: Session = Depends(get_db)):
    """
    Import all contacts from HubSpot to local database
    Creates new contacts or updates existing ones
    """
    hubspot = HubSpotService()
    stats = await hubspot.sync_contacts_from_hubspot(db)

    if "error" in stats:
        raise HTTPException(status_code=500, detail=stats["error"])

    return {
        "message": "HubSpot sync completed",
        "stats": stats
    }


@router.post("/sync/contacts/{contact_id}/push")
async def push_contact_to_hubspot(
    contact_id: int,
    db: Session = Depends(get_db)
):
    """
    Push a single contact to HubSpot
    Creates if no hubspot_id, updates if exists
    """
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    hubspot = HubSpotService()
    success = await hubspot.push_contact_to_hubspot(db, contact)

    if success:
        return {
            "message": "Contact synced to HubSpot",
            "hubspot_id": contact.hubspot_id
        }
    else:
        raise HTTPException(status_code=500, detail="Failed to sync contact to HubSpot")


@router.post("/sync/contacts/push-all")
async def push_all_contacts_to_hubspot(
    only_new: bool = True,
    db: Session = Depends(get_db)
):
    """
    Push all local contacts to HubSpot
    By default only pushes contacts without hubspot_id
    """
    query = db.query(Contact)

    if only_new:
        query = query.filter(Contact.hubspot_id.is_(None))

    contacts = query.all()
    hubspot = HubSpotService()

    results = {"success": 0, "failed": 0}

    for contact in contacts:
        success = await hubspot.push_contact_to_hubspot(db, contact)
        if success:
            results["success"] += 1
        else:
            results["failed"] += 1

    return {
        "message": f"Pushed {results['success']} contacts to HubSpot",
        "results": results
    }


@router.get("/contact/{hubspot_id}")
async def get_hubspot_contact(hubspot_id: str):
    """
    Fetch contact directly from HubSpot API (for debugging)
    """
    hubspot = HubSpotService()
    try:
        contact = await hubspot.get_contact(hubspot_id)
        return contact
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def check_hubspot_connection():
    """
    Check HubSpot API connection status
    """
    hubspot = HubSpotService()
    try:
        # Try to fetch one contact to verify connection
        await hubspot._request("GET", "/crm/v3/objects/contacts?limit=1")
        return {"status": "connected", "message": "HubSpot API connection successful"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
