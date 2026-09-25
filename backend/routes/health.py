from fastapi import APIRouter, status
from datetime import datetime

router = APIRouter()

@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Climate360"
    }

@router.get("/status")
async def status_check():
    """Status endpoint"""
    return {
        "name": "Climate360",
        "status": "operational",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }
