import os

from dotenv import load_dotenv
from influxdb import DataFrameClient

from data.Database import Database


class Client(Database):
    def __init__(self, database, user, port, host, password):
        self.database = database
        self.user = user
        self.port = port
        self.host = host
        self.password = password
        self.client = DataFrameClient(host=host, port=port, username=user, password=password, database=database)

    def getMeasurements(self):
        return self.client.query("SHOW MEASUREMENTS ON homedata")
