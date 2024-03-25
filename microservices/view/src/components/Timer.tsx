import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useGlobalContext } from "../context/GlobalContext";
import { Event } from "../types";
import { formatDate, getCurrentDate } from "../utils/time-helper";

const Timer: React.FC<{ event?: any }> = ({ event }) => {
  const { isRoomFree } = useGlobalContext();
  const [currentTime, setCurrentTime] = useState<string>("");
  if (!event) {
    return null;
  }

  const updateClock = useCallback(() => {
    const now = getCurrentDate().getTime();
    if (isRoomFree) {
      const nextEventTime = new Date(event.start.dateTime).getTime();
      setCurrentTime(formatDate(new Date(nextEventTime - 3600000 - now), true));
    } else {
      const currentEventEndTime = new Date(event.end.dateTime).getTime();
      const dateDifference = new Date(0);
      dateDifference.setMilliseconds(currentEventEndTime - 3600000 - now);
      setCurrentTime(formatDate(new Date(dateDifference), true));
    }
  }, [isRoomFree]);

  useEffect(() => {
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography variant="h5">
      {isRoomFree
        ? `Free for ${currentTime}`
        : `Will be free in ${currentTime}`}
    </Typography>
  );
};

export default Timer;
