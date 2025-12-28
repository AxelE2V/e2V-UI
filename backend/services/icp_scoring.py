"""
ICP Scoring Service - Profil Prospect Idéal E2V
Score de 0 à 10 basé sur les critères eco2Veritas
"""
from enum import Enum
from typing import Optional
from dataclasses import dataclass


class ICPTier(str, Enum):
    TIER_1 = "tier_1"  # Score 8-10 - Cibles prioritaires absolues
    TIER_2 = "tier_2"  # Score 5-7 - Très intéressants
    TIER_3 = "tier_3"  # Score 3-5 - Opportunités secondaires
    NON_TARGET = "non_target"  # Score 0-2


class CompanySegment(str, Enum):
    # Tier 1
    CHEMICAL_RECYCLING = "chemical_recycling"
    TIRE_RECYCLING = "tire_recycling"
    FOOD_GRADE_PACKAGING = "food_grade_packaging"

    # Tier 2
    ECO_ORGANISME = "eco_organisme"
    FLEXIBLE_PACKAGING = "flexible_packaging"
    PLASTIC_COMPOUNDER = "plastic_compounder"

    # Tier 3
    WASTE_MANAGEMENT = "waste_management"
    FMCG_BRAND = "fmcg_brand"
    EQUIPMENT_PROVIDER = "equipment_provider"

    # Non-target
    CERTIFICATION_BODY = "certification_body"
    CONSULTANT = "consultant"
    TECH_COMPANY = "tech_company"
    OTHER = "other"


# Segment to Tier mapping
SEGMENT_TIERS = {
    CompanySegment.CHEMICAL_RECYCLING: ICPTier.TIER_1,
    CompanySegment.TIRE_RECYCLING: ICPTier.TIER_1,
    CompanySegment.FOOD_GRADE_PACKAGING: ICPTier.TIER_1,
    CompanySegment.ECO_ORGANISME: ICPTier.TIER_2,
    CompanySegment.FLEXIBLE_PACKAGING: ICPTier.TIER_2,
    CompanySegment.PLASTIC_COMPOUNDER: ICPTier.TIER_2,
    CompanySegment.WASTE_MANAGEMENT: ICPTier.TIER_3,
    CompanySegment.FMCG_BRAND: ICPTier.TIER_3,
    CompanySegment.EQUIPMENT_PROVIDER: ICPTier.TIER_3,
    CompanySegment.CERTIFICATION_BODY: ICPTier.NON_TARGET,
    CompanySegment.CONSULTANT: ICPTier.NON_TARGET,
    CompanySegment.TECH_COMPANY: ICPTier.NON_TARGET,
    CompanySegment.OTHER: ICPTier.NON_TARGET,
}

# Example companies for reference
EXAMPLE_COMPANIES = {
    CompanySegment.CHEMICAL_RECYCLING: ["Mura Technology", "Plastic Energy", "Quantafuel", "Pyrowave"],
    CompanySegment.TIRE_RECYCLING: ["Bolder Industries", "Contec", "Pyrum", "Aliapur", "Tyval"],
    CompanySegment.FOOD_GRADE_PACKAGING: ["Berry Global", "Amcor", "Veolia Plastics"],
    CompanySegment.ECO_ORGANISME: ["Citeo", "Ecoembes", "Valorplast", "Aliapur"],
    CompanySegment.FLEXIBLE_PACKAGING: ["Amcor", "Berry Global", "Constantia"],
    CompanySegment.PLASTIC_COMPOUNDER: ["Borealis", "INEOS", "LyondellBasell"],
    CompanySegment.WASTE_MANAGEMENT: ["Veolia", "Suez", "PreZero", "Remondis"],
    CompanySegment.FMCG_BRAND: ["Danone", "Nestlé", "Henkel", "Unilever"],
    CompanySegment.EQUIPMENT_PROVIDER: ["Erema", "Grey Parrot", "Tomra"],
}


@dataclass
class ScoringCriteria:
    """Critères de scoring pour un contact/entreprise"""
    # +3 points
    iscc_certified: bool = False
    iscc_in_progress: bool = False

    # +2 points
    multi_sites_eu: bool = False
    is_chemical_or_tire_recycling: bool = False  # Auto-calculated from segment

    # +1 point each
    epr_ppwr_exposure: bool = False
    employees_over_100: bool = False
    visible_it_budget: bool = False

    # Segment
    segment: Optional[CompanySegment] = None


