import {Event, Room} from '../types'


export const sampleRoomsData: Room[] = [
  { id: "TH:A-905"},
  { id: "TH:A-1015"},
  { id: "TH:A-915"},
  { id: "TH:A-955"},
]

export const sampleEventsData: Event[] = [
  { room: "TH:A-905", name: 'Pokec', organiser: "tichyj15", from: "2024-01-15T12:00:00.000Z",to: "2024-01-15T23:00:00.000Z" },
  { room: "TH:A-905", name: 'Pokec', organiser: "tichyj15", from: "2024-01-13T22:00:00.000Z",to: "2024-01-13T23:00:00.000Z" },
  { room: "TH:A-1015", name: 'Pokec', organiser: "tichyj15", from: "2024-01-13T22:00:00.000Z",to: "2024-01-13T23:00:00.000Z" },
  { room: "TH:A-955", name: 'Pokec', organiser: "tichyj15", from: "2024-01-13T22:00:00.000Z",to: "2024-01-13T23:00:00.000Z" },
]

export const mockEventsData = [
  {
    "allowNewTimeProposals": true,
    "attendees": [{"@odata.type": "tichyj15@fit.cvut.cz"}, ],
    "body": {"@odata.type": "microsoft.graph.itemBody"},
    "bodyPreview": "string",
    "categories": ["string"],
    "changeKey": "string",
    "createdDateTime": "String (timestamp)",
    "end": {"@odata.type": "microsoft.graph.dateTimeTimeZone"},
    "hasAttachments": true,
    "hideAttendees": false,
    "id": "string (identifier)",
    "importance": "String",
    "isAllDay": true,
    "isCancelled": true,
    "isDraft": false,
    "isOnlineMeeting": true,
    "isOrganizer": true,
    "isReminderOn": true,
    "lastModifiedDateTime": "String (timestamp)",
    "location": {"@odata.type": "microsoft.graph.location"},
    "locations": [{"@odata.type": "microsoft.graph.location"}],
    "onlineMeeting": {"@odata.type": "microsoft.graph.onlineMeetingInfo"},
    "onlineMeetingProvider": "string",
    "onlineMeetingUrl": "string",
    "organizer": {"@odata.type": "microsoft.graph.recipient"},
    "originalEndTimeZone": "string",
    "originalStart": "String (timestamp)",
    "originalStartTimeZone": "string",
    "recurrence": {"@odata.type": "microsoft.graph.patternedRecurrence"},
    "reminderMinutesBeforeStart": 1024,
    "responseRequested": true,
    "responseStatus": {"@odata.type": "microsoft.graph.responseStatus"},
    "sensitivity": "String",
    "seriesMasterId": "string",
    "showAs": "String",
    "start": {"@odata.type": "microsoft.graph.dateTimeTimeZone"},
    "subject": "string",
    "type": "String",
    "webLink": "string",

    "attachments": [ { "@odata.type": "microsoft.graph.attachment" } ],
    "calendar": { "@odata.type": "microsoft.graph.calendar" },
    "extensions": [ { "@odata.type": "microsoft.graph.extension" } ],
    "instances": [ { "@odata.type": "microsoft.graph.event" }],
    "singleValueExtendedProperties": [ { "@odata.type": "microsoft.graph.singleValueLegacyExtendedProperty" }],
    "multiValueExtendedProperties": [ { "@odata.type": "microsoft.graph.multiValueLegacyExtendedProperty" }]
  }
]
