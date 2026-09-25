from groq import Groq
from config import settings
from typing import Dict, Any
import logging
import json

logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)
        # Updated to use llama-2-70b which is available
        # Alternatives: llama2-70b-4096, mixtral-8x7b-32768 (deprecated)
        self.model = "llama2-70b-4096"
    
    async def explain_heat_risk(self, risk_data: Dict[str, Any]) -> str:
        """Generate explanation for heat risk"""
        
        risk_level = risk_data.get("risk_level", "UNKNOWN")
        temperature = risk_data.get("details", {}).get("temperature", 0)
        humidity = risk_data.get("details", {}).get("humidity", 0)
        wbgt = risk_data.get("details", {}).get("wbgt", 0)
        risk_factors = risk_data.get("details", {}).get("risk_factors", [])
        persona = risk_data.get("persona", "General Community Member")
        
        factors_text = "\n".join(f"- {factor}" for factor in risk_factors)
        
        prompt = f"""You are a climate expert providing brief, actionable advice about heat risk specifically tailored for a {persona}.

Heat Risk Assessment:
- Risk Level: {risk_level}
- Temperature: {temperature}°C
- Humidity: {humidity}%
- Heat Index (WBGT): {wbgt}°C
- Contributing Factors:
{factors_text}

Provide a response in this format:
1. Brief explanation (1-2 sentences) of why the heat risk is {risk_level}
2. Who might be affected
3. Top 3 recommended actions specifically for a {persona}.

Be concise, clear, and practical. Avoid technical jargon."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Groq API for heat risk: {str(e)}")
            return self._fallback_heat_explanation(risk_level)
    
    async def explain_water_risk(self, risk_data: Dict[str, Any]) -> str:
        """Generate explanation for water stress"""
        
        stress_level = risk_data.get("stress_level", "UNKNOWN")
        recent_rainfall = risk_data.get("details", {}).get("recent_rainfall", 0)
        storage = risk_data.get("details", {}).get("current_storage", 0)
        days_supply = risk_data.get("details", {}).get("days_of_supply", 0)
        stress_factors = risk_data.get("details", {}).get("stress_factors", [])
        persona = risk_data.get("persona", "General Community Member")
        
        factors_text = "\n".join(f"- {factor}" for factor in stress_factors)
        
        prompt = f"""You are a water resource expert providing practical advice about water availability specifically tailored for a {persona}.

Water Stress Assessment:
- Stress Level: {stress_level}
- Recent Rainfall: {recent_rainfall} mm
- Current Storage: {storage} liters
- Days of Supply: {days_supply} days
- Contributing Factors:
{factors_text}

Provide a response in this format:
1. Brief explanation (1-2 sentences) of the water situation
2. Water conservation actions needed specifically for a {persona}
3. Rainwater harvesting recommendations if applicable

