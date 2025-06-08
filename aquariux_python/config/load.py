from dotenv import load_dotenv
import os

load_dotenv()  # Load from .env

AQUARIUX_URL = os.getenv("AQUARIUX_URL")
AQUARIUX_LOGIN = os.getenv("AQUARIUX_LOGIN")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")