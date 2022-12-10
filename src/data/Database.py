from abc import abstractmethod, ABC


class Database(ABC):
    @abstractmethod
    def getMeasurements(self):
        pass

    @abstractmethod
    def getHpPowerConsuption(self):
        pass

    @abstractmethod
    def getHpHeatingSuply(self):
        pass

    @abstractmethod
    def getHpWaterSuply(self):
        pass

    @abstractmethod
    def getWaterTemp(self):
        pass

    @abstractmethod
    def getTempIn(self):
        pass

    @abstractmethod
    def getTempOut(self):
        pass

    @abstractmethod
    def getRPS(self):
        pass

    @abstractmethod
    def getOutsideTemp(self):
        pass

    @abstractmethod
    def getHeatingCount(self):
        pass

    @abstractmethod
    def getPreparingCount(self):
        pass

    @abstractmethod
    def getCheckCount(self):
        pass

    @abstractmethod
    def getDefrostCount(self):
        pass

    @abstractmethod
    def getHpDamageCount(self):
        pass

    @abstractmethod
    def getReadyCount(self):
        pass

    @abstractmethod
    def getRestartCount(self):
        pass

    @abstractmethod
    def getMinRunTimeCount(self):
        pass