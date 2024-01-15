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
