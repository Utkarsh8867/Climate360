# Climate360 Deployment & Testing Guide

## Pre-Deployment Checklist

### 1. Environment Setup ✓
- [ ] Clone the repository
- [ ] Create `.env` file from `.env.example`
- [ ] Add Groq API Key
- [ ] Add JHUB Conduit credentials
- [ ] Verify Docker & Docker Compose are installed

```bash
# Verify Docker installation
docker --version
docker-compose --version
```

### 2. Configuration Verification

Check your `.env` file contains:
```env
GROQ_API_KEY=sk-proj-xxxxx...
CONDUIT_API_KEY=your_key_here
CONDUIT_EMAIL=your_email@example.com
CONDUIT_API_URL=https://conduit.jhubafrica.com/data.php
DATABASE_URL=postgresql://climate360:climate360pass@postgres:5432/climate360
```

## Quick Start

### Option A: Using Start Scripts

**On macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**On Windows:**
```bash
start.bat
```

### Option B: Manual Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

## Verification Steps

### 1. Check Service Health

```bash
# Check all containers are running
docker-compose ps

# Expected output:
# NAME                    STATUS
# climate360-postgres     Up (healthy)
# climate360-backend      Up
# climate360-frontend     Up
```

### 2. Test Backend API

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Expected response:
# {"status":"healthy","timestamp":"2024-...","service":"Climate360"}
```

### 3. Test Conduit API Connection

```bash
curl http://localhost:8000/api/conduit/status

# Expected response shows connected status
```

### 4. Test Risk Engines

#### Heat Risk Test
```bash
curl -X POST "http://localhost:8000/api/climate/risk/heat" \
  -d "temperature=35&humidity=72&wind=5&solar_radiation=800&wbgt=31.5"

# Should return heat risk assessment with Groq explanation
```

#### Water Risk Test
```bash
curl -X POST "http://localhost:8000/api/climate/risk/water" \
  -d "recent_rainfall=15&historical_avg_rainfall=20&current_storage=1000&daily_demand=100"

# Should return water stress level and harvesting potential
```

#### Rain Risk Test
```bash
curl -X POST "http://localhost:8000/api/climate/risk/rain" \
  -d "current_rainfall=45&rainfall_intensity=45&historical_baseline=15"

# Should return extreme rain risk assessment
```

### 5. Test Complete Dashboard

```bash
curl -X POST "http://localhost:8000/api/climate/dashboard" \
  -d "temperature=35&humidity=72&wind=5&rainfall=0&wbgt=31.5&solar_radiation=800&recent_rainfall=15&historical_avg_rainfall=20&current_storage=1000&historical_baseline_rain=10&rainfall_intensity=5"

# Should return complete dashboard with all three risk assessments
```

### 6. Test Frontend

Open browser:
- http://localhost:3000

**Test Flow:**
1. Enter sample weather data
2. Click "Analyze Climate Data"
3. Verify dashboard loads with three risk cards
4. Expand cards to see detailed risk factors
5. Check Groq explanations are displayed

## API Documentation

Access interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find what's using port 3000, 8000, or 5432
# On Linux/Mac:
lsof -i :3000
lsof -i :8000
lsof -i :5432

# On Windows:
netstat -ano | findstr :3000
```

**Solution**: Change ports in docker-compose.yml or stop conflicting service

### Issue: Backend Won't Start

```bash
# Check logs
docker logs climate360-backend

# Common issues:
# - Missing API keys in .env
# - Database not ready (wait 10 seconds)
# - Port 8000 already in use
```

### Issue: Frontend Can't Connect to API

```bash
# Check browser console for CORS errors
# Verify REACT_APP_API_URL in .env
# Ensure backend is running: curl http://localhost:8000/api/health
```

### Issue: Groq API Errors

```bash
# Verify API key is correct
# Check Groq API key has required permissions
# View detailed logs: docker logs climate360-backend | grep -i groq
```

## Performance Monitoring

### Check Container Resource Usage

```bash
docker stats
```

