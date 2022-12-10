from abc import abstractmethod

class Database:
    @abstractmethod
    def getMeasurements(self):
        pass