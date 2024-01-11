import {useCallback, useEffect, useState} from "react";
import {Box, useTheme} from "@mui/material";
import {useGlobalContext} from "../context/GlobalContext";

const Room = () => {
    const { isRoomFree, color } = useGlobalContext()
    const theme = useTheme()

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
        <Box p={1} height="85vh" display="flex" flexDirection="column">
            <Box p={2} style={{ backgroundColor: color, height: "25%" }} display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <h1>{isRoomFree ? "Free" : "Busy"}</h1>
                <h1>{isRoomFree ? `Will be free for ${currentTime}` : `Will be free in ${currentTime}` }</h1>
            </Box>
            <Box display="flex" flexDirection="row">
            <Box mr={4} display="flex" width="75%" flexDirection="column">
                <Box p={1}>
                    <h1>Room name</h1>
                </Box>
                <Box p={1} display="flex" flexDirection="column" gap={1}>
                    <h2>Event name</h2>
                    <Box pl={10} display="flex" flexDirection="row" justifyContent="space-between">
                        <h2>From – to</h2>
                        <h2>Organiser</h2>
                    </Box>
                </Box>
            </Box>
            <Box ml={4} display="flex" width="25%" flexDirection="column">
                <h2>Items</h2>
            </Box>
            </Box>
        </Box>)
}

export default Room
