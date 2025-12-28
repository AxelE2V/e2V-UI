"""
Configuration settings loaded from environment variables
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://localhost:5432/e2v_outreach"

    # HubSpot
    HUBSPOT_ACCESS_TOKEN: str = ""
    HUBSPOT_PORTAL_ID: str = ""

    # SendGrid
    SENDGRID_API_KEY: str = ""
    SENDGRID_FROM_EMAIL: str = "axel@eco2veritas.com"
    SENDGRID_FROM_NAME: str = "Axel - eco₂Veritas"

    # App settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    SECRET_KEY: str = "your-secret-key-change-in-production"

    # Sync settings
    HUBSPOT_SYNC_BATCH_SIZE: int = 100

    # Lusha API (for enrichment)
    LUSHA_API_KEY: str = ""

    # Enrichment settings
    ENRICHMENT_AUTO_ENABLED: bool = False  # Manual enrichment only
    ENRICHMENT_BATCH_SIZE: int = 10

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
