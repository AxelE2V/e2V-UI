"""
Contact Model - Synced with HubSpot
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from .base import Base, TimestampMixin


class ContactStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    ENGAGED = "engaged"
    QUALIFIED = "qualified"
    MEETING_BOOKED = "meeting_booked"
    NOT_INTERESTED = "not_interested"
    BOUNCED = "bounced"
    UNSUBSCRIBED = "unsubscribed"


class Industry(str, enum.Enum):
    CHEMICAL_RECYCLING = "chemical_recycling"
    PACKAGING = "packaging"
    TIRES = "tires"
    PLASTICS = "plastics"
    WEEE = "weee"
    OTHER = "other"


class Persona(str, enum.Enum):
    SUSTAINABILITY_MANAGER = "sustainability_manager"
    OPERATIONS_DIRECTOR = "operations_director"
    CEO = "ceo"
    PROCUREMENT = "procurement"
    COMPLIANCE = "compliance"
    OTHER = "other"


class Contact(Base, TimestampMixin):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)

    # HubSpot sync
    hubspot_id = Column(String(50), unique=True, index=True, nullable=True)
    hubspot_synced_at = Column(DateTime, nullable=True)

    # Basic info
    email = Column(String(255), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    phone = Column(String(50), nullable=True)

    # Company info
    company = Column(String(255), nullable=True)
    job_title = Column(String(255), nullable=True)
    linkedin_url = Column(String(500), nullable=True)

    # Segmentation
    industry = Column(Enum(Industry), default=Industry.OTHER)
    persona = Column(Enum(Persona), default=Persona.OTHER)

    # Outreach status
    status = Column(Enum(ContactStatus), default=ContactStatus.NEW)

    # Email tracking
    emails_sent = Column(Integer, default=0)
    emails_opened = Column(Integer, default=0)
    emails_clicked = Column(Integer, default=0)
    last_contacted_at = Column(DateTime, nullable=True)
    last_replied_at = Column(DateTime, nullable=True)

    # Notes
    notes = Column(Text, nullable=True)

    # Opt-out
    is_unsubscribed = Column(Boolean, default=False)

    # Relationships
    activities = relationship("Activity", back_populates="contact")
    sequences = relationship("ContactSequence", back_populates="contact")

    @property
    def full_name(self) -> str:
        parts = [self.first_name, self.last_name]
        return " ".join(p for p in parts if p) or self.email

    def to_template_vars(self) -> dict:
        """Return variables for email template substitution"""
        return {
            "firstName": self.first_name or "",
            "lastName": self.last_name or "",
            "fullName": self.full_name,
            "email": self.email,
            "company": self.company or "",
            "jobTitle": self.job_title or "",
            "industry": self.industry.value if self.industry else "",
        }
