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

    def explore(self):
        return self.client.query("SELECT sum(value) FROM power WHERE device = 'hp' AND target='None' AND time >= 1650281678535ms GROUP BY time(1d) fill(0)")

    def getMeasurements(self):
        return self.client.query("SHOW MEASUREMENTS ON homedata")

    def getHpPowerConsuption(self, bucket):
        queryResult = self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = 'hp' AND target='None' AND time >= 1650281678535ms GROUP BY time(1d) fill(0)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHpWaterSuply(self, bucket):
        queryResult = self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = 'hp' AND target='washwater' AND time >= 1650281622624ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHpHeatingSuply(self, bucket):
        queryResult =  self.client.query(
            f"SELECT sum(value) FROM {bucket} WHERE device = 'hp' AND target='heating' AND time >= 1650281622624ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df


    def getMeanWaterTemp(self, bucket):
        queryResult = self.client.query(
            f"SELECT mean(washwater_temp) FROM {bucket} WHERE time >= 1650281691720ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getTempOut(self, bucket):
        queryResult = self.client.query(
            f"SELECT mean(temp_out) FROM {bucket} WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getTempIn(self, bucket):
        queryResult =  self.client.query(
            f"SELECT mean(temp_in) FROM {bucket} WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getRPS(self, bucket):
        queryResult = self.client.query(
            f"SELECT mean(rps) FROM {bucket} WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getOutsideTemp(self, bucket):
        queryResult = self.client.query(
            f"SELECT mean(temperature) FROM {bucket} WHERE time >= 1650281888485ms GROUP BY time(1d) fill(none)")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHeatingCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='topi' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getPreparingCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='pripravuje TV' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getCheckCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='kontrola prutoku' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getDefrostCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='odmrazuje' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getHpDamageCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='porucha PWM cepadla' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getReadyCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='pripraven topit' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getRestartCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='restartuje' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df

    def getMinRunTimeCount(self, bucket):
        queryResult = self.client.query(
            f"SELECT count(status) FROM {bucket} WHERE status='min.doba chodu' and time >= 1650281820284ms GROUP BY status;")
        df = queryResult[bucket]
        df.reset_index(inplace=True)
        df = df.rename(columns={'index': 'time'})
        return df
