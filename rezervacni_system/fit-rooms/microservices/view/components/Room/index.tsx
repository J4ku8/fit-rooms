import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Divider, Typography, useTheme} from "@mui/material";
import {useGlobalContext} from "../../context/GlobalContext";
import QRCode from "react-qr-code";
import {useGetEvents} from "../../queries/useGetEvents";
import {sampleEventsData} from "../../utils/sample-data";
import {isRunningEvent} from "../../utils/time-helper";
import Timer from "../Timer";
import EventList from "../Event/EventList";

const Room = ({ id }: { id: string }) => {
    const { color, setRoomStatus, isRoomFree } = useGlobalContext()
    const theme = useTheme()
    // const roomEvents = useGetEvents(id)
    const roomEvents = sampleEventsData

    const currentEvent = roomEvents.find(event => isRunningEvent(new Date(event.from), new Date(event.to)))

    useEffect(() => {
        setRoomStatus(!currentEvent)
    }, [currentEvent]);

    return (
        <Box height="90vh" display="flex" flexDirection="column">
            <Box p={2} style={{ backgroundColor: color, height: "25%", borderRadius: "10px 10px 0 0" }} display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <Typography variant="h1" fontWeight="bold" >{isRoomFree ? "Free" : "Busy"}</Typography>
                {roomEvents.length ? <Timer event={isRoomFree ? roomEvents[0] : currentEvent || undefined}/> : null}
            </Box>
            <Box display="flex" flexDirection="row" height="80%">
                <Box mr={4} p={2} display="flex" width="75%" flexDirection="column">
                    <Box>
                        <Typography variant="h3">{id}</Typography>
                    </Box>
                    <Box py={4} display="flex" flexDirection="column">
                        <Box pb={1} display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h4">{currentEvent?.name}</Typography>
                            <Typography variant="h4">{!isRoomFree ? `${new Date(currentEvent?.from || "")} - ${new Date(currentEvent?.to || "")}`: ""}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h6">{currentEvent?.organiser}</Typography>
                            <Box display="flex" flexDirection="column" gap={0.5}>
                                <Typography variant="subtitle1">Room timetable</Typography>
                                <QRCode value={`https://timetable.fit.cvut.cz/new/rooms/${id}`}  size={128}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box alignSelf="center" height="100%" display="flex" width="25%" flexDirection="column" >
                    <EventList items={roomEvents} />
                </Box>
            </Box>
        </Box>)
}

export default Room
