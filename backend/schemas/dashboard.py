"""
Dashboard Pydantic Schemas
"""
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date
from models.sequence import StepType


class DashboardStats(BaseModel):
    # Contact stats
    total_contacts: int
    contacts_in_sequence: int
    contacts_new: int
    contacts_engaged: int
    contacts_meeting_booked: int

    # Email stats (last 30 days)
    emails_sent_30d: int
    emails_opened_30d: int
    emails_replied_30d: int
    open_rate: float  # percentage
    reply_rate: float  # percentage

    # Sequence stats
    active_sequences: int
    total_sequences: int


class TodayActionItem(BaseModel):
    """Single action to execute today"""
    id: int  # contact_sequence_id
    contact_id: int
    contact_name: str
    contact_email: str
    contact_company: Optional[str] = None

    sequence_id: int
    sequence_name: str
    step_number: int
    step_type: StepType

    # For email steps
    template_id: Optional[int] = None
    template_name: Optional[str] = None
    subject_preview: Optional[str] = None

    # For call/task steps
    task_description: Optional[str] = None

    scheduled_at: datetime


class TodayActions(BaseModel):
    """All actions due for today"""
    date: date
    total_actions: int
    email_actions: int
    call_actions: int
    other_actions: int
    actions: List[TodayActionItem]
