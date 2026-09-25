from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import logging

from services.conduit_client import conduit_client
from services.risk_engines import HeatRiskEngine, WaterRiskEngine, RainRiskEngine
from services.groq_service import groq_service

logger = logging.getLogger(__name__)
router = APIRouter()

class ClimateDataRequest(BaseModel):
    from_date: Optional[str] = None
    to_date: Optional[str] = None
    station_id: Optional[str] = None

class RiskAssessmentResponse(BaseModel):
    risk_type: str
    risk_level: str
    details: dict
    explanation: str
    timestamp: str

@router.get("/climate/latest")
async def get_latest_climate():
    """Get latest climate data from Conduit API"""
    try:
        # We try to fetch the real data from conduit
        data = await conduit_client.fetch_latest_data()
        
        # We expect Conduit to return a specific schema, if it's empty we mock it
        if not data or len(data) == 0:
            raise ValueError("No data returned from Conduit")
            
        return {
            "status": "success",
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.warning(f"Using fallback data (Conduit API error/missing key): {str(e)}")
        # Provide fallback/mock data that matches the JKUAT Conduit structure for the demo
        fallback_data = {
            "temperature": 29.5,
            "humidity": 68.0,
            "wind": 12.5,
            "rainfall": 0.0,
            "solar_radiation": 850.0,
            "uv_radiation": 7.2,
            "soil_moisture": 35.5,
            "recent_rainfall": 5.0,
            "historical_avg_rainfall": 15.0,
            "historical_baseline_rain": 8.0,
            "rainfall_intensity": 0.0
        }
        return {
            "status": "success",
            "data": fallback_data,
            "timestamp": datetime.utcnow().isoformat(),
            "is_mock": True
        }

@router.post("/climate/data")
async def get_climate_data(request: ClimateDataRequest):
    """Get climate data for specified date range"""
    try:
        from_date = request.from_date or datetime.now().strftime("%Y-%m-%d")
        to_date = request.to_date or from_date
        
        data = await conduit_client.fetch_weather_data(from_date, to_date, request.station_id)
        return {
            "status": "success",
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching climate data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/climate/risk/heat")
async def assess_heat_risk(
    temperature: float = Query(...),
    humidity: float = Query(...),
    wind: float = Query(...),
    solar_radiation: float = Query(0),
    wbgt: Optional[float] = Query(None)
):
    """Assess heat risk"""
    try:
        risk_level, details = HeatRiskEngine.assess_risk(
            temperature=temperature,
            humidity=humidity,
            wind=wind,
            solar_radiation=solar_radiation,
            wbgt=wbgt
        )
        
        risk_data = {
            "risk_level": risk_level,
            "details": details
        }
        
        explanation = await groq_service.explain_heat_risk(risk_data)
        
        return {
            "risk_type": "heat",
            "risk_level": risk_level,
            "details": details,
            "explanation": explanation,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error assessing heat risk: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/climate/risk/water")
async def assess_water_risk(
    recent_rainfall: float = Query(...),
    historical_avg_rainfall: float = Query(...),
    current_storage: float = Query(0),
    daily_demand: float = Query(100),
    forecast_rainfall: Optional[float] = Query(None),
    roof_area: float = Query(100)
):
    """Assess water stress and harvesting potential"""
    try:
        stress_level, details = WaterRiskEngine.assess_water_stress(
            recent_rainfall=recent_rainfall,
            historical_avg_rainfall=historical_avg_rainfall,
            forecast_rainfall=forecast_rainfall,
            current_storage=current_storage,
            daily_demand=daily_demand
        )
        
        # Calculate rainwater harvesting potential
        harvesting_potential = WaterRiskEngine.calculate_rainwater_potential(
            rainfall=recent_rainfall,
            roof_area=roof_area
        )
        
        details["harvesting_potential"] = harvesting_potential
        
        risk_data = {
            "stress_level": stress_level,
            "details": details
        }
        
        explanation = await groq_service.explain_water_risk(risk_data)
        
        return {
            "risk_type": "water",
            "stress_level": stress_level,
            "harvesting_potential": harvesting_potential,
            "details": details,
            "explanation": explanation,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error assessing water risk: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/climate/risk/rain")
async def assess_rain_risk(
    current_rainfall: float = Query(...),
    rainfall_intensity: float = Query(...),
    historical_baseline: float = Query(...),
    cumulative_24h: Optional[float] = Query(None)
):
    """Assess extreme rain risk"""
    try:
        risk_level, details = RainRiskEngine.detect_anomaly(
            current_rainfall=current_rainfall,
            rainfall_intensity=rainfall_intensity,
            historical_baseline=historical_baseline,
            cumulative_rainfall_24h=cumulative_24h
        )
        
        risk_data = {
            "risk_level": risk_level,
            "details": details
        }
        
        explanation = await groq_service.explain_rain_risk(risk_data)
        
        return {
            "risk_type": "rain",
            "risk_level": risk_level,
            "details": details,
            "explanation": explanation,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error assessing rain risk: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

import asyncio
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    dashboard_data: Optional[dict] = None

@router.post("/climate/chat")
async def chat_with_copilot(request: ChatRequest):
    """Chat with the AI Copilot using dashboard context"""
    try:
        response_text = await groq_service.chat_with_data(request.message, request.dashboard_data)
        return {"status": "success", "response": response_text}
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/climate/dashboard")
async def get_dashboard_data(
    persona: str = Query("General"),
    temperature: float = Query(...),
    humidity: float = Query(...),
    wind: float = Query(...),
    rainfall: float = Query(...),
    wbgt: Optional[str] = Query(None),
    solar_radiation: float = Query(0),
    uv_radiation: float = Query(0),
    soil_moisture: float = Query(0),
    recent_rainfall: float = Query(...),
    historical_avg_rainfall: float = Query(...),
    current_storage: float = Query(0),
    historical_baseline_rain: float = Query(...),
    rainfall_intensity: float = Query(...)
):
    """Get complete dashboard with all risk assessments"""
    try:
        # Convert wbgt from string if needed
        wbgt_value = None
        if wbgt and wbgt.strip():
            try:
                wbgt_value = float(wbgt)
            except (ValueError, TypeError):
                wbgt_value = None
        
        # 1. Compute Base Risks (Synchronous)
        # Note: Added UV Radiation to Heat Risk and Soil Moisture to Water Risk processing if needed in future
        heat_level, heat_details = HeatRiskEngine.assess_risk(
            temperature, humidity, wind, solar_radiation, wbgt_value
        )
        water_level, water_details = WaterRiskEngine.assess_water_stress(
            recent_rainfall, historical_avg_rainfall, None, current_storage, 100
        )
        water_harvesting = WaterRiskEngine.calculate_rainwater_potential(recent_rainfall, 100)
        water_details["harvesting_potential"] = water_harvesting
        water_details["soil_moisture"] = soil_moisture
        
        rain_level, rain_details = RainRiskEngine.detect_anomaly(
            rainfall, rainfall_intensity, historical_baseline_rain
        )

        # 2. Fetch AI Explanations Concurrently
        heat_task = groq_service.explain_heat_risk({
            "risk_level": heat_level,
            "details": heat_details,
            "persona": persona
        })
        water_task = groq_service.explain_water_risk({
            "stress_level": water_level,
            "details": water_details,
            "persona": persona
        })
        rain_task = groq_service.explain_rain_risk({
            "risk_level": rain_level,
            "details": rain_details,
            "persona": persona
        })

        heat_explanation, water_explanation, rain_explanation = await asyncio.gather(
            heat_task, water_task, rain_task
        )
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "persona": persona,
            "current_conditions": {
                "temperature": temperature,
                "humidity": humidity,
                "wind": wind,
                "rainfall": rainfall,
                "wbgt": round(wbgt_value or HeatRiskEngine.calculate_wbgt(temperature, humidity), 1),
                "uv_radiation": uv_radiation,
                "soil_moisture": soil_moisture
            },
            "heat": {
                "risk_level": heat_level,
                "details": heat_details,
                "explanation": heat_explanation
            },
            "water": {
                "stress_level": water_level,
                "harvesting_potential": water_harvesting,
                "details": water_details,
                "explanation": water_explanation
            },
            "rain": {
                "risk_level": rain_level,
                "details": rain_details,
                "explanation": rain_explanation
            }
        }
    except Exception as e:
        logger.error(f"Error generating dashboard data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
