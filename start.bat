@echo off
color 0B
echo.
echo ====================================================
echo   Climate360 - Climate Intelligence Platform
echo ====================================================
echo.

if not exist .env (
    echo WARNING: .env file not found!
    echo Creating .env from template...
    copy .env.example .env
    echo.
    echo Please edit .env and add your API keys:
    echo   - GROQ_API_KEY
    echo   - CONDUIT_API_KEY
    echo   - CONDUIT_EMAIL
    echo.
    echo Then run: docker-compose up --build
    pause
    exit /b 1
)

echo OK: .env file found
echo.
echo Starting Docker containers...
echo.

docker-compose up --build

echo.
echo Climate360 is running!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
pause
