import * as React from 'react'
import { Event } from '../../types'
import EventItem from "./EventItem";
import {Box} from "@mui/material";

type Props = {
    items: Event[]
}

const EventList = ({ items }: Props) => (
    <Box mx={4}>
        {items.slice(1)?.map((item, i) => (
                <EventItem key={i} data={item} />
        ))}
    </Box>
)

export default EventList
