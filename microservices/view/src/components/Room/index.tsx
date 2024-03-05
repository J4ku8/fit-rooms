import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Divider, Typography, useTheme} from "@mui/material";
import {useGlobalContext} from "../../context/GlobalContext";
import QRCode from "react-qr-code";
import {useGetEvents} from "../../queries/useGetEvents";
import {formatDate, getCurrentDate, isRunningEvent} from "../../utils/time-helper";
import Timer from "../Timer";
import EventList from "../Event/EventList";
import {useGetCalendar} from "../../queries/useGetCalendar";

const style = {height: "25%", borderRadius: "10px 10px 0 0"}
const Room = ({ roomEmail, name }: { roomEmail: string, name: string }) => {
    const { color, setRoomStatus, isRoomFree } = useGlobalContext()
    const theme = useTheme()
    const { data } = useGetEvents({roomEmail})
    // const celendar = useGetCalendar({roomEmail})
    console.log(data)
    const styles = { backgroundColor: color,...{ style } }
    // const currentEvents = data?.filter((event: any) => event.isAllDay || isRunningEvent(new Date(event.start.dateTime), new Date(event.end.dateTime)))
    const currentEvents = [
        {
            "@odata.etag": "W/\"A3aUUvi0ikGD6+Be+G6BIgAAAHskRQ==\"",
            "id": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D-L3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6_Be_G6BIgAAAAABDQAAA3aUUvi0ikGD6_Be_G6BIgAAAHtjvwAAEA==",
            "createdDateTime": "2024-03-03T22:45:39.7313782Z",
            "lastModifiedDateTime": "2024-03-03T22:45:39.7815151Z",
            "changeKey": "A3aUUvi0ikGD6+Be+G6BIgAAAHskRQ==",
            "categories": [],
            "transactionId": null,
            "originalStartTimeZone": "Central Europe Standard Time",
            "originalEndTimeZone": "UTC",
            "iCalUId": "040000008200E00074C5B7101A82E00807E8030979B10884BC6DDA010000000000000000100000006E4027F21C5592458E37C350F6A446DF",
            "reminderMinutesBeforeStart": 15,
            "isReminderOn": true,
            "hasAttachments": false,
            "subject": "Seminář znalostního inženýrství I",
            "bodyPreview": "Seminář znalostního inženýrství I",
            "importance": "normal",
            "sensitivity": "normal",
            "isAllDay": false,
            "isCancelled": false,
            "isOrganizer": true,
            "responseRequested": true,
            "seriesMasterId": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O-AAA=",
            "showAs": "busy",
            "type": "occurrence",
            "webLink": "https://outlook.office365.com/owa/?itemid=AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D%2FL3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAAABDQAAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAHtjvwAAEA%3D%3D&exvsurl=1&path=/calendar/item",
            "onlineMeetingUrl": null,
            "isOnlineMeeting": false,
            "onlineMeetingProvider": "unknown",
            "allowNewTimeProposals": true,
            "occurrenceId": "OID.AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O-AAA=.2024-03-09",
            "isDraft": false,
            "hideAttendees": false,
            "responseStatus": {
                "response": "organizer",
                "time": "0001-01-01T00:00:00Z"
            },
            "body": {
                "contentType": "html",
                "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\nSeminář znalostního inženýrství I\r\n</body>\r\n</html>\r\n"
            },
            "start": {
                "dateTime": "2024-03-09T09:15:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "end": {
                "dateTime": "2024-03-09T10:45:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "location": {
                "displayName": "TH:A-1455",
                "locationType": "default",
                "uniqueId": "TH:A-1455",
                "uniqueIdType": "private"
            },
            "locations": [
                {
                    "displayName": "TH:A-1455",
                    "locationType": "default",
                    "uniqueId": "TH:A-1455",
                    "uniqueIdType": "private"
                }
            ],
            "recurrence": null,
            "attendees": [
                {
                    "type": "required",
                    "status": {
                        "response": "none",
                        "time": "0001-01-01T00:00:00Z"
                    },
                    "emailAddress": {
                        "name": "TH:A-1455",
                        "address": "tha1455@x2h3h.onmicrosoft.com"
                    }
                }
            ],
            "organizer": {
                "emailAddress": {
                    "name": "TH:A-1455",
                    "address": "tha1455@x2h3h.onmicrosoft.com"
                }
            },
            "onlineMeeting": null
        },
        {
            "@odata.etag": "W/\"A3aUUvi0ikGD6+Be+G6BIgAAAHskQA==\"",
            "id": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D-L3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6_Be_G6BIgAAAAABDQAAA3aUUvi0ikGD6_Be_G6BIgAAAHtjvgAAEA==",
            "createdDateTime": "2024-03-03T22:45:37.7241993Z",
            "lastModifiedDateTime": "2024-03-03T22:45:37.7854464Z",
            "changeKey": "A3aUUvi0ikGD6+Be+G6BIgAAAHskQA==",
            "categories": [],
            "transactionId": null,
            "originalStartTimeZone": "Central Europe Standard Time",
            "originalEndTimeZone": "UTC",
            "iCalUId": "040000008200E00074C5B7101A82E00807E80309F51DD582BC6DDA01000000000000000010000000A99C8DBE1415E542A50971241F687071",
            "reminderMinutesBeforeStart": 15,
            "isReminderOn": true,
            "hasAttachments": false,
            "subject": "Seminář znalostního inženýrství magisterský II",
            "bodyPreview": "Seminář znalostního inženýrství magisterský II",
            "importance": "normal",
            "sensitivity": "normal",
            "isAllDay": false,
            "isCancelled": false,
            "isOrganizer": true,
            "responseRequested": true,
            "seriesMasterId": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O_AAA=",
            "showAs": "busy",
            "type": "occurrence",
            "webLink": "https://outlook.office365.com/owa/?itemid=AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D%2FL3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAAABDQAAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAHtjvgAAEA%3D%3D&exvsurl=1&path=/calendar/item",
            "onlineMeetingUrl": null,
            "isOnlineMeeting": false,
            "onlineMeetingProvider": "unknown",
            "allowNewTimeProposals": true,
            "occurrenceId": "OID.AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O_AAA=.2024-03-09",
            "isDraft": false,
            "hideAttendees": false,
            "responseStatus": {
                "response": "organizer",
                "time": "0001-01-01T00:00:00Z"
            },
            "body": {
                "contentType": "html",
                "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\nSeminář znalostního inženýrství magisterský II\r\n</body>\r\n</html>\r\n"
            },
            "start": {
                "dateTime": "2024-03-09T09:15:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "end": {
                "dateTime": "2024-03-09T10:45:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "location": {
                "displayName": "TH:A-1455",
                "locationType": "default",
                "uniqueId": "TH:A-1455",
                "uniqueIdType": "private"
            },
            "locations": [
                {
                    "displayName": "TH:A-1455",
                    "locationType": "default",
                    "uniqueId": "TH:A-1455",
                    "uniqueIdType": "private"
                }
            ],
            "recurrence": null,
            "attendees": [
                {
                    "type": "required",
                    "status": {
                        "response": "none",
                        "time": "0001-01-01T00:00:00Z"
                    },
                    "emailAddress": {
                        "name": "TH:A-1455",
                        "address": "tha1455@x2h3h.onmicrosoft.com"
                    }
                }
            ],
            "organizer": {
                "emailAddress": {
                    "name": "TH:A-1455",
                    "address": "tha1455@x2h3h.onmicrosoft.com"
                }
            },
            "onlineMeeting": null
        },
        {
            "@odata.etag": "W/\"A3aUUvi0ikGD6+Be+G6BIgAAAHskMg==\"",
            "id": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D-L3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6_Be_G6BIgAAAAABDQAAA3aUUvi0ikGD6_Be_G6BIgAAAHtjvQAAEA==",
            "createdDateTime": "2024-03-03T22:45:30.650098Z",
            "lastModifiedDateTime": "2024-03-03T22:45:30.713Z",
            "changeKey": "A3aUUvi0ikGD6+Be+G6BIgAAAHskMg==",
            "categories": [],
            "transactionId": null,
            "originalStartTimeZone": "Central Europe Standard Time",
            "originalEndTimeZone": "UTC",
            "iCalUId": "040000008200E00074C5B7101A82E00807E8030950709F7EBC6DDA010000000000000000100000009E096B245E020944BD4EBA928A866682",
            "reminderMinutesBeforeStart": 15,
            "isReminderOn": true,
            "hasAttachments": false,
            "subject": "Seminář znalostního inženýrství II",
            "bodyPreview": "Seminář znalostního inženýrství II",
            "importance": "normal",
            "sensitivity": "normal",
            "isAllDay": false,
            "isCancelled": false,
            "isOrganizer": true,
            "responseRequested": true,
            "seriesMasterId": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O9AAA=",
            "showAs": "busy",
            "type": "occurrence",
            "webLink": "https://outlook.office365.com/owa/?itemid=AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D%2FL3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAAABDQAAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAHtjvQAAEA%3D%3D&exvsurl=1&path=/calendar/item",
            "onlineMeetingUrl": null,
            "isOnlineMeeting": false,
            "onlineMeetingProvider": "unknown",
            "allowNewTimeProposals": true,
            "occurrenceId": "OID.AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O9AAA=.2024-03-09",
            "isDraft": false,
            "hideAttendees": false,
            "responseStatus": {
                "response": "organizer",
                "time": "0001-01-01T00:00:00Z"
            },
            "body": {
                "contentType": "html",
                "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\nSeminář znalostního inženýrství II\r\n</body>\r\n</html>\r\n"
            },
            "start": {
                "dateTime": "2024-03-09T09:15:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "end": {
                "dateTime": "2024-03-09T10:45:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "location": {
                "displayName": "TH:A-1455",
                "locationType": "default",
                "uniqueId": "TH:A-1455",
                "uniqueIdType": "private"
            },
            "locations": [
                {
                    "displayName": "TH:A-1455",
                    "locationType": "default",
                    "uniqueId": "TH:A-1455",
                    "uniqueIdType": "private"
                }
            ],
            "recurrence": null,
            "attendees": [
                {
                    "type": "required",
                    "status": {
                        "response": "none",
                        "time": "0001-01-01T00:00:00Z"
                    },
                    "emailAddress": {
                        "name": "TH:A-1455",
                        "address": "tha1455@x2h3h.onmicrosoft.com"
                    }
                }
            ],
            "organizer": {
                "emailAddress": {
                    "name": "TH:A-1455",
                    "address": "tha1455@x2h3h.onmicrosoft.com"
                }
            },
            "onlineMeeting": null
        },
        {
            "@odata.etag": "W/\"A3aUUvi0ikGD6+Be+G6BIgAAAHskMQ==\"",
            "id": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D-L3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6_Be_G6BIgAAAAABDQAAA3aUUvi0ikGD6_Be_G6BIgAAAHtjvAAAEA==",
            "createdDateTime": "2024-03-03T22:45:30.6431222Z",
            "lastModifiedDateTime": "2024-03-03T22:45:30.6919305Z",
            "changeKey": "A3aUUvi0ikGD6+Be+G6BIgAAAHskMQ==",
            "categories": [],
            "transactionId": null,
            "originalStartTimeZone": "Central Europe Standard Time",
            "originalEndTimeZone": "UTC",
            "iCalUId": "040000008200E00074C5B7101A82E00807E803095B0D9D7EBC6DDA01000000000000000010000000894B6E9F7BD07D4382B17B4AFF93F9E4",
            "reminderMinutesBeforeStart": 15,
            "isReminderOn": true,
            "hasAttachments": false,
            "subject": "Seminář znalostního inženýrství magisterský I",
            "bodyPreview": "Seminář znalostního inženýrství magisterský I",
            "importance": "normal",
            "sensitivity": "normal",
            "isAllDay": false,
            "isCancelled": false,
            "isOrganizer": true,
            "responseRequested": true,
            "seriesMasterId": "AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O8AAA=",
            "showAs": "busy",
            "type": "occurrence",
            "webLink": "https://outlook.office365.com/owa/?itemid=AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwFRAAgI3D%2FL3RfAAEYAAAAAeSYPUpsQW0ex0XQevGDzrwcAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAAABDQAAA3aUUvi0ikGD6%2BBe%2BG6BIgAAAHtjvAAAEA%3D%3D&exvsurl=1&path=/calendar/item",
            "onlineMeetingUrl": null,
            "isOnlineMeeting": false,
            "onlineMeetingProvider": "unknown",
            "allowNewTimeProposals": true,
            "occurrenceId": "OID.AAMkADg2YzQzNzgwLTE4MGQtNDQwZC05OWZlLTViMjBjMzA2NTEzMwBGAAAAAAB5Jg9SmxBbR7HRdB68YPOvBwADdpRS_LSKQYPr4F74boEiAAAAAAENAAADdpRS_LSKQYPr4F74boEiAAAAe2O8AAA=.2024-03-09",
            "isDraft": false,
            "hideAttendees": false,
            "responseStatus": {
                "response": "organizer",
                "time": "0001-01-01T00:00:00Z"
            },
            "body": {
                "contentType": "html",
                "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\nSeminář znalostního inženýrství magisterský I\r\n</body>\r\n</html>\r\n"
            },
            "start": {
                "dateTime": "2024-03-09T09:15:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "end": {
                "dateTime": "2024-03-09T10:45:00.0000000",
                "timeZone": "Central Europe Standard Time"
            },
            "location": {
                "displayName": "TH:A-1455",
                "locationType": "default",
                "uniqueId": "TH:A-1455",
                "uniqueIdType": "private"
            },
            "locations": [
                {
                    "displayName": "TH:A-1455",
                    "locationType": "default",
                    "uniqueId": "TH:A-1455",
                    "uniqueIdType": "private"
                }
            ],
            "recurrence": null,
            "attendees": [
                {
                    "type": "required",
                    "status": {
                        "response": "none",
                        "time": "0001-01-01T00:00:00Z"
                    },
                    "emailAddress": {
                        "name": "TH:A-1455",
                        "address": "tha1455@x2h3h.onmicrosoft.com"
                    }
                }
            ],
            "organizer": {
                "emailAddress": {
                    "name": "TH:A-1455",
                    "address": "tha1455@x2h3h.onmicrosoft.com"
                }
            },
            "onlineMeeting": null
        }
    ]

    const currentEvent = currentEvents?.length ? currentEvents[0] : null
    const upcomingEvents = data?.filter((event: any) => {
        if(currentEvent && event.id === currentEvent.id){
            return null;
        }
        const now = getCurrentDate()
        const endDate =  new Date(event.end.dateTime)
        if(now > endDate){
            return null
        }
        return event
    })


    useEffect(() => {
        setRoomStatus(!currentEvent)
    }, [currentEvent, upcomingEvents]);


    return (
        <Box height="90vh" display="flex" flexDirection="column">
            <Box p={2} style={styles} display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <Typography variant="h1" fontWeight="bold" >{isRoomFree ? "Free" : "Busy"}</Typography>
                {upcomingEvents?.length ? <Timer event={isRoomFree ? upcomingEvents[0] : currentEvent || undefined}/> : null}
            </Box>
            <Box display="flex" flexDirection="row" height="80%">
                <Box py={1} display="flex" width="66%" flexDirection="row" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h3">{name}</Typography>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Typography variant="h6">{`Organiser: ${currentEvent?.organizer.emailAddress.address}`}</Typography>
                        </Box>
                        <QRCode value={`https://timetable.fit.cvut.cz/new/rooms/${name}`}  size={192}/>
                    </Box>
                    <Box  py={1} display="flex" flexDirection="column" gap={1.5}>
                        <Typography variant="h5">{`Running event${currentEvents.length > 1 ? "s" : ""}`}</Typography>
                        <Box display="flex" flexDirection="column" gap={0.5}>
                        {currentEvents.length > 1 ? currentEvents.map((event: any) => (
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h6" fontWeight="600">{event?.subject}</Typography>
                                <Typography variant="subtitle1">{`${formatDate(new Date(event?.start.dateTime || ""), true)} - ${formatDate(new Date(event?.end.dateTime || ""),true)}`}</Typography>
                            </Box>
                        )) : (<Box display="flex" flexDirection="column" gap={0.5} px={1}>
                            <Typography variant="subtitle1">Room timetable</Typography>
                            <QRCode value={`https://timetable.fit.cvut.cz/new/rooms/${name}`}  size={192}/>
                        </Box>)}
                        </Box>
                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box alignSelf="center" height="100%" display="flex" width="33%" flexDirection="column" >
                    <EventList items={upcomingEvents} />
                </Box>
            </Box>
        </Box>)
}

export default Room
