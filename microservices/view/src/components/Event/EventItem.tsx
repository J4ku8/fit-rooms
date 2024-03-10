import React from 'react'

import {Event} from '../../types'
import {Box, Typography, useTheme} from "@mui/material";
import {formatDate} from "../../utils/time-helper";

type Props = {
    data: Event,
}

const EventItem = ({ data }: Props) => {
    const theme = useTheme()
    return (
        <Box my={1.5} px={0.5} textAlign="left" display="flex" flexDirection="column" style={{ borderLeft: `4px solid ${theme.palette.primary.main}`, borderRadius: "3px 0 0 3px"}}>
            <Typography variant="subtitle1" fontWeight="500" fontSize="16px">{data.subject}</Typography>
            <Box display="flex" flexDirection="row">
                <Typography
                    variant="subtitle1" fontWeight="200">{`${formatDate(new Date(data.start.dateTime), false)} – ${formatDate(new Date(data.end.dateTime), false)}`}</Typography>
            </Box>
        </Box>
    );
}

export default EventItem
