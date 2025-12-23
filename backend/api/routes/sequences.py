"""
Sequences API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from core.database import get_db
from models.sequence import Sequence, SequenceStep, ContactSequence, SequenceStatus
from models.contact import Contact
from schemas.sequence import (
    SequenceCreate, SequenceUpdate, SequenceResponse,
    SequenceStepCreate, SequenceStepResponse,
    ContactSequenceCreate, ContactSequenceResponse
)
from services.sequence_engine import SequenceEngine

router = APIRouter()


@router.get("/", response_model=List[SequenceResponse])
def list_sequences(
    status: Optional[SequenceStatus] = None,
    db: Session = Depends(get_db)
):
    """List all sequences"""
    query = db.query(Sequence)
    if status:
        query = query.filter(Sequence.status == status)

    sequences = query.order_by(Sequence.created_at.desc()).all()

    # Add stats
    result = []
    for seq in sequences:
        seq_dict = SequenceResponse.model_validate(seq)
        # Count enrollments
        total = db.query(ContactSequence).filter(
            ContactSequence.sequence_id == seq.id
        ).count()
        active = db.query(ContactSequence).filter(
            ContactSequence.sequence_id == seq.id,
            ContactSequence.status == "active"
        ).count()
        seq_dict.total_enrolled = total
        seq_dict.active_enrolled = active
        result.append(seq_dict)

    return result


@router.get("/{sequence_id}", response_model=SequenceResponse)
def get_sequence(sequence_id: int, db: Session = Depends(get_db)):
    """Get sequence by ID with steps"""
    sequence = db.query(Sequence).filter(Sequence.id == sequence_id).first()
    if not sequence:
        raise HTTPException(status_code=404, detail="Sequence not found")
    return SequenceResponse.model_validate(sequence)


@router.post("/", response_model=SequenceResponse)
def create_sequence(sequence_data: SequenceCreate, db: Session = Depends(get_db)):
    """Create a new sequence with steps"""
    # Create sequence
    sequence = Sequence(
        name=sequence_data.name,
        description=sequence_data.description,
        target_industry=sequence_data.target_industry,
        target_persona=sequence_data.target_persona,
        status=SequenceStatus.DRAFT
    )
    db.add(sequence)
    db.flush()

    # Create steps
    for step_data in sequence_data.steps or []:
        step = SequenceStep(
            sequence_id=sequence.id,
            **step_data.model_dump()
        )
        db.add(step)

    db.commit()
    db.refresh(sequence)

    return SequenceResponse.model_validate(sequence)


@router.put("/{sequence_id}", response_model=SequenceResponse)
def update_sequence(
    sequence_id: int,
    sequence_data: SequenceUpdate,
    db: Session = Depends(get_db)
):
    """Update sequence properties"""
    sequence = db.query(Sequence).filter(Sequence.id == sequence_id).first()
    if not sequence:
        raise HTTPException(status_code=404, detail="Sequence not found")

    update_data = sequence_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(sequence, field, value)

    db.commit()
    db.refresh(sequence)

    return SequenceResponse.model_validate(sequence)


@router.delete("/{sequence_id}")
def delete_sequence(sequence_id: int, db: Session = Depends(get_db)):
    """Delete a sequence"""
    sequence = db.query(Sequence).filter(Sequence.id == sequence_id).first()
    if not sequence:
        raise HTTPException(status_code=404, detail="Sequence not found")

    # Delete steps first
    db.query(SequenceStep).filter(SequenceStep.sequence_id == sequence_id).delete()
    db.delete(sequence)
    db.commit()

    return {"message": "Sequence deleted"}


# ==================== STEPS ====================

@router.post("/{sequence_id}/steps", response_model=SequenceStepResponse)
def add_step(
    sequence_id: int,
    step_data: SequenceStepCreate,
    db: Session = Depends(get_db)
):
    """Add a step to a sequence"""
    sequence = db.query(Sequence).filter(Sequence.id == sequence_id).first()
    if not sequence:
        raise HTTPException(status_code=404, detail="Sequence not found")

    step = SequenceStep(sequence_id=sequence_id, **step_data.model_dump())
    db.add(step)
    db.commit()
    db.refresh(step)

    return SequenceStepResponse.model_validate(step)


@router.delete("/{sequence_id}/steps/{step_id}")
def delete_step(sequence_id: int, step_id: int, db: Session = Depends(get_db)):
    """Delete a step from a sequence"""
    step = db.query(SequenceStep).filter(
        SequenceStep.id == step_id,
        SequenceStep.sequence_id == sequence_id
    ).first()

    if not step:
        raise HTTPException(status_code=404, detail="Step not found")

    db.delete(step)
    db.commit()

    return {"message": "Step deleted"}


# ==================== ENROLLMENTS ====================

@router.post("/{sequence_id}/enroll", response_model=ContactSequenceResponse)
def enroll_contact(
    sequence_id: int,
    enrollment: ContactSequenceCreate,
    db: Session = Depends(get_db)
):
    """Enroll a contact in a sequence"""
    # Validate sequence exists and is active
    sequence = db.query(Sequence).filter(Sequence.id == sequence_id).first()
    if not sequence:
        raise HTTPException(status_code=404, detail="Sequence not found")
    if sequence.status != SequenceStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="Sequence is not active")

    # Validate contact exists
    contact = db.query(Contact).filter(Contact.id == enrollment.contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    engine = SequenceEngine(db)
    try:
        result = engine.enroll_contact(enrollment.contact_id, sequence_id)
        return ContactSequenceResponse.model_validate(result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{sequence_id}/enroll-bulk")
def enroll_contacts_bulk(
    sequence_id: int,
    contact_ids: List[int],
    db: Session = Depends(get_db)
):
    """Enroll multiple contacts in a sequence"""
    engine = SequenceEngine(db)
    results = {"enrolled": 0, "skipped": 0, "errors": []}

    for contact_id in contact_ids:
        try:
            engine.enroll_contact(contact_id, sequence_id)
            results["enrolled"] += 1
        except ValueError as e:
            results["skipped"] += 1
            results["errors"].append({"contact_id": contact_id, "error": str(e)})

    return results


@router.get("/{sequence_id}/enrollments", response_model=List[ContactSequenceResponse])
def list_enrollments(
    sequence_id: int,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List all contacts enrolled in a sequence"""
    query = db.query(ContactSequence).filter(ContactSequence.sequence_id == sequence_id)
    if status:
        query = query.filter(ContactSequence.status == status)

    return [ContactSequenceResponse.model_validate(e) for e in query.all()]


@router.delete("/enrollments/{enrollment_id}")
def unenroll_contact(enrollment_id: int, db: Session = Depends(get_db)):
    """Remove a contact from a sequence"""
    engine = SequenceEngine(db)
    success = engine.unenroll_contact(enrollment_id)

    if not success:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    return {"message": "Contact unenrolled"}