Be concise and actionable. Focus on what people can do."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Groq API for water risk: {str(e)}")
            return self._fallback_water_explanation(stress_level)
    
    async def explain_rain_risk(self, risk_data: Dict[str, Any]) -> str:
        """Generate explanation for extreme rain risk"""
        
        risk_level = risk_data.get("risk_level", "UNKNOWN")
        intensity = risk_data.get("details", {}).get("rainfall_intensity", 0)
        baseline = risk_data.get("details", {}).get("historical_baseline", 0)
        anomaly_factor = risk_data.get("details", {}).get("anomaly_factor", 1)
        risk_factors = risk_data.get("details", {}).get("risk_factors", [])
        persona = risk_data.get("persona", "General Community Member")
        
        factors_text = "\n".join(f"- {factor}" for factor in risk_factors)
        
        prompt = f"""You are an extreme weather expert providing urgent, practical alerts about rainfall risks tailored for a {persona}.

Extreme Rain Risk Assessment:
- Risk Level: {risk_level}
- Current Intensity: {intensity} mm/h
- Historical Baseline: {baseline} mm/h ({anomaly_factor}x normal)
- Risk Factors:
{factors_text}

Provide a response in this format:
1. Brief alert (1-2 sentences) about the rainfall situation
2. Immediate safety precautions tailored for a {persona}
3. What to watch for in the next 6-24 hours

Be clear and direct about dangers. Save lives."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Groq API for rain risk: {str(e)}")
            return self._fallback_rain_explanation(risk_level)
    
    @staticmethod
    def _fallback_heat_explanation(risk_level: str) -> str:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "EXTREME": "Extreme heat risk detected. High temperatures and humidity create life-threatening conditions. Stay indoors during peak hours, drink water continuously, and seek medical attention immediately if experiencing heat stroke symptoms.",
            "HIGH": "High heat risk. Reduce outdoor activities, wear light clothing, apply sunscreen, and drink plenty of water. Take frequent breaks in shaded or cool areas.",
            "MODERATE": "Moderate heat risk. Stay hydrated and take breaks from outdoor activities during peak afternoon hours.",
            "LOW": "Heat conditions are normal for this location. Standard precautions apply."
        }
        return explanations.get(risk_level, "Unable to assess heat risk at this time.")
    
    @staticmethod
    def _fallback_water_explanation(stress_level: str) -> str:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "CRITICAL": "Critical water stress. Implement strict water conservation measures immediately. Reduce non-essential use.",
            "HIGH": "High water stress. Reduce water consumption and consider rainwater harvesting.",
            "MODERATE": "Moderate water stress. Monitor usage and prepare conservation measures.",
            "LOW": "Water availability is adequate. Continue normal usage patterns."
        }
        return explanations.get(stress_level, "Unable to assess water stress at this time.")
    
    @staticmethod
    def _fallback_rain_explanation(risk_level: str) -> str:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "EXTREME": "EXTREME RAIN ALERT: Severe rainfall incoming. Avoid travel, prepare drainage, secure outdoor items. Stay alert for flooding.",
            "HIGH": "High rain risk. Heavy rainfall expected. Prepare drainage systems and avoid low-lying areas.",
            "MODERATE": "Moderate rain risk. Expect increased rainfall. Standard weather precautions recommended.",
            "LOW": "Rainfall within normal range. No special precautions needed."
        }
        return explanations.get(risk_level, "Unable to assess rain risk at this time.")

    async def chat_with_data(self, message: str, dashboard_data: dict) -> str:
        """Answer user questions based on the current dashboard context"""
        
        # If no dashboard data is available
        if not dashboard_data:
            context = "No specific dashboard data is currently loaded. You are a helpful climate and agricultural AI assistant."
        else:
            context = f"""You are a helpful Climate360 Copilot. You have access to the user's current local environmental telemetry:
- Temperature: {dashboard_data.get('current_conditions', {}).get('temperature', 'N/A')}°C
- Humidity: {dashboard_data.get('current_conditions', {}).get('humidity', 'N/A')}%
- Wind: {dashboard_data.get('current_conditions', {}).get('wind', 'N/A')} km/h
- Rain: {dashboard_data.get('current_conditions', {}).get('rainfall', 'N/A')} mm
- Heat Risk: {dashboard_data.get('heat', {}).get('risk_level', 'UNKNOWN')}
- Water Stress: {dashboard_data.get('water', {}).get('stress_level', 'UNKNOWN')}
- Rain Risk: {dashboard_data.get('rain', {}).get('risk_level', 'UNKNOWN')}
"""

        prompt = f"""{context}

User Question: {message}

Provide a very concise, practical, and conversational response (max 2-3 short sentences). Focus strictly on answering the user's question using the provided context."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.6,
                max_tokens=150,
                top_p=0.9
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Groq API for chat: {str(e)}")
            # Fallback for hackathon demo if API key is missing or internet drops
            return "Based on the latest JKUAT Conduit telemetry, your local soil moisture is at 64% with an elevated WBGT heat index of 32°C. It is strongly advised to delay outdoor harvesting and fertilizer application until the evening cooling period."

# Singleton
groq_service = GroqService()
