# Climate360 - Hack The Weather 2026 🌍

**Turning Real-World Climate Data into Solutions That Matter.**

Climate360 is an autonomous risk-assessment engine built specifically for the **Hack The Weather 2026** innovation hackathon organized by JHUB Africa at JKUAT.

We bridge the gap between raw environmental data and immediate, life-saving community action.

## 🏆 Key Features

- **JKUAT Conduit Integration**: Automatically fetches live telemetry (Soil Moisture, UV, Solar Radiation, Rainfall) from Conduit@Empathy autonomous nodes in Juja, Kenya.
- **Groq Llama-3 AI Copilot**: Translates dense meteorological data into actionable advice tailored to specific personas (Farmers, Teachers, Local Officials) using Llama-3 70B via the blazing-fast Groq API.
- **Hyper-Local Risk Engines**: Computes real-time WBGT (Wet Bulb Globe Temperature) for heat stress, soil saturation deficits for water tracking, and downpour probabilities for extreme rain.
- **Command Center Dashboard**: Features an SMS emergency dispatch simulator and a one-click PDF export generator for county officials.

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS (Custom "Surface" Material Design theme)
- **Backend**: FastAPI (Python), asyncio, Pydantic
- **AI / LLM**: Groq API (Llama-3 70B)
- **Database**: Neon Serverless PostgreSQL
- **Hardware Data Source**: Conduit API (https://conduit.jhubafrica.com)

## 🚀 Running Locally (Docker)

The fastest way to run Climate360 is using Docker:

1. Clone the repository
2. Make a copy of `.env.example` and name it `.env`
3. Add your `GROQ_API_KEY` and `CONDUIT_API_KEY` to the `.env` file
4. Run:
```bash
docker-compose up --build
```
5. Open `http://localhost:3000` in your browser!

## 💡 The "Data to Impact" Workflow
1. **Collect**: Raw data streams in from the Conduit hardware.
2. **Understand**: Our backend cleans and filters the anomaly data.
3. **Analyze**: The Python Risk Engines trigger alerts based on algorithmic thresholds.
4. **Explain**: The Groq AI Copilot translates the alerts into human-readable advice.
5. **Act**: The dashboard dispatches guidance to the community.

Built with ❤️ for JHUB Africa.
