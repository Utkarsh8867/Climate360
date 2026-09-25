# Climate360 - Climate Intelligence Platform

A comprehensive climate intelligence system that converts raw weather data into understandable predictions, risk alerts, and personalized actions.

## Architecture Overview

```
JHUB Conduit API
       ↓
Data Processing
       ↓
┌──────────┬──────────┬──────────┐
│  🔥 HEAT │💧 WATER │ 🌧️ RAIN  │
└──────────┴──────────┴──────────┘
       ↓
   RISK ENGINE
       ↓
    GROQ AI
       ↓
CLIMATE360 UI
```

## Features

### 🔥 Heat Risk Module
- Temperature and humidity analysis
- WBGT (Wet Bulb Globe Temperature) calculation
- Heat stress risk assessment (LOW → MODERATE → HIGH → EXTREME)
- AI-powered explanations and recommendations

### 💧 Water Intelligence Module
- Rainfall and water availability analysis
- Rainwater harvesting potential calculation
- Water stress level assessment
- Storage forecasting

### 🌧️ Extreme Rain Risk Module
- Rainfall intensity anomaly detection
- Historical baseline comparison
- Cumulative rainfall analysis
- Flood risk alerts

## Tech Stack

- **Frontend**: React.js, Recharts, Lucide Icons
- **Backend**: Python, FastAPI
- **Database**: PostgreSQL
- **ML/Intelligence**: Scikit-learn, NumPy, Pandas
- **AI**: Groq LLM
- **Containerization**: Docker & Docker Compose

## Prerequisites

1. **Docker & Docker Compose** installed
2. **Groq API Key** - Get from [Groq Console](https://console.groq.com)
3. **JHUB Conduit API Credentials**:
   - API Key
   - Registered Email
   - API URL: https://conduit.jhubafrica.com/data.php

## Setup Instructions

### Step 1: Clone and Setup Environment

```bash
cd climate360
```

### Step 2: Create .env File

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
# Groq API
GROQ_API_KEY=your_groq_api_key_here

# JHUB Conduit API
CONDUIT_API_KEY=your_conduit_api_key_here
CONDUIT_EMAIL=your_email@example.com
CONDUIT_API_URL=https://conduit.jhubafrica.com/data.php

# Database (keep as-is for Docker)
DATABASE_URL=postgresql://climate360:climate360pass@postgres:5432/climate360

# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
ENVIRONMENT=development

# Frontend
REACT_APP_API_URL=http://localhost:8000/api
```

### Step 3: Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:
- Start PostgreSQL database on port 5432
- Start FastAPI backend on port 8000
- Start React frontend on port 3000

### Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## API Endpoints

### Health & Status
- `GET /api/health` - Health check
- `GET /api/status` - Application status

### Climate Data
- `GET /api/climate/latest` - Get latest climate data
- `POST /api/climate/data` - Get climate data for date range

### Risk Assessment
- `POST /api/climate/risk/heat` - Assess heat risk
- `POST /api/climate/risk/water` - Assess water stress
- `POST /api/climate/risk/rain` - Assess extreme rain risk
- `POST /api/climate/dashboard` - Get complete dashboard

### Conduit API
- `POST /api/conduit/fetch` - Fetch raw data from Conduit
- `GET /api/conduit/status` - Check Conduit connectivity

## Usage

### Via Frontend UI

1. Open http://localhost:3000
2. Enter weather data in the form:
   - Current conditions (temperature, humidity, wind, rainfall)
   - Historical data (recent rainfall, historical average, storage)
3. Click "Analyze Climate Data"
4. View risk assessment and AI-powered recommendations

### Via API

```bash
curl -X POST "http://localhost:8000/api/climate/dashboard" \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 35,
    "humidity": 72,
    "wind": 5,
    "rainfall": 0,
    "wbgt": 31.5,
    "solar_radiation": 0,
    "recent_rainfall": 15,
    "historical_avg_rainfall": 20,
    "current_storage": 1000,
    "historical_baseline_rain": 10,
    "rainfall_intensity": 5
  }'
