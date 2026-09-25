from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import Optional
import logging

from services.conduit_client import conduit_client

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/conduit/fetch")
async def fetch_conduit_data(
    from_date: str = Query(..., description="Start date (YYYY-MM-DD)"),
    to_date: str = Query(..., description="End date (YYYY-MM-DD)"),
    station_id: Optional[str] = Query(None, description="Station ID")
):
    """Fetch raw data from Conduit API"""
    try:
        data = await conduit_client.fetch_weather_data(from_date, to_date, station_id)
        return {
            "status": "success",
            "from_date": from_date,
            "to_date": to_date,
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching Conduit data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/conduit/status")
async def check_conduit_status():
    """Check Conduit API connectivity"""
    try:
        today = datetime.now().strftime("%Y-%m-%d")
        data = await conduit_client.fetch_weather_data(today, today)
        
        if data:
            return {
                "status": "connected",
                "message": "Successfully connected to Conduit API",
                "timestamp": datetime.utcnow().isoformat()
            }
        else:
            return {
                "status": "connected",
                "message": "Connected but no data available",
                "timestamp": datetime.utcnow().isoformat()
            }
    except Exception as e:
        logger.error(f"Conduit API connection failed: {str(e)}")
        return {
            "status": "disconnected",
            "message": f"Connection failed: {str(e)}",
            "timestamp": datetime.utcnow().isoformat()
        }
