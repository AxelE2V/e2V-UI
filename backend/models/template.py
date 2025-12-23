"""
Email Template Model
Supports variables: {{firstName}}, {{company}}, etc.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean
from sqlalchemy.orm import relationship
import re

from .base import Base, TimestampMixin


class EmailTemplate(Base, TimestampMixin):
    __tablename__ = "email_templates"

    id = Column(Integer, primary_key=True, index=True)

    # Template info
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Content
    subject = Column(String(500), nullable=False)
    body_html = Column(Text, nullable=False)
    body_text = Column(Text, nullable=True)  # Plain text version

    # Categorization
    category = Column(String(100), nullable=True)  # e.g., "initial_outreach", "follow_up"
    target_persona = Column(String(100), nullable=True)
    target_industry = Column(String(100), nullable=True)

    # Status
    is_active = Column(Boolean, default=True)

    def render(self, variables: dict) -> tuple[str, str, str]:
        """
        Render template with variables.
        Returns (subject, body_html, body_text)
        """
        def replace_vars(text: str) -> str:
            if not text:
                return ""
            # Replace {{variable}} with actual values
            pattern = r'\{\{(\w+)\}\}'

            def replacer(match):
                var_name = match.group(1)
                return str(variables.get(var_name, f"{{{{{var_name}}}}}"))

            return re.sub(pattern, replacer, text)

        return (
            replace_vars(self.subject),
            replace_vars(self.body_html),
            replace_vars(self.body_text) if self.body_text else ""
        )

    @staticmethod
    def get_available_variables() -> list[str]:
        """Return list of available template variables"""
        return [
            "firstName",
            "lastName",
            "fullName",
            "email",
            "company",
            "jobTitle",
            "industry",
        ]
