"""
E2V Outreach - Sales Sequencing Tool with HubSpot Sync
Main FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import contacts, sequences, templates, activities, hubspot, dashboard
from core.config import settings
from core.database import engine
from models import base

# Create database tables
base.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E2V Outreach API",
    description="Sales sequencing tool with bidirectional HubSpot sync",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contacts.router, prefix="/api/contacts", tags=["Contacts"])
app.include_router(sequences.router, prefix="/api/sequences", tags=["Sequences"])
app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
app.include_router(activities.router, prefix="/api/activities", tags=["Activities"])
app.include_router(hubspot.router, prefix="/api/hubspot", tags=["HubSpot"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])


@app.get("/")
def root():
    return {"message": "E2V Outreach API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
