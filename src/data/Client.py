import PluginBase as PluginBase
from influxdb import DataFrameClient
from abc_base import PluginBase

from data.Database import Database

@PluginBase.register
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

    def getHpPowerConsuption(self):
        return self.client.query(
            "SELECT sum(value) FROM power WHERE device = 'hp' and target='None' AND time >= 1650281678535ms GROUP BY time(1d) fill(null)")

    def getHpWaterSuply(self):
        return self.client.query(
            "SELECT sum(value) FROM power WHERE device = 'hp' and target='washwater' AND time >= 1650281622624ms GROUP BY time(1d) fill(null)")

    def getHpHeatingSuply(self):
        return self.client.query(
            "SELECT sum(value) FROM power WHERE device = 'hp' and target='heating' AND time >= 1650281622624ms GROUP BY time(1d) fill(null)")


    def getMeanWaterTemp(self):
        return self.client.query(
            "SELECT mean(washwater_temp) FROM regulus WHERE time >= 1650281691720ms GROUP BY time(1d) fill(null)")

    def getTempOut(self):
        return self.client.query(
            "SELECT mean(temp_out) FROM regulus WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")

    def getTempIn(self):
        return self.client.query(
            "SELECT mean(temp_in) FROM regulus WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")

    def getRPS(self):
        return self.client.query(
            "SELECT mean(rps) FROM regulus WHERE time >= 1634470536296ms and time <= 1666092936296ms GROUP BY time(1d) fill(null)")

    def getOutsideTemp(self):
        return self.client.query(
            "SELECT mean(temperature) FROM weather WHERE time >= 1650281888485ms GROUP BY time(1d) fill(none)")

    def getHeatingCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='topi' and time >= 1650281820284ms GROUP BY status;")

    def getPreparingCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='pripravuje TV' and time >= 1650281820284ms GROUP BY status;")

    def getCheckCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='kontrola prutoku' and time >= 1650281820284ms GROUP BY status;")

    def getDefrostCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='odmrazuje' and time >= 1650281820284ms GROUP BY status;")

    def getHpDamageCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='porucha PWM cepadla' and time >= 1650281820284ms GROUP BY status;")

    def getReadyCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='pripraven topit' and time >= 1650281820284ms GROUP BY status;")

    def getRestartCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='restartuje' and time >= 1650281820284ms GROUP BY status;")

    def getMinRunTimeCount(self):
        return self.client.query(
            "SELECT count(status) FROM regulus WHERE status='min.doba chodu' and time >= 1650281820284ms GROUP BY status;")
