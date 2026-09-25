from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routes import health, climate, conduit

# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Climate360 Backend Starting...")
    yield
    # Shutdown
    print("🛑 Climate360 Backend Shutting Down...")

# Create FastAPI app
app = FastAPI(
    title="Climate360 API",
    description="Climate Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(climate.router, prefix="/api", tags=["climate"])
app.include_router(conduit.router, prefix="/api", tags=["conduit"])

@app.get("/")
async def root():
    return {
        "name": "Climate360",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
