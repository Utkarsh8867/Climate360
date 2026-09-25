import httpx
from datetime import datetime
from config import settings
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class ConduitClient:
    def __init__(self):
        self.api_url = settings.conduit_api_url
        self.api_key = settings.conduit_api_key
        self.email = settings.conduit_email
    
    async def fetch_weather_data(
        self,
        from_date: str,
        to_date: str,
        station_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Fetch weather data from Conduit API
        
        Args:
            from_date: Start date (YYYY-MM-DD)
            to_date: End date (YYYY-MM-DD)
            station_id: Optional station ID (defaults to JKUAT)
        
        Returns:
            Weather data dictionary
        """
        try:
            payload = {
                "apikey": self.api_key,
                "email": self.email,
                "fromdate": from_date,
                "todate": to_date,
            }
            
            if station_id:
                payload["station_id"] = station_id
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    data=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                
                data = response.json()
                logger.info(f"Successfully fetched weather data from Conduit API")
                return data
                
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error fetching Conduit data: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error fetching Conduit data: {str(e)}")
            raise
    
    async def fetch_latest_data(self) -> Dict[str, Any]:
        """Fetch latest weather data for today"""
        today = datetime.now().strftime("%Y-%m-%d")
        return await self.fetch_weather_data(today, today)

# Singleton instance
conduit_client = ConduitClient()
