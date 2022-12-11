from influxdb import DataFrameClient
from data.Database import Database

from data.Enums import RegulusStatuses, RegulusAttributes, PowerDevices, Buckets

DEFAULT_START_DATE = "1634470536296ms"


class Client(Database):
    def __init__(self, database, user, port, host, password):
        self.database = database
        self.user = user
        self.port = port
        self.host = host
        self.password = password
        self.client = DataFrameClient(host=host, port=port, username=user, password=password, database=database)

    def explore(self):
        return self.client.query("SELECT sum(value) FROM power GROUP BY device")

    def getAllStats(self, bucket):
        queryResult = self.client.query(
            f"SELECT * FROM  {bucket}")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getMeasurements(self):
        return self.client.query("SHOW MEASUREMENTS ON homedata")

    def getHpPowerConsuption(self, device: str = "hp", time_from: str = DEFAULT_START_DATE):
        if not isinstance(device, PowerDevices):
            raise TypeError('Device must be an instance of PowerDevices Enum')
        bucket = Buckets.POWER
        queryResult = self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = {device} AND target='None' AND time >= {time_from} GROUP BY time(1d) fill(0)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHpWaterSuply(self, device: str = "hp", time_from: str = DEFAULT_START_DATE):
        if not isinstance(device, PowerDevices):
            raise TypeError('Device must be an instance of PowerDevices Enum')
        bucket = Buckets.POWER
        queryResult = self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = {device} AND target='washwater' AND time >= {time_from} GROUP BY time(1d) fill(0)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHpHeatingSuply(self, device: str = "hp", time_from: str = DEFAULT_START_DATE):
        if not isinstance(device, PowerDevices):
            raise TypeError('Device must be an instance of PowerDevices Enum')
        bucket = Buckets.POWER
        queryResult = self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = {device} AND target='heating' AND time >= {time_from} GROUP BY time(1d) fill(0)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getMeanOfRegulusFromRange(self, attribute: str, time_from=DEFAULT_START_DATE, time_to="1666092936296ms"):
        if not isinstance(attribute, RegulusAttributes):
            raise TypeError('Attribute must be an instance of RegulusAttributes Enum')
        bucket = Buckets.REGULUS
        queryResult = self.client.query(
            f"SELECT mean({attribute}) FROM {bucket} WHERE time >= {time_from} and time <= {time_to} GROUP BY time(1d) fill(0)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getOutsideTemp(self, time_from: str = DEFAULT_START_DATE):
        queryResult = self.client.query(
            f"SELECT mean(temperature) FROM weather WHERE time >= {time_from} GROUP BY time(1d) fill(none)")
        df = queryResult["weather"]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getRegulusStatusCount(self, status="topi", time_from: str = DEFAULT_START_DATE):
        if not isinstance(status, RegulusStatuses):
            raise TypeError('Status must be an instance of RegulusStatuses Enum')
        bucket = Buckets.REGULUS
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status={status} and time >= {time_from} GROUP BY status")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df
