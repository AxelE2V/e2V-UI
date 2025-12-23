"""
Email Templates API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from core.database import get_db
from models.template import EmailTemplate
from models.contact import Contact
from schemas.template import (
    TemplateCreate, TemplateUpdate, TemplateResponse,
    TemplatePreviewRequest, TemplatePreviewResponse
)

router = APIRouter()


@router.get("/", response_model=List[TemplateResponse])
def list_templates(
    category: Optional[str] = None,
    is_active: Optional[bool] = True,
    db: Session = Depends(get_db)
):
    """List all email templates"""
    query = db.query(EmailTemplate)

    if category:
        query = query.filter(EmailTemplate.category == category)
    if is_active is not None:
        query = query.filter(EmailTemplate.is_active == is_active)

    templates = query.order_by(EmailTemplate.name).all()
    return [TemplateResponse.model_validate(t) for t in templates]


@router.get("/variables")
def get_template_variables():
    """Get list of available template variables"""
    return {
        "variables": EmailTemplate.get_available_variables(),
        "usage": "Use {{variableName}} syntax in your templates"
    }


@router.get("/{template_id}", response_model=TemplateResponse)
def get_template(template_id: int, db: Session = Depends(get_db)):
    """Get template by ID"""
    template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return TemplateResponse.model_validate(template)


@router.post("/", response_model=TemplateResponse)
def create_template(template_data: TemplateCreate, db: Session = Depends(get_db)):
    """Create a new email template"""
    template = EmailTemplate(**template_data.model_dump())
    db.add(template)
    db.commit()
    db.refresh(template)
    return TemplateResponse.model_validate(template)


@router.put("/{template_id}", response_model=TemplateResponse)
def update_template(
    template_id: int,
    template_data: TemplateUpdate,
    db: Session = Depends(get_db)
):
    """Update a template"""
    template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    update_data = template_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(template, field, value)

    db.commit()
    db.refresh(template)
    return TemplateResponse.model_validate(template)


@router.delete("/{template_id}")
def delete_template(template_id: int, db: Session = Depends(get_db)):
    """Delete a template"""
    template = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    db.delete(template)
    db.commit()
    return {"message": "Template deleted"}


@router.post("/preview", response_model=TemplatePreviewResponse)
def preview_template(
    preview_request: TemplatePreviewRequest,
    db: Session = Depends(get_db)
):
    """
    Preview a template with either real contact data or sample data
    """
    template = db.query(EmailTemplate).filter(
        EmailTemplate.id == preview_request.template_id
    ).first()

    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    # Get variables
    if preview_request.contact_id:
        contact = db.query(Contact).filter(
            Contact.id == preview_request.contact_id
        ).first()
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        variables = contact.to_template_vars()
    elif preview_request.sample_data:
        variables = preview_request.sample_data
    else:
        # Use placeholder data
        variables = {
            "firstName": "John",
            "lastName": "Doe",
            "fullName": "John Doe",
            "email": "john@example.com",
            "company": "Acme Corp",
            "jobTitle": "Sustainability Manager",
            "industry": "chemical_recycling"
        }

    subject, body_html, body_text = template.render(variables)

    return TemplatePreviewResponse(
        subject=subject,
        body_html=body_html,
        body_text=body_text
    )


@router.post("/{template_id}/duplicate", response_model=TemplateResponse)
def duplicate_template(template_id: int, db: Session = Depends(get_db)):
    """Duplicate a template"""
    original = db.query(EmailTemplate).filter(EmailTemplate.id == template_id).first()
    if not original:
        raise HTTPException(status_code=404, detail="Template not found")

    new_template = EmailTemplate(
        name=f"{original.name} (Copy)",
        description=original.description,
        subject=original.subject,
        body_html=original.body_html,
        body_text=original.body_text,
        category=original.category,
        target_persona=original.target_persona,
        target_industry=original.target_industry,
        is_active=True
    )

    db.add(new_template)
    db.commit()
    db.refresh(new_template)

    return TemplateResponse.model_validate(new_template)
