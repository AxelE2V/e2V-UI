"""
Activity Pydantic Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from models.activity import ActivityType


class ActivityCreate(BaseModel):
    contact_id: int
    activity_type: ActivityType
    description: Optional[str] = None
    email_subject: Optional[str] = None
    sequence_id: Optional[int] = None
    sequence_step: Optional[int] = None


class ActivityResponse(BaseModel):
    id: int
    contact_id: int
    activity_type: ActivityType
    description: Optional[str] = None
    email_subject: Optional[str] = None
    email_message_id: Optional[str] = None
    sequence_id: Optional[int] = None
    sequence_step: Optional[int] = None
    hubspot_synced: bool
    performed_at: datetime
    performed_by: str

    class Config:
        from_attributes = True
