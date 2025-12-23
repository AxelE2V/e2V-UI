"""
Email Template Pydantic Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TemplateBase(BaseModel):
    name: str
    subject: str
    body_html: str
    body_text: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_persona: Optional[str] = None
    target_industry: Optional[str] = None


class TemplateCreate(TemplateBase):
    pass


class TemplateUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    body_html: Optional[str] = None
    body_text: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_persona: Optional[str] = None
    target_industry: Optional[str] = None
    is_active: Optional[bool] = None


class TemplateResponse(TemplateBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TemplatePreviewRequest(BaseModel):
    """Request to preview a template with sample data"""
    template_id: int
    contact_id: Optional[int] = None  # Use real contact data
    sample_data: Optional[dict] = None  # Or provide sample variables


class TemplatePreviewResponse(BaseModel):
    subject: str
    body_html: str
    body_text: str
