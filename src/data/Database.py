from abc import abstractmethod, ABC


class Database(ABC):
    @abstractmethod
    def getMeasurements(self):
        pass

    @abstractmethod
    def getAllStats(self):
        pass

    @abstractmethod
    def getHpPowerConsuption(self):
        pass

    @abstractmethod
    def getHpHeatingSuply(self):
        pass

    @abstractmethod
    def getMeanOfRegulusFromRange(self):
        pass

    @abstractmethod
    def getHpWaterSuply(self):
        pass

    @abstractmethod
    def getRegulusStatusCount(self):
        pass

    @abstractmethod
    def getOutsideTemp(self):
        pass
