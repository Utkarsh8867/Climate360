import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Any, List, Tuple
import logging

logger = logging.getLogger(__name__)

class HeatRiskEngine:
    """Calculate heat risk based on temperature, humidity, wind, solar radiation, and WBGT"""
    
    HEAT_THRESHOLDS = {
        "LOW": {"temp": 25, "wbgt": 20},
        "MODERATE": {"temp": 30, "wbgt": 25},
        "HIGH": {"temp": 35, "wbgt": 30},
        "EXTREME": {"temp": 40, "wbgt": 35}
    }
    
    @staticmethod
    def calculate_wbgt(temp: float, humidity: float, solar_radiation: float = 0) -> float:
        """
        Simplified WBGT calculation
        WBGT = 0.7 * Tw + 0.2 * Tg + 0.1 * Ta
        For simplification: WBGT ≈ 0.9 * Ta + 0.1 * Humidity
        """
        if temp is None or humidity is None:
            return 0
        return (0.9 * temp) + (0.1 * humidity)
    
    @staticmethod
    def assess_risk(
        temperature: float,
        humidity: float,
        wind: float,
        solar_radiation: float = 0,
        wbgt: float = None
    ) -> Tuple[str, Dict[str, Any]]:
        """
        Assess heat risk level
        
        Returns:
            Tuple of (risk_level, details)
        """
        if wbgt is None:
            wbgt = HeatRiskEngine.calculate_wbgt(temperature, humidity, solar_radiation)
        
        # Calculate risk score
        risk_score = 0
        
        # Temperature contribution
        if temperature >= 40:
            risk_score += 4
        elif temperature >= 35:
            risk_score += 3
        elif temperature >= 30:
            risk_score += 2
        elif temperature >= 25:
            risk_score += 1
        
        # WBGT contribution
        if wbgt >= 35:
            risk_score += 4
        elif wbgt >= 30:
            risk_score += 3
        elif wbgt >= 25:
            risk_score += 2
        elif wbgt >= 20:
            risk_score += 1
        
        # Humidity contribution (high humidity increases heat stress)
        if humidity >= 80:
            risk_score += 2
        elif humidity >= 60:
            risk_score += 1
        
        # Wind contribution (low wind increases heat stress)
        if wind < 2:
            risk_score += 1
        
        # Determine risk level
        if risk_score >= 12:
            risk_level = "EXTREME"
        elif risk_score >= 8:
            risk_level = "HIGH"
        elif risk_score >= 4:
            risk_level = "MODERATE"
        else:
            risk_level = "LOW"
        
        details = {
            "temperature": temperature,
            "humidity": humidity,
            "wind": wind,
            "solar_radiation": solar_radiation,
            "wbgt": round(wbgt, 1),
            "risk_score": risk_score,
            "risk_factors": []
        }
        
        # Identify contributing factors
        if temperature >= 35:
            details["risk_factors"].append(f"High temperature: {temperature}°C")
        if humidity >= 70:
            details["risk_factors"].append(f"High humidity: {humidity}%")
        if wbgt >= 30:
            details["risk_factors"].append(f"High heat index (WBGT): {round(wbgt, 1)}°C")
        if wind < 3:
            details["risk_factors"].append("Low wind speeds reduce cooling")
        
        return risk_level, details


