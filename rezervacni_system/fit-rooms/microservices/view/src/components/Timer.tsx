import React, {useCallback, useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {useGlobalContext} from "../context/GlobalContext";
import { Event } from '../types'
import {formatDate} from "../utils/time-helper";


const Timer: React.FC<{ event?: Event }> = ({ event })=> {
    const { isRoomFree } = useGlobalContext()
    const [currentTime, setCurrentTime] = useState<string>("")
    if(!event){
        return null
    }
    const updateClock = useCallback(() => {
        if(isRoomFree){
            const nextEventTime = new Date(event.from).getTime()
            const now = new Date().getTime()
            setCurrentTime(formatDate(new Date(nextEventTime - now), true));
        }else {
            const nextEventTime = new Date(event.to).getTime()
            const now = new Date().getTime()
            setCurrentTime(formatDate(new Date(nextEventTime - now), true));
        }
    }, []);

    useEffect(() => {
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return <Typography variant="h5">{isRoomFree ? `Will be free for ${currentTime}` : `Will be free in ${currentTime}` }</Typography>
}

export default Timer
