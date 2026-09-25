#!/bin/bash

echo "🌍 Climate360 - Climate Intelligence Platform"
echo "=============================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "📝 Please edit .env and add your API keys:"
    echo "   - GROQ_API_KEY"
    echo "   - CONDUIT_API_KEY"
    echo "   - CONDUIT_EMAIL"
    echo ""
    echo "Then run: docker-compose up --build"
    exit 1
fi

echo "✅ .env file found"
echo ""
echo "🐳 Starting Docker containers..."
echo ""

docker-compose up --build

echo ""
echo "✨ Climate360 is running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