class WaterRiskEngine:
    """Calculate water availability and rainwater harvesting potential"""
    
    @staticmethod
    def calculate_rainwater_potential(
        rainfall: float,
        roof_area: float = 100,  # m² (default)
        collection_efficiency: float = 0.8  # 80% collection efficiency
    ) -> float:
        """
        Calculate rainwater harvesting potential
        
        Formula: Volume = Rainfall (mm) × Area (m²) × Efficiency
        Result in liters
        """
        if rainfall is None or rainfall < 0:
            return 0
        
        # Convert: 1mm rainfall on 1m² = 1 liter
        volume_liters = rainfall * roof_area * collection_efficiency
        return round(volume_liters, 1)
    
    @staticmethod
    def assess_water_stress(
        recent_rainfall: float,
        historical_avg_rainfall: float,
        forecast_rainfall: float = None,
        current_storage: float = 0,
        daily_demand: float = 100  # liters per day
    ) -> Tuple[str, Dict[str, Any]]:
        """
        Assess water stress level
        
        Returns:
            Tuple of (stress_level, details)
        """
        stress_score = 0
        
        # Check recent rainfall vs historical
        if recent_rainfall < historical_avg_rainfall * 0.5:
            stress_score += 3
        elif recent_rainfall < historical_avg_rainfall * 0.8:
            stress_score += 2
        elif recent_rainfall > historical_avg_rainfall * 1.2:
            stress_score -= 1  # Good rainfall
        
        # Check current storage adequacy
        days_of_supply = current_storage / daily_demand if daily_demand > 0 else 0
        if days_of_supply < 2:
            stress_score += 3
        elif days_of_supply < 5:
            stress_score += 2
        elif days_of_supply < 7:
            stress_score += 1
        
        # Forecast consideration
        if forecast_rainfall is not None:
            if forecast_rainfall < historical_avg_rainfall * 0.5:
                stress_score += 2
            elif forecast_rainfall > historical_avg_rainfall * 1.2:
                stress_score -= 1
        
        # Determine stress level
        stress_score = max(0, stress_score)  # Don't go below 0
        
        if stress_score >= 6:
            stress_level = "CRITICAL"
        elif stress_score >= 4:
            stress_level = "HIGH"
        elif stress_score >= 2:
            stress_level = "MODERATE"
        else:
            stress_level = "LOW"
        
        details = {
            "recent_rainfall": recent_rainfall,
            "historical_avg": historical_avg_rainfall,
            "forecast_rainfall": forecast_rainfall,
            "current_storage": current_storage,
            "daily_demand": daily_demand,
            "days_of_supply": round(days_of_supply, 1),
            "stress_score": stress_score,
            "stress_factors": []
        }
        
        # Identify factors
        if recent_rainfall < historical_avg_rainfall * 0.5:
            details["stress_factors"].append("Rainfall significantly below historical average")
        if days_of_supply < 3:
            details["stress_factors"].append("Storage will be depleted within 3 days")
        if forecast_rainfall is not None and forecast_rainfall < 5:
            details["stress_factors"].append("Little rainfall expected in forecast")
        
        return stress_level, details


class RainRiskEngine:
    """Detect extreme rainfall and flood risk"""
    
    @staticmethod
    def detect_anomaly(
        current_rainfall: float,
        rainfall_intensity: float,
        historical_baseline: float,
        cumulative_rainfall_24h: float = None
    ) -> Tuple[str, Dict[str, Any]]:
        """
        Detect extreme rainfall anomalies
        
        Returns:
            Tuple of (risk_level, details)
        """
        risk_score = 0
        
        # Compare current intensity to baseline
        if rainfall_intensity > 0:
            intensity_ratio = rainfall_intensity / max(historical_baseline, 1)
            
            if intensity_ratio > 4:
                risk_score += 4
            elif intensity_ratio > 3:
                risk_score += 3
            elif intensity_ratio > 2:
                risk_score += 2
            elif intensity_ratio > 1.5:
                risk_score += 1
        
        # Check cumulative 24h rainfall
        if cumulative_rainfall_24h is not None:
            if cumulative_rainfall_24h > historical_baseline * 3:
                risk_score += 3
            elif cumulative_rainfall_24h > historical_baseline * 2:
                risk_score += 2
            elif cumulative_rainfall_24h > historical_baseline * 1.5:
                risk_score += 1
        
        # Determine risk level
        if risk_score >= 6:
            risk_level = "EXTREME"
        elif risk_score >= 4:
            risk_level = "HIGH"
        elif risk_score >= 2:
            risk_level = "MODERATE"
        else:
            risk_level = "LOW"
        
        details = {
            "current_rainfall": current_rainfall,
            "rainfall_intensity": rainfall_intensity,
            "historical_baseline": historical_baseline,
            "cumulative_24h": cumulative_rainfall_24h,
            "risk_score": risk_score,
            "anomaly_factor": round(rainfall_intensity / max(historical_baseline, 1), 2),
            "risk_factors": []
        }
        
        # Identify factors
        if rainfall_intensity > historical_baseline * 2:
            details["risk_factors"].append(f"Rainfall intensity {round(rainfall_intensity / max(historical_baseline, 1), 1)}x above normal")
        if cumulative_rainfall_24h is not None and cumulative_rainfall_24h > historical_baseline * 2:
            details["risk_factors"].append("High cumulative rainfall over 24 hours")
        
        return risk_level, details
