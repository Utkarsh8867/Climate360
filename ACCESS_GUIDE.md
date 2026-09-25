# Climate360 - Access Guide

## 🎯 How to Access Climate360

### Application URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| **Landing Page** | http://localhost:3000 | Home page with features overview |
| **Dashboard** | http://localhost:3000/dashboard | Climate analysis tool |
| **API** | http://localhost:8000 | Backend server |
| **API Docs** | http://localhost:8000/docs | Swagger documentation |
| **API ReDoc** | http://localhost:8000/redoc | ReDoc documentation |

---

## Landing Page Sections (Scroll Down)

When you first open http://localhost:3000, you'll see:

1. **🔝 Hero Section**
   - Climate360 branding and value proposition
   - "Explore Climate Intelligence" button
   - Three risk engines preview
   - Conduit@Empathy attribution

2. **📋 The Problem**
   - Why climate data alone isn't enough
   - Questions people ask but can't answer
   - Climate360's approach: Data → Insight → Risk → Action → Impact

3. **⚙️ How It Works**
   - 5-step process (Collect → Understand → Analyze → Explain → Act)
   - Visual flows showing data transformation

4. **🎯 Three Intelligence Cards**
   - Heat Risk - Monitor heat stress
   - Water Risk - Track water availability
   - Rain Risk - Detect extreme rainfall

5. **🤖 AI Action Assistant**
   - Example questions users can ask
   - AI-powered natural language responses
   - Voice features (coming in Phase 2)

6. **👥 Who Is It For?**
   - Farmers, Schools, Communities, Local Decision-Makers
   - Use cases for each group

7. **📊 Dashboard Preview**
   - Visual mockup of real dashboard
   - Sample weather data and risk display

8. **🔗 Why Conduit@Empathy**
   - How we meaningfully use the platform
   - Data → Analysis → Risk Detection → AI → Actions

9. **💻 Technology Stack**
   - Frontend, Backend, Database, AI, Infrastructure

10. **🎬 Final CTA**
    - "Turn Climate Data Into Climate Action"
    - Button to explore dashboard

---

## Navigation

### In Header
- **Climate360 Logo** - Click to return to landing page
- **Home** - Landing page
- **Dashboard** - Climate analysis tool
- **About** - About page (future)

### Mobile Menu
On mobile devices, a hamburger menu appears with the same navigation options.

---

## Dashboard Usage

### Step 1: Click "Explore Climate Intelligence"
From the landing page hero section, click the primary button.

### Step 2: Enter Weather Data
Fill in the form with two types of data:

**Current Conditions Tab:**
- Temperature (°C)
- Humidity (%)
- Wind Speed (km/h)
- Current Rainfall (mm)
- Rainfall Intensity (mm/h)

**Historical Data Tab:**
- Recent Rainfall (mm)
- Historical Average Rainfall (mm)
- Historical Baseline Rainfall (mm/h)
- Current Water Storage (liters)

**Suggested Test Data:**
```
Temperature:              28°C
Humidity:                 65%
Wind:                     5 km/h
Current Rainfall:         0 mm
Rainfall Intensity:       5 mm/h
Recent Rainfall:          15 mm
Historical Avg Rainfall:  20 mm
Historical Baseline:      10 mm/h
Current Storage:          1000 L
```

### Step 3: Click "Analyze Climate Data"
The application will:
1. Process the data
2. Run through three risk engines
3. Send results to Groq LLM
4. Generate AI-powered explanations

### Step 4: View Results
You'll see:
- **Quick Summary** - Three risk levels at the top (Heat, Water, Rain)
- **Current Conditions** - Your weather data displayed
- **Three Risk Cards** - Detailed analysis for each risk type
  - Risk level (LOW/MODERATE/HIGH/EXTREME)
  - Key metrics
  - Contributing factors
  - AI-generated explanation
  - Expandable detailed information

### Step 5: Reset
Click "Enter New Data" to submit different weather conditions.

---

## API Testing

### Using cURL

**Test Heat Risk:**
```bash
curl -X POST "http://localhost:8000/api/climate/risk/heat" \
  -d "temperature=35&humidity=72&wind=5&solar_radiation=800"
```

**Test Water Risk:**
```bash
curl -X POST "http://localhost:8000/api/climate/risk/water" \
  -d "recent_rainfall=15&historical_avg_rainfall=20&current_storage=1000"
```

**Test Rain Risk:**
```bash
curl -X POST "http://localhost:8000/api/climate/risk/rain" \
  -d "current_rainfall=45&rainfall_intensity=45&historical_baseline=15"
```

**Test Complete Dashboard:**
```bash
curl -X POST "http://localhost:8000/api/climate/dashboard" \
  -d "temperature=28&humidity=65&wind=5&rainfall=0&solar_radiation=0&recent_rainfall=15&historical_avg_rainfall=20&current_storage=1000&historical_baseline_rain=10&rainfall_intensity=5"
```

### Using Swagger UI
1. Open http://localhost:8000/docs
2. Find "climate" endpoints
3. Click "Try it out"
4. Enter parameters
5. Click "Execute"
6. See response

---

## Risk Level Interpretation

### Heat Risk Levels
- **LOW** - Safe for outdoor activities
- **MODERATE** - Take precautions (hydration, breaks)
- **HIGH** - Reduce outdoor exposure
- **EXTREME** - Seek indoor/shaded areas, medical alert

### Water Stress Levels
- **LOW** - Water available
- **MODERATE** - Monitor usage
- **HIGH** - Implement conservation
- **CRITICAL** - Urgent action needed

