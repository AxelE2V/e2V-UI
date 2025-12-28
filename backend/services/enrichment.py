"""
Contact enrichment service using Lusha API and ICP inference
"""
import httpx
import re
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session

from core.config import settings
from models.contact import Contact, CompanySegment


class EnrichmentService:
    """Service for enriching contacts with company and person data"""

    LUSHA_API_BASE = "https://api.lusha.com/v2"

    # Keywords for segment detection
    SEGMENT_KEYWORDS = {
        CompanySegment.CHEMICAL_RECYCLING: [
            "chemical recycling", "pyrolysis", "plastic-to-fuel",
            "depolymerization", "chemical upcycling", "advanced recycling"
        ],
        CompanySegment.TIRE_RECYCLING: [
            "tire recycling", "tyre recycling", "rubber recycling",
            "tire pyrolysis", "tyre pyrolysis", "crumb rubber"
        ],
        CompanySegment.FOOD_GRADE_PACKAGING: [
            "food packaging", "food-grade", "food contact",
            "pet recycling", "rpet", "food safe packaging"
        ],
        CompanySegment.ECO_ORGANISME: [
            "eco-organisme", "producer responsibility", "epr scheme",
            "packaging recovery", "recycling scheme", "pro scheme"
        ],
        CompanySegment.FLEXIBLE_PACKAGING: [
            "flexible packaging", "film packaging", "pouch",
            "multilayer", "flexible films", "soft packaging"
        ],
        CompanySegment.PLASTIC_COMPOUNDER: [
            "compounder", "compounding", "masterbatch",
            "plastic compound", "polymer compound", "additive"
        ],
        CompanySegment.WASTE_MANAGEMENT: [
            "waste management", "waste collection", "recycling center",
            "mrf", "material recovery", "waste processing"
        ],
        CompanySegment.FMCG_BRAND: [
            "consumer goods", "fmcg", "cpg", "brand owner",
            "packaged goods", "retail brand"
        ],
        CompanySegment.EQUIPMENT_PROVIDER: [
            "equipment", "machinery", "sorting", "recycling equipment",
            "processing equipment", "manufacturing equipment"
        ],
    }

    # Keywords for ICP criteria detection
    ISCC_KEYWORDS = ["iscc", "iscc+", "iscc plus", "mass balance", "certified sustainable"]
    EU_COUNTRIES = [
        "france", "germany", "italy", "spain", "netherlands", "belgium",
        "austria", "poland", "czech", "portugal", "greece", "sweden",
        "denmark", "finland", "ireland", "luxembourg", "slovakia", "slovenia",
        "croatia", "bulgaria", "romania", "hungary", "estonia", "latvia", "lithuania"
    ]
    EPR_KEYWORDS = ["epr", "ppwr", "extended producer", "packaging regulation", "circular economy"]

    def __init__(self):
        self.api_key = settings.LUSHA_API_KEY

    async def enrich_contact(self, contact: Contact, db: Session) -> Dict[str, Any]:
        """
        Enrich a single contact with Lusha data and ICP inference

        Returns enrichment results and updates applied
        """
        results = {
            "contact_id": contact.id,
            "enriched": False,
            "source": None,
            "updates": {},
            "icp_updates": {},
            "errors": []
        }

        # Try Lusha enrichment if API key available
        if self.api_key:
            try:
                lusha_data = await self._fetch_lusha_data(contact)
                if lusha_data:
                    results["source"] = "lusha"
                    results["updates"] = self._apply_lusha_data(contact, lusha_data)
                    results["enriched"] = True
            except Exception as e:
                results["errors"].append(f"Lusha error: {str(e)}")

        # Infer ICP criteria from available data
        icp_updates = self._infer_icp_criteria(contact)
        if icp_updates:
            results["icp_updates"] = icp_updates
            results["enriched"] = True

        # Update ICP score
        contact.update_icp_score()

        # Save changes
        db.commit()
        db.refresh(contact)

        return results

    async def enrich_contacts_batch(
        self, contacts: List[Contact], db: Session
    ) -> Dict[str, Any]:
        """Enrich multiple contacts"""
        results = {
            "total": len(contacts),
            "enriched": 0,
            "errors": 0,
            "details": []
        }

        for contact in contacts:
            try:
                result = await self.enrich_contact(contact, db)
                results["details"].append(result)
                if result["enriched"]:
                    results["enriched"] += 1
            except Exception as e:
                results["errors"] += 1
                results["details"].append({
                    "contact_id": contact.id,
                    "error": str(e)
                })

        return results

    async def _fetch_lusha_data(self, contact: Contact) -> Optional[Dict[str, Any]]:
        """Fetch data from Lusha API"""
        if not self.api_key:
            return None

        headers = {
            "api_key": self.api_key,
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient() as client:
            # Try person enrichment first
            if contact.email:
                try:
                    response = await client.get(
                        f"{self.LUSHA_API_BASE}/person",
                        headers=headers,
                        params={"email": contact.email},
                        timeout=10.0
                    )
                    if response.status_code == 200:
                        return response.json()
                except httpx.TimeoutException:
                    pass

            # Try company enrichment if we have company domain
            if contact.company:
                domain = self._extract_domain(contact.company, contact.email)
                if domain:
                    try:
                        response = await client.get(
                            f"{self.LUSHA_API_BASE}/company",
                            headers=headers,
                            params={"domain": domain},
                            timeout=10.0
                        )
                        if response.status_code == 200:
                            return {"company": response.json()}
                    except httpx.TimeoutException:
                        pass

        return None

    def _apply_lusha_data(self, contact: Contact, data: Dict[str, Any]) -> Dict[str, Any]:
        """Apply Lusha data to contact"""
        updates = {}

        # Person data
        if "firstName" in data and not contact.first_name:
            contact.first_name = data["firstName"]
            updates["first_name"] = data["firstName"]

        if "lastName" in data and not contact.last_name:
            contact.last_name = data["lastName"]
            updates["last_name"] = data["lastName"]

        if "jobTitle" in data and not contact.job_title:
            contact.job_title = data["jobTitle"]
            updates["job_title"] = data["jobTitle"]

        if "linkedinUrl" in data and not contact.linkedin_url:
            contact.linkedin_url = data["linkedinUrl"]
            updates["linkedin_url"] = data["linkedinUrl"]

        # Company data
        company_data = data.get("company", {})
        if isinstance(company_data, dict):
            if "name" in company_data and not contact.company:
                contact.company = company_data["name"]
                updates["company"] = company_data["name"]

            if "employeesRange" in company_data and not contact.company_size:
                contact.company_size = company_data["employeesRange"]
                updates["company_size"] = company_data["employeesRange"]
                # Check for 100+ employees
                if self._parse_employee_count(company_data["employeesRange"]) >= 100:
                    contact.employees_over_100 = True
                    updates["employees_over_100"] = True

            if "revenue" in company_data and not contact.company_revenue:
                contact.company_revenue = company_data["revenue"]
                updates["company_revenue"] = company_data["revenue"]

            if "country" in company_data and not contact.company_country:
                contact.company_country = company_data["country"]
                updates["company_country"] = company_data["country"]

            if "website" in company_data and not contact.company_website:
                contact.company_website = company_data["website"]
                updates["company_website"] = company_data["website"]

            if "industry" in company_data:
                # Try to map to our segments
                segment = self._detect_segment(
                    company_data.get("industry", ""),
                    company_data.get("description", "")
                )
                if segment and contact.company_segment == CompanySegment.OTHER:
                    contact.company_segment = segment
                    updates["company_segment"] = segment.value

        return updates

    def _infer_icp_criteria(self, contact: Contact) -> Dict[str, Any]:
        """Infer ICP criteria from available contact data"""
        updates = {}

        # Combine all text data for analysis
        text_data = " ".join(filter(None, [
            contact.company or "",
            contact.job_title or "",
            contact.company_website or "",
            contact.notes or ""
        ])).lower()

        # Detect segment if not set
        if contact.company_segment == CompanySegment.OTHER:
            segment = self._detect_segment(text_data)
            if segment:
                contact.company_segment = segment
                updates["company_segment"] = segment.value

        # Check ISCC certification
        if not contact.iscc_certified and not contact.iscc_in_progress:
            for keyword in self.ISCC_KEYWORDS:
                if keyword in text_data:
                    if "progress" in text_data or "en cours" in text_data:
                        contact.iscc_in_progress = True
                        updates["iscc_in_progress"] = True
                    else:
                        contact.iscc_certified = True
                        updates["iscc_certified"] = True
                    break

        # Check multi-sites EU
        if not contact.multi_sites_eu and contact.company_country:
            country_lower = contact.company_country.lower()
            eu_count = sum(1 for c in self.EU_COUNTRIES if c in country_lower)
            # Also check notes for multiple locations
            if contact.notes:
                notes_lower = contact.notes.lower()
                eu_count += sum(1 for c in self.EU_COUNTRIES if c in notes_lower)
            if eu_count >= 2 or "multi" in text_data and any(c in text_data for c in self.EU_COUNTRIES):
                contact.multi_sites_eu = True
                updates["multi_sites_eu"] = True

        # Check EPR/PPWR exposure
        if not contact.epr_ppwr_exposure:
            for keyword in self.EPR_KEYWORDS:
                if keyword in text_data:
                    contact.epr_ppwr_exposure = True
                    updates["epr_ppwr_exposure"] = True
                    break

        # Check employees over 100
        if not contact.employees_over_100 and contact.company_size:
            if self._parse_employee_count(contact.company_size) >= 100:
                contact.employees_over_100 = True
                updates["employees_over_100"] = True

        return updates

    def _detect_segment(self, *texts: str) -> Optional[CompanySegment]:
        """Detect company segment from text"""
        combined = " ".join(texts).lower()

        for segment, keywords in self.SEGMENT_KEYWORDS.items():
            for keyword in keywords:
                if keyword in combined:
                    return segment

        return None

    def _extract_domain(self, company: str, email: Optional[str]) -> Optional[str]:
        """Extract domain from company name or email"""
        if email and "@" in email:
            domain = email.split("@")[1]
            # Skip common email providers
            if domain not in ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]:
                return domain

        # Try to guess domain from company name
        if company:
            clean_name = re.sub(r'[^a-zA-Z0-9]', '', company.lower())
            return f"{clean_name}.com"

        return None

    def _parse_employee_count(self, size_str: str) -> int:
        """Parse employee count from string like '50-100' or '100+'"""
        if not size_str:
            return 0

        # Extract numbers
        numbers = re.findall(r'\d+', size_str)
        if numbers:
            # Take the first (minimum) number for ranges
            return int(numbers[0])
        return 0


# Singleton instance
enrichment_service = EnrichmentService()
