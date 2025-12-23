"""
HubSpot Service - Bidirectional sync with HubSpot CRM
Uses HubSpot Private App for authentication
"""
import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session

from core.config import settings
from models.contact import Contact, ContactStatus, Industry, Persona
from models.activity import Activity, ActivityType


class HubSpotService:
    BASE_URL = "https://api.hubapi.com"

    def __init__(self):
        self.access_token = settings.HUBSPOT_ACCESS_TOKEN
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

    async def _request(self, method: str, endpoint: str, data: dict = None) -> dict:
        """Make authenticated request to HubSpot API"""
        async with httpx.AsyncClient() as client:
            url = f"{self.BASE_URL}{endpoint}"
            response = await client.request(
                method=method,
                url=url,
                headers=self.headers,
                json=data,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json() if response.content else {}

    # ==================== CONTACT SYNC ====================

    async def fetch_all_contacts(self, limit: int = 100) -> List[Dict[str, Any]]:
        """
        Fetch all contacts from HubSpot
        Returns list of contact properties
        """
        contacts = []
        after = None

        properties = [
            "email", "firstname", "lastname", "phone", "company",
            "jobtitle", "linkedinconnectionstatus", "hs_lead_status",
            "industry", "lifecyclestage"
        ]

        while True:
            endpoint = f"/crm/v3/objects/contacts?limit={limit}"
            endpoint += f"&properties={','.join(properties)}"
            if after:
                endpoint += f"&after={after}"

            result = await self._request("GET", endpoint)
            contacts.extend(result.get("results", []))

            # Pagination
            paging = result.get("paging", {})
            if paging.get("next"):
                after = paging["next"].get("after")
            else:
                break

        return contacts

    async def get_contact(self, hubspot_id: str) -> Dict[str, Any]:
        """Fetch single contact by HubSpot ID"""
        properties = [
            "email", "firstname", "lastname", "phone", "company",
            "jobtitle", "linkedinconnectionstatus", "industry"
        ]
        endpoint = f"/crm/v3/objects/contacts/{hubspot_id}?properties={','.join(properties)}"
        return await self._request("GET", endpoint)

    async def create_contact(self, contact: Contact) -> str:
        """Create contact in HubSpot, return HubSpot ID"""
        data = {
            "properties": {
                "email": contact.email,
                "firstname": contact.first_name or "",
                "lastname": contact.last_name or "",
                "phone": contact.phone or "",
                "company": contact.company or "",
                "jobtitle": contact.job_title or "",
            }
        }
        result = await self._request("POST", "/crm/v3/objects/contacts", data)
        return result.get("id")

    async def update_contact(self, hubspot_id: str, properties: Dict[str, str]) -> None:
        """Update contact properties in HubSpot"""
        data = {"properties": properties}
        await self._request("PATCH", f"/crm/v3/objects/contacts/{hubspot_id}", data)

    # ==================== ACTIVITY SYNC ====================

    async def log_email_engagement(
        self,
        hubspot_contact_id: str,
        subject: str,
        body: str,
        timestamp: datetime = None
    ) -> str:
        """Log email as engagement in HubSpot timeline"""
        if not timestamp:
            timestamp = datetime.utcnow()

        data = {
            "engagement": {
                "active": True,
                "type": "EMAIL",
                "timestamp": int(timestamp.timestamp() * 1000)
            },
            "associations": {
                "contactIds": [int(hubspot_contact_id)]
            },
            "metadata": {
                "from": {"email": settings.SENDGRID_FROM_EMAIL},
                "to": [{"email": ""}],  # Will be filled by HubSpot
                "subject": subject,
                "html": body
            }
        }
        result = await self._request("POST", "/engagements/v1/engagements", data)
        return str(result.get("engagement", {}).get("id", ""))

    async def log_call_engagement(
        self,
        hubspot_contact_id: str,
        outcome: str,  # "CONNECTED", "NO_ANSWER", "LEFT_VOICEMAIL"
        notes: str = "",
        duration_ms: int = 0,
        timestamp: datetime = None
    ) -> str:
        """Log call as engagement in HubSpot timeline"""
        if not timestamp:
            timestamp = datetime.utcnow()

        data = {
            "engagement": {
                "active": True,
                "type": "CALL",
                "timestamp": int(timestamp.timestamp() * 1000)
            },
            "associations": {
                "contactIds": [int(hubspot_contact_id)]
            },
            "metadata": {
                "toNumber": "",
                "fromNumber": "",
                "status": outcome,
                "durationMilliseconds": duration_ms,
                "body": notes
            }
        }
        result = await self._request("POST", "/engagements/v1/engagements", data)
        return str(result.get("engagement", {}).get("id", ""))

    async def log_note(
        self,
        hubspot_contact_id: str,
        note_body: str,
        timestamp: datetime = None
    ) -> str:
        """Log note in HubSpot timeline"""
        if not timestamp:
            timestamp = datetime.utcnow()

        data = {
            "engagement": {
                "active": True,
                "type": "NOTE",
                "timestamp": int(timestamp.timestamp() * 1000)
            },
            "associations": {
                "contactIds": [int(hubspot_contact_id)]
            },
            "metadata": {
                "body": note_body
            }
        }
        result = await self._request("POST", "/engagements/v1/engagements", data)
        return str(result.get("engagement", {}).get("id", ""))

    # ==================== SYNC OPERATIONS ====================

    def map_hubspot_to_contact(self, hs_contact: Dict[str, Any]) -> Dict[str, Any]:
        """Map HubSpot contact properties to our Contact model fields"""
        props = hs_contact.get("properties", {})

        # Map industry
        hs_industry = (props.get("industry") or "").lower()
        industry_map = {
            "chemicals": Industry.CHEMICAL_RECYCLING,
            "chemical": Industry.CHEMICAL_RECYCLING,
            "packaging": Industry.PACKAGING,
            "tire": Industry.TIRES,
            "tires": Industry.TIRES,
            "plastics": Industry.PLASTICS,
            "plastic": Industry.PLASTICS,
        }
        industry = industry_map.get(hs_industry, Industry.OTHER)

        return {
            "hubspot_id": hs_contact.get("id"),
            "email": props.get("email", ""),
            "first_name": props.get("firstname"),
            "last_name": props.get("lastname"),
            "phone": props.get("phone"),
            "company": props.get("company"),
            "job_title": props.get("jobtitle"),
            "industry": industry,
            "hubspot_synced_at": datetime.utcnow()
        }

    async def sync_contacts_from_hubspot(self, db: Session) -> Dict[str, int]:
        """
        Import/update contacts from HubSpot to local database
        Returns stats: {created: X, updated: Y, skipped: Z}
        """
        stats = {"created": 0, "updated": 0, "skipped": 0, "errors": 0}

        try:
            hs_contacts = await self.fetch_all_contacts()
        except Exception as e:
            return {"error": str(e)}

        for hs_contact in hs_contacts:
            try:
                mapped = self.map_hubspot_to_contact(hs_contact)

                if not mapped.get("email"):
                    stats["skipped"] += 1
                    continue

                # Check if contact exists
                existing = db.query(Contact).filter(
                    (Contact.hubspot_id == mapped["hubspot_id"]) |
                    (Contact.email == mapped["email"])
                ).first()

                if existing:
                    # Update existing contact
                    for key, value in mapped.items():
                        if value is not None:
                            setattr(existing, key, value)
                    stats["updated"] += 1
                else:
                    # Create new contact
                    new_contact = Contact(**mapped)
                    db.add(new_contact)
                    stats["created"] += 1

            except Exception as e:
                stats["errors"] += 1
                continue

        db.commit()
        return stats

    async def push_contact_to_hubspot(self, db: Session, contact: Contact) -> bool:
        """
        Push local contact changes to HubSpot
        Creates if no hubspot_id, updates otherwise
        """
        try:
            if contact.hubspot_id:
                # Update existing
                await self.update_contact(contact.hubspot_id, {
                    "firstname": contact.first_name or "",
                    "lastname": contact.last_name or "",
                    "phone": contact.phone or "",
                    "company": contact.company or "",
                    "jobtitle": contact.job_title or "",
                })
            else:
                # Create new
                hubspot_id = await self.create_contact(contact)
                contact.hubspot_id = hubspot_id
                db.commit()

            contact.hubspot_synced_at = datetime.utcnow()
            db.commit()
            return True

        except Exception as e:
            print(f"Error pushing contact to HubSpot: {e}")
            return False

    async def sync_activity_to_hubspot(
        self,
        db: Session,
        activity: Activity,
        contact: Contact
    ) -> bool:
        """Push activity to HubSpot as engagement"""
        if not contact.hubspot_id:
            return False

        try:
            engagement_id = None

            if activity.activity_type == ActivityType.EMAIL_SENT:
                engagement_id = await self.log_email_engagement(
                    hubspot_contact_id=contact.hubspot_id,
                    subject=activity.email_subject or "Email",
                    body=activity.description or "",
                    timestamp=activity.performed_at
                )
            elif activity.activity_type in [
                ActivityType.CALL_MADE,
                ActivityType.CALL_ANSWERED,
                ActivityType.CALL_NO_ANSWER
            ]:
                outcome = "CONNECTED" if activity.activity_type == ActivityType.CALL_ANSWERED else "NO_ANSWER"
                engagement_id = await self.log_call_engagement(
                    hubspot_contact_id=contact.hubspot_id,
                    outcome=outcome,
                    notes=activity.description or "",
                    timestamp=activity.performed_at
                )
            elif activity.activity_type == ActivityType.NOTE_ADDED:
                engagement_id = await self.log_note(
                    hubspot_contact_id=contact.hubspot_id,
                    note_body=activity.description or "",
                    timestamp=activity.performed_at
                )

            if engagement_id:
                activity.hubspot_engagement_id = engagement_id
                activity.hubspot_synced = True
                db.commit()
                return True

        except Exception as e:
            print(f"Error syncing activity to HubSpot: {e}")

        return False