### Rain Risk Levels
- **LOW** - Normal conditions
- **MODERATE** - Monitor conditions
- **HIGH** - Prepare for heavy rain
- **EXTREME** - Flood risk - seek safety

---

## Example Scenarios

### Scenario 1: High Heat Risk
**Input:**
- Temperature: 38°C
- Humidity: 75%
- Wind: 2 km/h
- Solar Radiation: 900 W/m²

**Expected Output:**
- Heat Risk: HIGH or EXTREME
- AI Explanation: References heat stress, outdoor exposure, hydration recommendations

### Scenario 2: Water Scarcity
**Input:**
- Recent Rainfall: 10 mm
- Historical Avg: 40 mm
- Current Storage: 200 L
- Daily Demand: 100 L

**Expected Output:**
- Water Stress: CRITICAL
- AI Explanation: Discusses water shortage, conservation, harvesting opportunities

### Scenario 3: Extreme Rain
**Input:**
- Rainfall Intensity: 50 mm/h
- Historical Baseline: 15 mm/h
- Cumulative 24h: 150 mm

**Expected Output:**
- Rain Risk: EXTREME
- AI Explanation: Flood warnings, safety precautions, infrastructure concerns

### Scenario 4: Normal Conditions
**Input:**
- Temperature: 26°C
- Humidity: 55%
- Wind: 8 km/h
- Recent Rainfall: 25 mm (matches historical average)
- Storage adequate

**Expected Output:**
- All risks: LOW
- AI Explanation: Conditions normal, standard precautions

---

## Troubleshooting

### "Cannot connect to http://localhost:3000"
- Make sure Docker containers are running: `docker-compose ps`
- Check if port 3000 is available
- Try waiting 30 seconds for frontend to compile

### "API requests fail"
- Verify backend is running: `curl http://localhost:8000/api/health`
- Check API keys in .env file
- Review backend logs: `docker logs climate360-backend`

### "Blank dashboard"
- Frontend may still be compiling (wait 1-2 minutes)
- Check browser console for errors (F12 → Console)
- Review frontend logs: `docker logs climate360-frontend`

### "AI explanations are generic"
- Groq API key may be invalid or expired
- Check backend logs for Groq errors
- System falls back to generic explanations (this is working as designed)
- Verify API key has required permissions

---

## Performance Tips

### Faster Testing
1. Keep browser open (reduces recompile time)
2. Use same API endpoint multiple times (cached)
3. Disable browser extensions (especially adblockers)

### View Logs While Testing
```bash
# Terminal 1: Watch frontend
docker logs climate360-frontend -f

# Terminal 2: Watch backend  
docker logs climate360-backend -f
```

---

## Keyboard Shortcuts

### Navigation
- `Tab` - Navigate through form fields
- `Enter` - Submit form / Click button
- `Esc` - Close menus (mobile)

### Risk Cards
- `Click` - Expand/collapse detailed information
- `Scroll` - Navigate through sections

---

## Browser Compatibility

✅ **Tested and Working:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## Screen Sizes Optimized For

- ✅ Mobile: 320px - 480px
- ✅ Tablet: 481px - 768px
- ✅ Desktop: 769px - 1920px
- ✅ Large Desktop: 1921px+

---

## Data Persistence

### Where Data Is Stored
- **Dashboard Input**: Browser session only (not saved)
- **Risk Results**: Calculated real-time (not saved)
- **Climate Data**: PostgreSQL database (backend)
- **Application Config**: Docker volumes

### To Reset Everything
```bash
docker-compose down -v
docker-compose up -d --build
```

---

## Advanced Features (Coming Soon)

### Phase 2
- Voice input: Speak questions to AI
- Multilingual: Responses in 5+ languages
- "What-If" Simulator: Scenario modeling
- Historical Trends: Data analysis over time
- Community Sharing: Compare with neighbors
- Mobile App: iOS/Android versions

---

## Key Keyboard Navigation

**Form Input:**
- Tab through fields
- Shift+Tab to go back
- Enter to submit

**Risk Cards:**
- Tab to focus expandable sections
- Enter to toggle details
- Tab again to next card

---

## Settings & Preferences

Currently stored as defaults in code:
- Roof Area: 100 m²
- Daily Demand: 100 L
- Collection Efficiency: 80%

To change, edit `frontend/src/components/DataInput.js` and update initial state.

---

## Getting Help

### Within the App
- Hover over any question mark icon (future releases)
- Check API documentation: http://localhost:8000/docs
- Review this guide: ACCESS_GUIDE.md

### From Terminal
```bash
# View all available endpoints
curl http://localhost:8000/docs

# Check application health
curl http://localhost:8000/api/health

# View system logs
docker-compose logs

# Run tests
python backend/test_api.py
```

---

## What to Demonstrate

**To Judges/Stakeholders:**

1. **Landing Page Quality**
   - Show the professionally designed landing page
   - Highlight the 10 comprehensive sections
   - Demonstrate the Conduit@Empathy integration story

2. **Dashboard Functionality**
   - Enter test data
   - Show how risks are calculated
   - Display AI-generated explanations (not just fallbacks)

3. **Risk Engine Sophistication**
   - Heat: Show how WBGT is calculated
   - Water: Demonstrate harvesting potential calculation
   - Rain: Show anomaly detection vs baseline

4. **AI Integration**
   - Point out contextual Groq responses
   - Show how technical data becomes actionable
   - Demonstrate multilingual capability (if implemented)

5. **Infrastructure**
   - Show Docker containers running
   - Access API documentation
   - Demonstrate database persistence

---

**Ready to explore Climate360? Start at http://localhost:3000** 🚀

