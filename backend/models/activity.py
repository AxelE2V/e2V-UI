"""
Activity Model - Log all outreach activities
Synced to HubSpot as timeline events
"""
from sqlalchemy import Column, Integer, String, DateTime, Text, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from .base import Base, TimestampMixin


class ActivityType(str, enum.Enum):
    EMAIL_SENT = "email_sent"
    EMAIL_OPENED = "email_opened"
    EMAIL_CLICKED = "email_clicked"
    EMAIL_REPLIED = "email_replied"
    EMAIL_BOUNCED = "email_bounced"
    CALL_MADE = "call_made"
    CALL_ANSWERED = "call_answered"
    CALL_NO_ANSWER = "call_no_answer"
    MEETING_BOOKED = "meeting_booked"
    LINKEDIN_SENT = "linkedin_sent"
    LINKEDIN_ACCEPTED = "linkedin_accepted"
    NOTE_ADDED = "note_added"
    STATUS_CHANGED = "status_changed"


class Activity(Base, TimestampMixin):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=False)

    # Activity details
    activity_type = Column(Enum(ActivityType), nullable=False)
    description = Column(Text, nullable=True)

    # For email activities
    email_subject = Column(String(500), nullable=True)
    email_message_id = Column(String(255), nullable=True)  # SendGrid message ID

    # For sequence tracking
    sequence_id = Column(Integer, ForeignKey("sequences.id"), nullable=True)
    sequence_step = Column(Integer, nullable=True)

    # HubSpot sync
    hubspot_engagement_id = Column(String(50), nullable=True)
    hubspot_synced = Column(Boolean, default=False)

    # Metadata
    performed_at = Column(DateTime, default=datetime.utcnow)
    performed_by = Column(String(100), default="system")  # User or "system"

    # Relationships
    contact = relationship("Contact", back_populates="activities")
