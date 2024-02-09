import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Divider, Typography, useTheme} from "@mui/material";
import {useGlobalContext} from "../../context/GlobalContext";
import QRCode from "react-qr-code";
import {useGetEvents} from "../../queries/useGetEvents";
import {sampleEventsData} from "../../utils/sample-data";
import {formatDate, isRunningEvent} from "../../utils/time-helper";
import Timer from "../Timer";
import EventList from "../Event/EventList";

const style = {height: "25%", borderRadius: "10px 10px 0 0"}
const Room = ({ roomEmail, name }: { roomEmail: string, name: string }) => {
    const { color, setRoomStatus, isRoomFree } = useGlobalContext()
    const theme = useTheme()
    const { data } = useGetEvents({roomEmail})
    console.log(data)
    const roomEvents = sampleEventsData
    const styles = { backgroundColor: color,...{ style } }
    const currentEvent = roomEvents.find(event => isRunningEvent(new Date(event.from), new Date(event.to)))

    useEffect(() => {
        setRoomStatus(!currentEvent)
    }, [currentEvent]);

    return (
        <Box height="90vh" display="flex" flexDirection="column">
            <Box p={2} style={styles} display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <Typography variant="h1" fontWeight="bold" >{isRoomFree ? "Free" : "Busy"}</Typography>
                {roomEvents.length ? <Timer event={isRoomFree ? roomEvents[0] : currentEvent || undefined}/> : null}
            </Box>
            <Box display="flex" flexDirection="row" height="80%">
                <Box mr={4} p={2} display="flex" width="75%" flexDirection="row" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h3">{name}</Typography>
                        <Box display="flex" flexDirection="column" gap={0.5} px={3}>
                            <Typography variant="subtitle1">Room timetable</Typography>
                            <QRCode value={`https://timetable.fit.cvut.cz/new/rooms/${name}`}  size={192}/>
                        </Box>
                    </Box>
                    <Box py={1} display="flex" flexDirection="column" gap={4}>
                        <Box pb={1} display="flex" flexDirection="column" gap={2}>
                            <Typography variant="h4">{currentEvent?.name}</Typography>
                            <Typography variant="h4">{!isRoomFree ? `${formatDate(new Date(currentEvent?.from || ""), true)} - ${formatDate(new Date(currentEvent?.to || ""),true)}`: ""}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h6">{currentEvent?.organiser}</Typography>

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
