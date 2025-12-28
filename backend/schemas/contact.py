"""
Contact Pydantic Schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models.contact import ContactStatus, Industry, Persona, CompanySegment, ICPTier


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
    # ICP fields
    company_segment: Optional[CompanySegment] = CompanySegment.OTHER
    iscc_certified: Optional[bool] = False
    iscc_in_progress: Optional[bool] = False
    multi_sites_eu: Optional[bool] = False
    epr_ppwr_exposure: Optional[bool] = False
    employees_over_100: Optional[bool] = False
    visible_it_budget: Optional[bool] = False
    # Enrichment data
    company_size: Optional[str] = None
    company_revenue: Optional[str] = None
    company_country: Optional[str] = None
    company_website: Optional[str] = None


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
    # ICP fields
    company_segment: Optional[CompanySegment] = None
    iscc_certified: Optional[bool] = None
    iscc_in_progress: Optional[bool] = None
    multi_sites_eu: Optional[bool] = None
    epr_ppwr_exposure: Optional[bool] = None
    employees_over_100: Optional[bool] = None
    visible_it_budget: Optional[bool] = None
    # Enrichment data
    company_size: Optional[str] = None
    company_revenue: Optional[str] = None
    company_country: Optional[str] = None
    company_website: Optional[str] = None


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
    # ICP Scoring
    company_segment: Optional[CompanySegment] = None
    icp_score: int = 0
    icp_tier: Optional[ICPTier] = None
    iscc_certified: bool = False
    iscc_in_progress: bool = False
    multi_sites_eu: bool = False
    epr_ppwr_exposure: bool = False
    employees_over_100: bool = False
    visible_it_budget: bool = False
    # Enrichment
    company_size: Optional[str] = None
    company_revenue: Optional[str] = None
    company_country: Optional[str] = None
    company_website: Optional[str] = None

    class Config:
        from_attributes = True


class ContactListResponse(BaseModel):
    contacts: List[ContactResponse]
    total: int
    page: int
    per_page: int


class ContactScoreUpdate(BaseModel):
    """Schema pour mise à jour du scoring uniquement"""
    company_segment: Optional[CompanySegment] = None
    iscc_certified: Optional[bool] = None
    iscc_in_progress: Optional[bool] = None
    multi_sites_eu: Optional[bool] = None
    epr_ppwr_exposure: Optional[bool] = None
    employees_over_100: Optional[bool] = None
    visible_it_budget: Optional[bool] = None


class ICPScoreResponse(BaseModel):
    """Réponse de scoring ICP"""
    contact_id: int
    icp_score: int
    icp_tier: ICPTier
    priority_label: str
    scoring_breakdown: dict


class EnrichmentResponse(BaseModel):
    """Réponse d'enrichissement d'un contact"""
    contact_id: int
    enriched: bool
    source: Optional[str] = None  # "lusha", "inferred", etc.
    updates: dict = {}  # Champs mis à jour
    icp_updates: dict = {}  # Critères ICP détectés
    new_score: int
    new_tier: Optional[ICPTier] = None
    errors: List[str] = []


class EnrichmentBatchResponse(BaseModel):
    """Réponse d'enrichissement en batch"""
    total: int
    enriched: int
    errors: int
    message: str
