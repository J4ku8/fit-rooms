import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";
import QRCode from "react-qr-code";
import { useGetEvents } from "../../queries/useGetEvents";
import {
  formatDate,
  getCurrentDate,
  isRunningEvent,
} from "../../utils/time-helper";
import Timer from "../Timer";
import EventList from "../Event/EventList";
import { DisplayRoom } from "../../types";

const style = { height: "25%", borderRadius: "10px 10px 0 0" };
const Room = ({ roomEmail, name }: DisplayRoom) => {
  const { color, setRoomStatus, isRoomFree } = useGlobalContext();
  const { data } = useGetEvents({ roomEmail });
  const roomCalendarUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/calendar/${name}`;
  const currentEvents = data?.filter(
    (event: any) =>
      event.isAllDay ||
      isRunningEvent(
        new Date(event.start.dateTime),
        new Date(event.end.dateTime),
      ),
  );
  const currentEvent = currentEvents?.length ? currentEvents[0] : null

  const currentEventMultipleLocations =
    !!currentEvent &&
    !currentEvents?.length &&
    currentEvent.locations?.length > 1
      ? currentEvent?.locations
      : null;
  const upcomingEvents = data?.filter((event: any) => {
    if (currentEvent && event.id === currentEvent.id) {
      return null;
    }
    const now = getCurrentDate();
    const endDate = new Date(event.end.dateTime);
    if (now > endDate) {
      return null;
    }
    return event;
  });
  useEffect(() => {
    if(isRoomFree === !!currentEvent){
      setRoomStatus(!currentEvent);
    }
  }, [currentEvent, upcomingEvents]);
  const numberOfRunningEvents = currentEvents?.length;
  const styles = { backgroundColor: color, ...{ style } };

  const showTimer = !!currentEvent || (isRoomFree && !!upcomingEvents?.length);

  return (
    <Box height="90vh" display="flex" flexDirection="column">
      <Box
        p={2}
        style={styles}
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h1" fontWeight="bold">
          {isRoomFree ? "Free" : "Busy"}
        </Typography>
        {showTimer ? (
          <Timer
            event={isRoomFree && upcomingEvents?.length ? upcomingEvents[0] : currentEvent}
            hasNextEvents={!!upcomingEvents?.length}
          />
        ) : null}
      </Box>
      <Box display="flex" flexDirection="row" height="80%">
        <Box
          p={2}
          display="flex"
          width="66%"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" gap={2} >
            <Typography variant="h3">{name}</Typography>
            <Box display="flex" flexDirection="column" gap={0}>
              <Typography variant="subtitle1">{"Calendar:"}</Typography>
              <QRCode value={roomCalendarUrl} size={192} />
            </Box>
          </Box>
          <Box
            py={1}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1.5}
            width="55%"
          >
            {numberOfRunningEvents ? (
              <Typography variant="h5" sx={{ textAlign: "center" }}>{`Running event${numberOfRunningEvents > 1 ? "s" : ""}`}</Typography>
            ) : null}
            <Box
              display="flex"
              flexDirection="column"
              gap={0.5}
              alignItems="center"
            >
              {numberOfRunningEvents ? (
                currentEvents.map((event: any) => (
                  <Box display="flex" flexDirection="column">
                    <Typography variant="h6" fontWeight="600">
                      {event?.subject}
                    </Typography>
                    <Typography variant="subtitle1">{`${formatDate(new Date(event?.start.dateTime || ""), true)} - ${formatDate(new Date(event?.end.dateTime || ""), true)}`}</Typography>
                  </Box>
                ))
              ) : (
                <Box display="flex" flexDirection="column">
                  {currentEvent ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {currentEvent?.subject}
                      </Typography>
                      <Typography variant="subtitle1">
                        {`${formatDate(new Date(currentEvent?.start.dateTime || ""), true)} - ${formatDate(new Date(currentEvent?.end.dateTime || ""), true)}`}
                      </Typography>
                    </>
                  ) : null}
                  <br />
                  {currentEventMultipleLocations ? (
                    <Typography variant="subtitle1">
                      Event is in multiple room(s)
                    </Typography>
                  ) : null}
                  {currentEventMultipleLocations?.map((location: any) => (
                    <Typography variant="subtitle1">
                      {location.displayName}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          alignSelf="center"
          height="100%"
          display="flex"
          width="33%"
          flexDirection="column"
        >
          <EventList items={upcomingEvents} />
        </Box>
      </Box>
    </Box>
  );
};

export default Room;
