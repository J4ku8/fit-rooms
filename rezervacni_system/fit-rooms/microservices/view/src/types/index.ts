// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import {ReactNode} from "react";

export type Event = {
  room: string
  name: string
  organiser: string
  from: string
  to: string
}

export type Room = {
  emailAddress: string;
 displayName: string;
 roomId: string;
}

export type ProvidersProps = {
  children: ReactNode
  title?: string
  transparentFooter?: boolean
}

export type AppSettings = {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  graphUserScopes: string[];
}

export type GraphApiFetch = {
  roomEmail: string
}


export type RoomListType = {
  rooms: Room[]
}
