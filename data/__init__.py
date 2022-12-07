import os

from dotenv import load_dotenv

from data.Client import Client
from data.Database import Database

load_dotenv(".env")
DATABASE = os.getenv("DATABASE")
PASS = os.getenv("PASSWORD")
USER = os.getenv("USERNAME")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")


def get_content_provider() -> Database:
    return Client(host=HOST, port=PORT, user=USER, password=PASS, database=DATABASE)
