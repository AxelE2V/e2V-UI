"""
Sequence Pydantic Schemas
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from models.sequence import StepType, SequenceStatus, ContactSequenceStatus


class SequenceStepCreate(BaseModel):
    step_order: int
    step_type: StepType
    delay_days: int = 0
    template_id: Optional[int] = None
    subject_override: Optional[str] = None
    task_description: Optional[str] = None


class SequenceStepResponse(SequenceStepCreate):
    id: int
    sequence_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class SequenceBase(BaseModel):
    name: str
    description: Optional[str] = None
    target_industry: Optional[str] = None
    target_persona: Optional[str] = None


class SequenceCreate(SequenceBase):
    steps: Optional[List[SequenceStepCreate]] = []


class SequenceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    target_industry: Optional[str] = None
    target_persona: Optional[str] = None
    status: Optional[SequenceStatus] = None


class SequenceResponse(SequenceBase):
    id: int
    status: SequenceStatus
    steps: List[SequenceStepResponse] = []
    created_at: datetime
    updated_at: datetime

    # Stats
    total_enrolled: Optional[int] = 0
    active_enrolled: Optional[int] = 0

    class Config:
        from_attributes = True


class ContactSequenceCreate(BaseModel):
    contact_id: int
    sequence_id: int


class ContactSequenceResponse(BaseModel):
    id: int
    contact_id: int
    sequence_id: int
    current_step: int
    status: ContactSequenceStatus
    enrolled_at: datetime
    next_step_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
