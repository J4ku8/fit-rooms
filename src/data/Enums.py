from enum import Enum


class Buckets(Enum):
    REGULUS_STATS = "regulus_stats"
    REGULUS = "regulus"
    SOLAR = "solar"
    POWER = "power"
    WEATHER = "weather"

class PowerDevices(Enum):
    HEAT_PUMP = "hp"
    EWB = "ewb"

class RegulusStatuses(Enum):
    HEAT = "topi"
    PREPARING = "pripravuje TV"
    FLOAT_CHECK = "kontrola prutoku"
    DEFROST = "odmrazuje"
    PUMP_DAMAGE = "porucha PWM cepadla"
    READY = "pripraven topit"
    RESTART= "restartuje"
    MIN_RUNTIME = "min.doba chodu"

class RegulusAttributes(Enum):
    RPS = "rps"
    WASH_WATER_TEMP = "washwater_temp"
    TEMP_IN = "temp_in"
    TEMP_OUT = "temp_out"