### View Logs

```bash
# Backend logs
docker logs climate360-backend -f

# Frontend logs
docker logs climate360-frontend -f

# Database logs
docker logs climate360-postgres -f
```

### Database Connection

```bash
# Connect to PostgreSQL
docker exec -it climate360-postgres psql -U climate360 -d climate360

# Useful queries:
# \dt                 # List tables
# SELECT version();   # Show PostgreSQL version
# \q                  # Quit
```

## Load Testing

### Simple Load Test (5 concurrent requests)

```bash
# Using Apache Bench
ab -n 5 -c 5 http://localhost:8000/api/health

# Using wrk (if installed)
wrk -t4 -c10 -d10s http://localhost:8000/api/health
```

## Data Persistence

### Database Backup

```bash
# Backup database
docker exec climate360-postgres pg_dump -U climate360 climate360 > backup.sql

# Restore database
docker exec -i climate360-postgres psql -U climate360 climate360 < backup.sql
```

### Volume Backup

```bash
# The database is persisted in postgres_data volume
# On Windows, Docker Desktop manages volumes in:
# %APPDATA%\Docker\volumes\
```

## Production Deployment

### Before Going to Production

1. **Security**
   - [ ] Change default database password
   - [ ] Use environment-specific secrets management
   - [ ] Enable HTTPS/SSL
   - [ ] Setup authentication/authorization
   - [ ] Review API rate limiting

2. **Performance**
   - [ ] Configure database connection pooling
   - [ ] Enable caching (Redis)
   - [ ] Setup CDN for frontend static assets
   - [ ] Configure load balancing

3. **Monitoring**
   - [ ] Setup application monitoring
   - [ ] Configure log aggregation
   - [ ] Setup alerting for failures
   - [ ] Monitor API response times

4. **Data**
   - [ ] Backup strategy
   - [ ] Data retention policy
   - [ ] GDPR/Privacy compliance

### Example Production docker-compose.yml Changes

```yaml
# Use specific versions instead of :latest
image: postgres:15.2-alpine

# Add restart policy
restart: always

# Add production logging
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"

# Add resource limits
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 512M
```

## Cleanup

### Stop All Services

```bash
docker-compose down
```

### Remove Everything (including volumes)

```bash
# WARNING: This deletes all data in the database
docker-compose down -v
```

### Clean Docker System

```bash
# Remove unused images, containers, networks
docker system prune -a
```

## Success Indicators

✅ Application is working correctly if:

- [ ] All three containers running: `docker-compose ps` shows all "Up"
- [ ] Backend responds: `curl http://localhost:8000/api/health` returns 200
- [ ] Frontend loads: http://localhost:3000 shows Climate360 UI
- [ ] Heat risk works: POST to `/climate/risk/heat` returns risk level + explanation
- [ ] Water risk works: POST to `/climate/risk/water` returns stress level + harvesting
- [ ] Rain risk works: POST to `/climate/risk/rain` returns risk level
- [ ] Dashboard works: Frontend form submission loads risk cards
- [ ] Groq integration: Risk explanations contain AI-generated text (not just fallbacks)

## Next Steps

After successful deployment:

1. **Test with Real Data**
   - Fetch actual data from Conduit API
   - Test with various weather scenarios
   - Validate risk calculations

2. **User Testing**
   - Test with different user roles
   - Collect feedback on UI/UX
   - Validate risk recommendations

3. **Scale & Optimize**
   - Monitor performance metrics
   - Optimize database queries
   - Add caching where needed

4. **Add Features** (Phase 2)
   - Voice input/output
   - Multilingual support
   - Historical data analysis
   - "What-If" scenarios
   - Mobile app

## Support & Documentation

- **API Docs**: http://localhost:8000/docs
- **README**: See README.md for architecture overview
- **Code Structure**: See Project Structure in README.md
- **Risk Engines**: See backend/services/risk_engines.py for logic details

---

**Ready to deploy Climate360?** Follow the Quick Start section and verify using the steps above!
