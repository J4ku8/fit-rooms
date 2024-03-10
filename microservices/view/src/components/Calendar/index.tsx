import {DisplayRoom, Event} from "../../types";

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useGetCalendar} from "../../queries/useGetCalendar";
import {useEffect, useMemo, useState} from "react";
import moment from "moment-timezone";
import EventList from "../Event/EventList";
import {Box, Typography} from "@mui/material";
import {useGetEvents} from "../../queries/useGetEvents";


const Calendar = ({roomEmail, name}: DisplayRoom) => {
    const [selectedDay, setSelectedDay] = useState(moment(new Date()))
    const { data: dayEvents, isLoading, refetch } = useGetEvents({roomEmail, date: selectedDay.toISOString()})
    useEffect(() => {
        refetch()
    }, [selectedDay])

    return (
        <Box textAlign="center" display="flex" flexDirection="column" gap={1}>
        <Typography variant="h3">{name}</Typography>
        <DateCalendar
            value={selectedDay}
            onChange={(newValue) => setSelectedDay(newValue)}
        />
        <EventList items={dayEvents} isMobile/>
    </Box>)
}

export default Calendar
