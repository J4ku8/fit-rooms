

export enum KosApiRoutes {
    DIVISION =  "/rooms",
    SEMESTER = "/semesters/current",
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

export type OAuthConfig = {
    clientId: string;
    clientSecret: string;
    tokenEndpoint: string;
    scope: string
}

export type TokenResponse = {
    access_token: string;
    expires_in: number;
};

export type ApiQuery = {
    query?: string
}