```

## Project Structure

```
climate360/
├── backend/
│   ├── main.py                 # FastAPI app
│   ├── config.py              # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Backend Docker image
│   ├── services/
│   │   ├── conduit_client.py   # Conduit API client
│   │   ├── risk_engines.py     # Risk calculation engines
│   │   └── groq_service.py     # Groq LLM integration
│   └── routes/
│       ├── health.py          # Health endpoints
│       ├── climate.py          # Climate risk endpoints
│       └── conduit.py          # Conduit data endpoints
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── App.js              # Main App component
│   │   ├── App.css             # App styles
│   │   ├── index.js            # React entry point
│   │   └── components/
│   │       ├── Header.js
│   │       ├── Dashboard.js
│   │       ├── DataInput.js
│   │       ├── RiskCard.js
│   │       ├── CurrentConditions.js
│   │       ├── Loading.js
│   │       ├── Error.js
│   │       └── *.css            # Component styles
│   ├── package.json            # Node dependencies
│   └── Dockerfile              # Frontend Docker image
│
├── docker-compose.yml          # Docker orchestration
├── .env.example                # Environment template
└── README.md                   # This file
```

## How It Works

### Data Flow

1. **User Input** → Frontend collects weather data
2. **Risk Calculation** → Backend processes data through three risk engines:
   - Heat Risk Engine: Calculates heat stress based on temp, humidity, WBGT
   - Water Risk Engine: Assesses water stress and harvesting potential
   - Rain Risk Engine: Detects anomalies in rainfall patterns
3. **AI Enhancement** → Groq LLM processes risk data and generates:
   - Human-friendly explanations
   - Contributing factors analysis
   - Personalized recommendations
4. **Display** → Frontend shows results with visualization

### Risk Calculation Logic

#### Heat Risk
```
Heat Score = 
  Temperature contribution (0-4)
  + WBGT contribution (0-4)
  + Humidity contribution (0-2)
  + Wind contribution (0-1)

Score 12+: EXTREME
Score 8-11: HIGH
Score 4-7: MODERATE
Score <4: LOW
```

#### Water Stress
```
Stress Score =
  Rainfall vs Historical (-1 to +3)
  + Storage vs Demand (0-3)
  + Forecast consideration (-1 to +2)

Score 6+: CRITICAL
Score 4-5: HIGH
Score 2-3: MODERATE
Score <2: LOW
```

#### Rain Risk
```
Risk Score =
  Intensity ratio (Current vs Baseline): 0-4
  + Cumulative 24h: 0-3

Score 6+: EXTREME
Score 4-5: HIGH
Score 2-3: MODERATE
Score <2: LOW
```

## Development

### Backend Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run locally
python main.py
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm start
```

## Testing

### Test Heat Risk Endpoint

```bash
curl -X POST "http://localhost:8000/api/climate/risk/heat?temperature=38&humidity=72&wind=3&solar_radiation=800&wbgt=31.5"
```

### Test Water Risk Endpoint

```bash
curl -X POST "http://localhost:8000/api/climate/risk/water?recent_rainfall=15&historical_avg_rainfall=20&current_storage=1000&daily_demand=100&forecast_rainfall=10&roof_area=100"
```

### Test Rain Risk Endpoint

```bash
curl -X POST "http://localhost:8000/api/climate/risk/rain?current_rainfall=45&rainfall_intensity=45&historical_baseline=15&cumulative_24h=120"
```

## Troubleshooting

### Backend won't start
- Check that port 8000 is not in use
- Verify environment variables in `.env`
- Check logs: `docker logs climate360-backend`

### Frontend can't connect to API
- Ensure backend is running and healthy
- Check `REACT_APP_API_URL` in `.env`
- Browser console will show API errors

### Database connection failed
- Ensure PostgreSQL container is running
- Check DATABASE_URL is correct
- Verify credentials match docker-compose.yml

### Groq API errors
- Verify GROQ_API_KEY is correct
- Check API key has required permissions
- View backend logs for detailed error

## Next Steps

- [ ] Add multilingual support (Swahili, Hindi, Marathi)
- [ ] Integrate voice input/output (Speech-to-Text, Text-to-Speech)
- [ ] Add historical data persistence and analytics
- [ ] Build "What-If" scenario simulator
- [ ] Create mobile app
- [ ] Add location-based data fetching
- [ ] Implement user profiles (Farmer, School, Authority modes)

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at http://localhost:8000/docs
3. Check backend logs: `docker logs climate360-backend`
4. Check frontend logs in browser console

---

**Climate360** - Making climate intelligence accessible to everyone.
