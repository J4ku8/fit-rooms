import {useCallback, useEffect, useState} from "react";
import {Box, Typography, useTheme} from "@mui/material";
import {useGlobalContext} from "../context/GlobalContext";
import QRCode from "react-qr-code";
import {useGetEvents} from "../queries/useGetEvents";

const Room = ({ id }: { id: string }) => {
    const { isRoomFree, color } = useGlobalContext()
    const theme = useTheme()
    const roomEvents = useGetEvents(id)
    console.log(roomEvents.data)
    const [currentTime, setCurrentTime] = useState<string>("")

    const updateClock = useCallback(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, []);

    useEffect(() => {
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <Box height="90vh" display="flex" flexDirection="column">
            <Box p={2} style={{ backgroundColor: color, height: "25%", borderRadius: "10px 10px 0 0" }} display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <Typography variant="h1" fontWeight="bold" >{isRoomFree ? "Free" : "Busy"}</Typography>
                <Typography variant="h5">{isRoomFree ? `Will be free for ${currentTime}` : `Will be free in ${currentTime}` }</Typography>
            </Box>
            <Box display="flex" flexDirection="row" height="80%">
                <Box mr={4} p={2} display="flex" width="70%" flexDirection="column">
                    <Box>
                        <Typography variant="h3">Room name</Typography>
                    </Box>
                    <Box py={4} display="flex" flexDirection="column">
                        <Box pb={1} display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h4">Event name</Typography>
                            <Typography variant="h4">From – to</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h6">Organiser</Typography>
                            <Box display="flex" flexDirection="column" gap={0.5}>
                                <Typography variant="subtitle1">Room timetable</Typography>
                                <QRCode value="https://timetable.fit.cvut.cz/new/rooms/TH:A-949?date=2024-01-12"  size={128}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box ml={4} alignSelf="center" height="100%" display="flex" width="30%" flexDirection="column" style={{ backgroundColor: theme.palette.grey.A200 }}>
                    <Typography p={2} variant="h5">Upcoming events</Typography>
                </Box>
            </Box>
        </Box>)
}

export default Room
