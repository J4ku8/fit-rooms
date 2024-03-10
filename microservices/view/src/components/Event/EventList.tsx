import * as React from 'react'
import { Event } from '../../types'
import EventItem from "./EventItem";
import {Box, Divider, Typography} from "@mui/material";

type Props = {
    items: Event[],
    isMobile?: boolean
}

const EventList = ({ items, isMobile }: Props) => (
    <Box mx={4} height="100%">
        <Box textAlign="center" height="100%">
            {!isMobile && items?.length > 4 && <Typography variant="caption">
                More events
            </Typography>}
            {!items?.length ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <Typography>
                    {isMobile ? "No events" : "No more events for today"}
                </Typography>
            </Box>
            ) : (
                <Box>
                    <Typography py={2} variant="h5">
                        {isMobile ? "Events" : "Upcoming events"}
                    </Typography>
                    {items?.map((item, i) => (
                        <EventItem key={i} data={item}/>
                    ))}
                </Box>
                    )}
        </Box>
    </Box>
)

export default EventList
