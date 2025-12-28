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


class CompanySegment(str, enum.Enum):
    """Segments ICP pour scoring E2V"""
    # Tier 1 - Prioritaires
    CHEMICAL_RECYCLING = "chemical_recycling"
    TIRE_RECYCLING = "tire_recycling"
    FOOD_GRADE_PACKAGING = "food_grade_packaging"
    # Tier 2 - Très intéressants
    ECO_ORGANISME = "eco_organisme"
    FLEXIBLE_PACKAGING = "flexible_packaging"
    PLASTIC_COMPOUNDER = "plastic_compounder"
    # Tier 3 - Secondaires
    WASTE_MANAGEMENT = "waste_management"
    FMCG_BRAND = "fmcg_brand"
    EQUIPMENT_PROVIDER = "equipment_provider"
    # Non-target
    OTHER = "other"


class ICPTier(str, enum.Enum):
    """Tier de priorité ICP"""
    TIER_1 = "tier_1"  # Score 8-10
    TIER_2 = "tier_2"  # Score 5-7
    TIER_3 = "tier_3"  # Score 3-5
    NON_TARGET = "non_target"  # Score 0-2


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

    # ICP Scoring
    company_segment = Column(Enum(CompanySegment), default=CompanySegment.OTHER)
    icp_score = Column(Integer, default=0)  # 0-10
    icp_tier = Column(Enum(ICPTier), default=ICPTier.NON_TARGET)

    # Scoring criteria
    iscc_certified = Column(Boolean, default=False)
    iscc_in_progress = Column(Boolean, default=False)
    multi_sites_eu = Column(Boolean, default=False)
    epr_ppwr_exposure = Column(Boolean, default=False)
    employees_over_100 = Column(Boolean, default=False)
    visible_it_budget = Column(Boolean, default=False)

    # Company enrichment data (Lusha, etc.)
    company_size = Column(String(50), nullable=True)  # e.g., "50-100", "100-500"
    company_revenue = Column(String(100), nullable=True)
    company_country = Column(String(100), nullable=True)
    company_website = Column(String(500), nullable=True)

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

    def calculate_icp_score(self) -> int:
        """
        Calcule le score ICP basé sur les critères

        Scoring:
        - ISCC+ certified ou en cours: +3 points
        - Multi-sites EU: +2 points
        - Chemical/Tyre recycling: +2 points
        - EPR/PPWR exposure directe: +1 point
        - Plus de 100 employés: +1 point
        - Budget IT visible: +1 point
        """
        score = 0

        # ISCC+ certified ou en cours: +3 points
        if self.iscc_certified or self.iscc_in_progress:
            score += 3

        # Multi-sites EU: +2 points
        if self.multi_sites_eu:
            score += 2

        # Chemical/Tyre recycling: +2 points
        if self.company_segment in [CompanySegment.CHEMICAL_RECYCLING, CompanySegment.TIRE_RECYCLING]:
            score += 2

        # EPR/PPWR exposure directe: +1 point
        if self.epr_ppwr_exposure:
            score += 1

        # Plus de 100 employés: +1 point
        if self.employees_over_100:
            score += 1

        # Budget IT visible: +1 point
        if self.visible_it_budget:
            score += 1

        return min(score, 10)

    def update_icp_score(self):
        """Met à jour le score et le tier ICP"""
        self.icp_score = self.calculate_icp_score()

        if self.icp_score >= 8:
            self.icp_tier = ICPTier.TIER_1
        elif self.icp_score >= 5:
            self.icp_tier = ICPTier.TIER_2
        elif self.icp_score >= 3:
            self.icp_tier = ICPTier.TIER_3
        else:
            self.icp_tier = ICPTier.NON_TARGET

    @property
    def priority_label(self) -> str:
        """Label de priorité pour l'UI"""
        if self.icp_score >= 8:
            return "🔥 Outreach immédiat"
        elif self.icp_score >= 5:
            return "⭐ Nurture qualifié"
        else:
            return "📋 Low priority"
