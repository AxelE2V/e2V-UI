"""
Contact Pydantic Schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models.contact import ContactStatus, Industry, Persona


class ContactBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    linkedin_url: Optional[str] = None
    industry: Optional[Industry] = Industry.OTHER
    persona: Optional[Persona] = Persona.OTHER
    notes: Optional[str] = None


class ContactCreate(ContactBase):
    hubspot_id: Optional[str] = None


class ContactUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    linkedin_url: Optional[str] = None
    industry: Optional[Industry] = None
    persona: Optional[Persona] = None
    status: Optional[ContactStatus] = None
    notes: Optional[str] = None
    is_unsubscribed: Optional[bool] = None


class ContactResponse(ContactBase):
    id: int
    hubspot_id: Optional[str] = None
    status: ContactStatus
    emails_sent: int
    emails_opened: int
    emails_clicked: int
    last_contacted_at: Optional[datetime] = None
    last_replied_at: Optional[datetime] = None
    is_unsubscribed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ContactListResponse(BaseModel):
    contacts: List[ContactResponse]
    total: int
    page: int
    per_page: int
