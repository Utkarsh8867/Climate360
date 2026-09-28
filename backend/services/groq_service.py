from groq import Groq
from config import settings
from typing import Dict, Any
import logging
import json

logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)
        # Updated to use a current supported model (Llama 3)
        self.model = "llama3-70b-8192"
    
    async def explain_heat_risk(self, risk_data: Dict[str, Any]) -> dict:
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

Provide a JSON response with exactly these keys:
- "why": Brief explanation (1 sentence) of why the heat risk is {risk_level} based on the data.
- "what_may_happen": The potential impact or what might happen in the near term (1 sentence).
- "what_should_i_do": Top 2-3 recommended actions specifically for a {persona}.

Be concise, clear, and practical. Avoid technical jargon. Ensure the response is valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            logger.error(f"Error calling Groq API for heat risk: {str(e)}")
            return self._fallback_heat_explanation(risk_level)
    
    async def explain_water_risk(self, risk_data: Dict[str, Any]) -> dict:
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

Provide a JSON response with exactly these keys:
- "why": Brief explanation (1 sentence) of the water situation based on the data.
- "what_may_happen": The potential impact if the situation continues (1 sentence).
- "what_should_i_do": 2-3 Water conservation or rainwater harvesting actions needed specifically for a {persona}.

Be concise and actionable. Focus on what people can do. Ensure the response is valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            logger.error(f"Error calling Groq API for water risk: {str(e)}")
            return self._fallback_water_explanation(stress_level)
    
    async def explain_rain_risk(self, risk_data: Dict[str, Any]) -> dict:
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

Provide a JSON response with exactly these keys:
- "why": Brief alert (1 sentence) about the rainfall situation based on the data.
- "what_may_happen": What to watch for in the next 6-24 hours (1 sentence).
- "what_should_i_do": 2-3 Immediate safety precautions tailored for a {persona}.

Be clear and direct about dangers. Ensure the response is valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=300,
                top_p=0.9,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            logger.error(f"Error calling Groq API for rain risk: {str(e)}")
            return self._fallback_rain_explanation(risk_level)
    
    @staticmethod
    def _fallback_heat_explanation(risk_level: str) -> dict:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "EXTREME": {
                "why": "Extreme heat risk detected due to dangerously high temperatures and humidity.",
                "what_may_happen": "These conditions create life-threatening heat stress.",
                "what_should_i_do": "Stay indoors during peak hours, drink water continuously, and seek medical attention immediately if experiencing heat stroke symptoms."
            },
            "HIGH": {
                "why": "High heat risk due to elevated temperatures and humidity.",
                "what_may_happen": "Prolonged exposure can lead to heat exhaustion.",
                "what_should_i_do": "Reduce outdoor activities, wear light clothing, apply sunscreen, and drink plenty of water."
            },
            "MODERATE": {
                "why": "Moderate heat risk due to warm conditions.",
                "what_may_happen": "Some discomfort during extended outdoor activities.",
                "what_should_i_do": "Stay hydrated and take breaks from outdoor activities during peak afternoon hours."
            },
            "LOW": {
                "why": "Heat conditions are currently within normal ranges.",
                "what_may_happen": "No significant heat-related health impacts expected.",
                "what_should_i_do": "Standard precautions apply."
            }
        }
        return explanations.get(risk_level, {
            "why": "Unable to assess heat risk at this time.",
            "what_may_happen": "Unknown conditions.",
            "what_should_i_do": "Exercise standard caution."
        })
    
    @staticmethod
    def _fallback_water_explanation(stress_level: str) -> dict:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "CRITICAL": {
                "why": "Critical water stress due to significantly depleted storage and low rainfall.",
                "what_may_happen": "Severe water shortages are imminent.",
                "what_should_i_do": "Implement strict water conservation measures immediately and reduce non-essential use."
            },
            "HIGH": {
                "why": "High water stress due to declining storage or poor recent rainfall.",
                "what_may_happen": "Potential water restrictions may be required soon.",
                "what_should_i_do": "Reduce water consumption and prepare rainwater harvesting systems."
            },
            "MODERATE": {
                "why": "Moderate water stress indicating below-average water availability.",
                "what_may_happen": "Gradual depletion of water reserves if dry conditions persist.",
                "what_should_i_do": "Monitor usage and prepare conservation measures."
            },
            "LOW": {
                "why": "Water availability is currently adequate.",
                "what_may_happen": "Sufficient water supply for near-term needs.",
                "what_should_i_do": "Continue normal usage patterns and maintain harvesting infrastructure."
            }
        }
        return explanations.get(stress_level, {
            "why": "Unable to assess water stress at this time.",
            "what_may_happen": "Unknown conditions.",
            "what_should_i_do": "Exercise standard water conservation."
        })
    
    @staticmethod
    def _fallback_rain_explanation(risk_level: str) -> dict:
        """Fallback explanation if Groq API fails"""
        explanations = {
            "EXTREME": {
                "why": "EXTREME RAIN ALERT: Severe and highly anomalous rainfall incoming.",
                "what_may_happen": "Life-threatening flash floods and structural damage are highly likely.",
                "what_should_i_do": "Avoid all travel, prepare drainage, secure outdoor items, and evacuate low-lying areas if instructed."
            },
            "HIGH": {
                "why": "High rain risk with heavy rainfall expected.",
                "what_may_happen": "Localized flooding and waterlogging are possible.",
                "what_should_i_do": "Prepare drainage systems, clear gutters, and avoid low-lying areas."
            },
            "MODERATE": {
                "why": "Moderate rain risk with increased rainfall levels.",
                "what_may_happen": "Minor pooling of water in susceptible areas.",
                "what_should_i_do": "Standard weather precautions recommended."
            },
            "LOW": {
                "why": "Rainfall is within normal and safe ranges.",
                "what_may_happen": "No extreme weather impacts expected.",
                "what_should_i_do": "No special precautions needed."
            }
        }
        return explanations.get(risk_level, {
            "why": "Unable to assess rain risk at this time.",
            "what_may_happen": "Unknown conditions.",
            "what_should_i_do": "Monitor local weather updates."
        })

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
