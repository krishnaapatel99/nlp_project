import os
from pathlib import Path
from dotenv import load_dotenv

# Path to backend directory and .env file
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

# Load environment variables from .env file if present
load_dotenv(dotenv_path=ENV_PATH)

# Application settings
APP_TITLE = os.getenv("APP_TITLE", "NLP Text Summarizer API")
APP_ENV = os.getenv("APP_ENV", "development")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# CORS settings: parse comma-separated origins
raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
)
ALLOWED_ORIGINS = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
