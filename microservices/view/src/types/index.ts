// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { ReactNode } from "react";

export type Event = {
  room: string;
  name: string;
  organiser: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  subject: string;
  recurrence: any;
};

export type Room = {
  emailAddress: string;
  displayName: string;
  roomId: string;
};

export type DisplayRoom = {
  roomEmail: string;
  name: string;
};

export type ProvidersProps = {
  children: ReactNode;
  title?: string;
  transparentFooter?: boolean;
  isMobile?: boolean;
};

export type AppSettings = {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  graphUserScopes: string[];
};

export type PatternTypes = {
  [key: string]: string;
};

export type GraphApiFetch = {
  roomEmail: string;
  date?: string;
};

export type RoomListType = {
  rooms: Room[];
};
