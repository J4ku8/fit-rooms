import { Document, Model } from 'mongoose';


export enum KosApiRoutes {
    DIVISION =  "/rooms",
    SEMESTER = "/semesters",
    PARALLELS = "/parallels",
    COURSE_EVENT = "/courseEvents",
    TEACHERS = "/teachers"
}

export enum ApiProviders {
    TEAMS = "/teams",
    KOS_API = "https://kosapi.fit.cvut.cz/api/3"
}

export enum EventTypes {
    'lecture',
    'tutorial',
    'laboratory',
    'course_event',
    'exam',
    'assessment',
    'teacher_timetable_slot'
}

export type SubEventTypes = {
    long: [EventTypes.lecture, EventTypes.laboratory, EventTypes.tutorial]
    short: [EventTypes.exam]
    adhoc: [EventTypes.course_event, EventTypes.assessment, EventTypes.teacher_timetable_slot]
}
export interface AppSettings {
    clientId: string;
    clientSecret: string;
    tenantId: string;
}

export type OAuthConfig = {
    client_id_kos: string;
    client_secret_kos: string;
    client_id_ms: string;
    client_secret_ms: string;
    tenant_id_ms: string;
    tokenEndpoint: string;
    scope: string;
}

export type TokenResponse = {
    access_token: string;
    expires_in: number;
};

export interface MicrosoftAttributed {
    isMicrosoft: boolean;
}

export type AtomlessObject = {
    [key: string]: string | AtomlessObject | AtomlessObject[];
};

export type KosApiHandleTypes<T = any> = {
    query: string;
    args?: T;
};

export type SemesterSchema = {
    name: string;
    from: Date;
    to: Date;
}
export interface SemesterDocument extends SemesterSchema, Document {}

