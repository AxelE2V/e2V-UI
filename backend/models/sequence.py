"""
Sequence Models - Multi-step outreach campaigns
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from .base import Base, TimestampMixin


class StepType(str, enum.Enum):
    EMAIL = "email"
    CALL = "call"
    LINKEDIN = "linkedin"
    TASK = "task"


class SequenceStatus(str, enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    ARCHIVED = "archived"


class ContactSequenceStatus(str, enum.Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    REPLIED = "replied"
    BOUNCED = "bounced"
    UNSUBSCRIBED = "unsubscribed"


class Sequence(Base, TimestampMixin):
    """A sequence is a series of steps (emails, calls) to execute"""
    __tablename__ = "sequences"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Targeting
    target_industry = Column(String(100), nullable=True)  # Can be comma-separated
    target_persona = Column(String(100), nullable=True)   # Can be comma-separated

    # Status
    status = Column(Enum(SequenceStatus), default=SequenceStatus.DRAFT)

    # Relationships
    steps = relationship("SequenceStep", back_populates="sequence", order_by="SequenceStep.step_order")
    contacts = relationship("ContactSequence", back_populates="sequence")


class SequenceStep(Base, TimestampMixin):
    """Individual step within a sequence"""
    __tablename__ = "sequence_steps"

    id = Column(Integer, primary_key=True, index=True)
    sequence_id = Column(Integer, ForeignKey("sequences.id"), nullable=False)

    # Step configuration
    step_order = Column(Integer, nullable=False)  # 1, 2, 3...
    step_type = Column(Enum(StepType), nullable=False)

    # Timing (delay from previous step in days)
    delay_days = Column(Integer, default=0)

    # For email steps
    template_id = Column(Integer, ForeignKey("email_templates.id"), nullable=True)
    subject_override = Column(String(500), nullable=True)  # Override template subject

    # For call/task steps
    task_description = Column(Text, nullable=True)

    # Relationships
    sequence = relationship("Sequence", back_populates="steps")
    template = relationship("EmailTemplate")


class ContactSequence(Base, TimestampMixin):
    """Junction table: Contact enrolled in a Sequence"""
    __tablename__ = "contact_sequences"

    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=False)
    sequence_id = Column(Integer, ForeignKey("sequences.id"), nullable=False)

    # Progress tracking
    current_step = Column(Integer, default=1)
    status = Column(Enum(ContactSequenceStatus), default=ContactSequenceStatus.ACTIVE)

    # Timing
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    next_step_at = Column(DateTime, nullable=True)  # When the next step should be executed
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    contact = relationship("Contact", back_populates="sequences")
    sequence = relationship("Sequence", back_populates="contacts")
