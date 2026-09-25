from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    # Groq
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
    
    # Conduit API
    conduit_api_key: str = os.getenv("CONDUIT_API_KEY", "")
    conduit_email: str = os.getenv("CONDUIT_EMAIL", "")
    conduit_api_url: str = os.getenv("CONDUIT_API_URL", "https://conduit.jhubafrica.com/data.php")
    
    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://neondb_owner:npg_1HnGZS5VTkCd@ep-dawn-frog-b4g99sii-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require")
    
    # Backend
    backend_host: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    backend_port: int = int(os.getenv("BACKEND_PORT", "8000"))
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    # Frontend
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