class ICPScoringService:
    """Service de calcul du score ICP"""

    @staticmethod
    def calculate_score(criteria: ScoringCriteria) -> int:
        """
        Calcule le score ICP sur 10 points

        Scoring:
        - ISCC+ certified ou en cours: +3 points
        - Multi-sites EU: +2 points
        - Chemical/Tyre recycling: +2 points
        - EPR/PPWR exposure directe: +1 point
        - Plus de 100 employés: +1 point
        - Budget IT visible: +1 point

        Maximum: 10 points
        """
        score = 0

        # ISCC+ certified ou en cours: +3 points
        if criteria.iscc_certified or criteria.iscc_in_progress:
            score += 3

        # Multi-sites EU: +2 points
        if criteria.multi_sites_eu:
            score += 2

        # Chemical/Tyre recycling: +2 points
        if criteria.segment in [CompanySegment.CHEMICAL_RECYCLING, CompanySegment.TIRE_RECYCLING]:
            score += 2
        elif criteria.is_chemical_or_tire_recycling:
            score += 2

        # EPR/PPWR exposure directe: +1 point
        if criteria.epr_ppwr_exposure:
            score += 1

        # Plus de 100 employés: +1 point
        if criteria.employees_over_100:
            score += 1

        # Budget IT visible: +1 point
        if criteria.visible_it_budget:
            score += 1

        return min(score, 10)  # Cap at 10

    @staticmethod
    def get_tier(score: int) -> ICPTier:
        """Détermine le tier basé sur le score"""
        if score >= 8:
            return ICPTier.TIER_1
        elif score >= 5:
            return ICPTier.TIER_2
        elif score >= 3:
            return ICPTier.TIER_3
        else:
            return ICPTier.NON_TARGET

    @staticmethod
    def get_tier_from_segment(segment: CompanySegment) -> ICPTier:
        """Détermine le tier basé sur le segment d'entreprise"""
        return SEGMENT_TIERS.get(segment, ICPTier.NON_TARGET)

    @staticmethod
    def get_priority_label(score: int) -> str:
        """Retourne le label de priorité pour l'affichage"""
        if score >= 8:
            return "🔥 Outreach immédiat"
        elif score >= 5:
            return "⭐ Nurture qualifié"
        else:
            return "📋 Low priority"

    @staticmethod
    def get_tier_description(tier: ICPTier) -> str:
        """Description du tier pour l'UI"""
        descriptions = {
            ICPTier.TIER_1: "Cibles prioritaires absolues - Chemical/Tire Recycling, Food-Grade Packaging",
            ICPTier.TIER_2: "Très intéressants - Eco-organismes, Flexible Packaging, Compounders",
            ICPTier.TIER_3: "Opportunités secondaires - Waste Management, FMCG, Equipment",
            ICPTier.NON_TARGET: "Non-target - Certification bodies, Consultants, Tech",
        }
        return descriptions.get(tier, "")

    @staticmethod
    def auto_detect_segment(company_name: str, industry: str = None) -> Optional[CompanySegment]:
        """
        Tente de détecter automatiquement le segment basé sur le nom de l'entreprise
        """
        if not company_name:
            return None

        company_lower = company_name.lower()

        # Keywords pour chaque segment
        segment_keywords = {
            CompanySegment.CHEMICAL_RECYCLING: [
                "pyrolysis", "chemical recycl", "plastic energy", "mura", "quantafuel", "pyrowave"
            ],
            CompanySegment.TIRE_RECYCLING: [
                "tire", "tyre", "pneu", "bolder", "contec", "pyrum", "aliapur", "tyval"
            ],
            CompanySegment.FOOD_GRADE_PACKAGING: [
                "food grade", "food-grade", "packaging recycl"
            ],
            CompanySegment.ECO_ORGANISME: [
                "citeo", "ecoembes", "valorplast", "eco-organisme", "éco-organisme", "pro "
            ],
            CompanySegment.FLEXIBLE_PACKAGING: [
                "amcor", "berry", "constantia", "flexible", "converter"
            ],
            CompanySegment.PLASTIC_COMPOUNDER: [
                "borealis", "ineos", "lyondellbasell", "compounder", "compound"
            ],
            CompanySegment.WASTE_MANAGEMENT: [
                "veolia", "suez", "prezero", "remondis", "waste", "déchet"
            ],
            CompanySegment.FMCG_BRAND: [
                "danone", "nestlé", "nestle", "henkel", "unilever", "procter", "p&g"
            ],
            CompanySegment.EQUIPMENT_PROVIDER: [
                "erema", "grey parrot", "tomra", "sorting", "equipment"
            ],
        }

        for segment, keywords in segment_keywords.items():
            for keyword in keywords:
                if keyword in company_lower:
                    return segment

        return CompanySegment.OTHER


def calculate_contact_score(
    segment: CompanySegment = None,
    iscc_certified: bool = False,
    iscc_in_progress: bool = False,
    multi_sites_eu: bool = False,
    epr_ppwr_exposure: bool = False,
    employees_over_100: bool = False,
    visible_it_budget: bool = False,
    company_name: str = None
) -> dict:
    """
    Fonction helper pour calculer le score d'un contact
    Retourne un dict avec score, tier, et priority_label
    """
    # Auto-detect segment if not provided
    if not segment and company_name:
        segment = ICPScoringService.auto_detect_segment(company_name)

    criteria = ScoringCriteria(
        segment=segment,
        iscc_certified=iscc_certified,
        iscc_in_progress=iscc_in_progress,
        multi_sites_eu=multi_sites_eu,
        epr_ppwr_exposure=epr_ppwr_exposure,
        employees_over_100=employees_over_100,
        visible_it_budget=visible_it_budget,
    )

    score = ICPScoringService.calculate_score(criteria)
    tier = ICPScoringService.get_tier(score)

    return {
        "score": score,
        "tier": tier.value,
        "tier_label": tier.name.replace("_", " ").title(),
        "priority_label": ICPScoringService.get_priority_label(score),
        "segment": segment.value if segment else None,
        "segment_tier": ICPScoringService.get_tier_from_segment(segment).value if segment else None,
    }
