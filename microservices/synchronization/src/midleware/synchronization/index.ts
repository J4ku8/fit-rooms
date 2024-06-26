import {
  BOTH,
  days,
  EVEN,
  ODD,
  WEEKS_OF_LECTURES,
} from '../../utils/constants';
import { assignTimeToDate, getYearMonthDay } from '../../utils/time-handler';
import Room from '../../db/model/room';
import { Event as EventType } from '../../utils/types';
import moment from 'moment/moment';
import MicrosoftClient from '../../controller/ms-teams/MicrosoftClient';
import Conflict from '../../db/model/conflict';
import { KosApiClient } from '../../controller/cvut-kos/KosClient';

const createParallelEvent = async (
  parallel: any,
  semesterStart: Date,
  semesterEnd: Date
) => {
  const { parity, startTime, day, endTime, room } = parallel.timetableSlot;
  const startDay = [BOTH, ODD].includes(parity)
    ? semesterStart
    : new Date(
        new Date(semesterStart.getTime()).setDate(semesterStart.getDate() + 7)
      );
  const endDay = [BOTH, EVEN].includes(parity)
    ? semesterEnd
    : new Date(
        new Date(semesterStart.getTime()).setDate(semesterStart.getDate() - 7)
      );
  const roomName = room['_'];
  const roomFromDb = await Room.findOne({ displayName: roomName });
  if (!roomFromDb) {
    return [];
  }

  return {
    subject: parallel.course['_'],
    body: {
      contentType: 'HTML',
      content: parallel.course['_'],
    },
    bodyPreview: "KOS – parallel",
    start: {
      dateTime: assignTimeToDate(startDay, startTime).toISOString(),
      timeZone: 'Central Europe Standard Time',
    },
    end: {
      dateTime: assignTimeToDate(startDay, endTime).toISOString(),
      timeZone: 'Central Europe Standard Time',
    },
    location: {
      displayName: roomName,
    },
    recurrence: {
      pattern: {
        type: 'weekly',
        interval: parity === BOTH ? 1 : 2,
        daysOfWeek: [days[Number(day) - 1]],
        firstDayOfWeek: days[0],
      },
      range: {
        type: 'endDate',
        startDate: getYearMonthDay(startDay),
        endDate: getYearMonthDay(endDay),
      },
    },
    attendees: [
      {
        emailAddress: {
          address: roomFromDb?.emailAddress,
          name: roomName,
        },
        type: 'required',
      },
    ],
  };
};

const createExamEvent = async (exam: any) => {
  const { course, room, startDate, endDate } = exam;
  const roomName = room['_'];
  const roomFromDb = await Room.findOne({ displayName: roomName });
  return roomFromDb
    ? {
        subject: `Exam - ${course['_']}`,
        body: {
          contentType: 'HTML',
          content: course['_'],
        },
        bodyPreview: "KOS – exam",
        location: {
          displayName: roomName,
        },
        start: {
          dateTime: startDate,
          timeZone: 'Central Europe Standard Time',
        },
        end: {
          dateTime: endDate,
          timeZone: 'Central Europe Standard Time',
        },
        attendees: [
          {
            emailAddress: {
              address: roomFromDb?.emailAddress,
              name: roomName,
            },
            type: 'required',
          },
        ],
      }
    : null;
};

const createCourseEvent = async (event: any) => {
  const { title, content } = event;
  const roomName = content?.room['_'] || content?.note['_'];
  if (!roomName) {
    return;
  }
  const roomFromDb = await Room.findOne({ displayName: roomName });

  return roomFromDb
    ? {
        subject: title,
        body: {
          contentType: 'HTML',
          content: title,
        },
        bodyPreview: "KOS – course event",
        location: {
          displayName: roomName,
        },
        start: {
          dateTime: content.startDate,
          timeZone: 'Central Europe Standard Time',
        },
        end: {
          dateTime: content.endDate,
          timeZone: 'Central Europe Standard Time',
        },
        attendees: [
          {
            emailAddress: {
              address: roomFromDb?.emailAddress,
              name: roomName,
            },
            type: 'required',
          },
        ],
      }
    : roomFromDb;
};

export const parseParrallels = async ({
  semesterStart,
  semesterEnd,
  data,
}: {
  semesterStart: Date;
  semesterEnd: Date;
  data: any;
}) => {
  const result =
      await Promise?.all(
      data?.map((parallel: any) =>
        createParallelEvent(parallel, semesterStart, semesterEnd)
      )
    ) || [];
  return result?.filter((value) => value !== null);
};

export const parseExams = async (data: any) => {
  const result = await Promise?.all(
    data?.map((exam: any) => createExamEvent(exam))
  );
  return result?.filter((value) => value !== null);
};

export const parseCourseEvents = async (data: any) => {
  const result =
    (await Promise.all(data?.map((event: any) => createCourseEvent(event)))) ||
    [];
  return result?.filter((value) => value !== null);
};

const getIsSameDay = (newEvent: EventType, existingEvent: EventType) => {
  if (newEvent?.recurrence) {
    return newEvent?.recurrence?.pattern?.daysOfWeek.some((day) => {
      const dayLowerCase = day.toLowerCase();
      if (existingEvent?.recurrence) {
        return existingEvent?.recurrence?.pattern?.daysOfWeek?.includes(
          dayLowerCase
        );
      }
      const date = moment(newEvent?.start?.dateTime);
      const dayName =
        date.format('dddd').charAt(0).toUpperCase() +
        date.format('dddd').slice(1).toLowerCase();
      return dayName === dayLowerCase;
    });
  }
  if (existingEvent?.recurrence) {
    return existingEvent?.recurrence?.pattern?.daysOfWeek.some((day) => {
      const dayLowerCase = day.toLowerCase();
      if (newEvent?.recurrence) {
        return newEvent?.recurrence?.pattern?.daysOfWeek?.includes(
          dayLowerCase
        );
      }
      const date = moment(existingEvent?.start?.dateTime);
      const dayName =
        date.format('dddd').charAt(0).toUpperCase() +
        date.format('dddd').slice(1).toLowerCase();
      return dayName === dayLowerCase;
    });
  }
  const newDateDay = moment(newEvent?.start?.dateTime);
  const newDayName =
    newDateDay.format('dddd').charAt(0).toUpperCase() +
    newDateDay.format('dddd').slice(1);
  const existingDateDay = moment(existingEvent?.start?.dateTime);
  const existingDayName =
    existingDateDay.format('dddd').charAt(0).toUpperCase() +
    existingDateDay.format('dddd').slice(1);
  return existingDayName === newDayName;
};

export const getSortedEvents = async (
  events: EventType[],
  microsoft_client: MicrosoftClient
) => {
  const conflictedEvents: EventType[][] = [];
  const duplicatedEvents: EventType[][] = [];
  const newEventsPromises: Promise<EventType | undefined>[] = events.map(
    async (event: EventType) => {
      const eventRoom = event.attendees[0].emailAddress.address;
      const createdEvents: EventType[] =
        await microsoft_client.roomEvents(eventRoom);
      const conflicts = createdEvents?.filter((existingEvent: EventType) => {
        const startTimeExisting = moment(
          moment(existingEvent?.start?.dateTime).format('HH:mm:ss'),
          'HH:mm:ss'
        );
        const endTimeExisting = moment(
          moment(existingEvent?.end?.dateTime).format('HH:mm:ss'),
          'HH:mm:ss'
        );
        const startTimeNew = moment(
          moment(event?.start?.dateTime).format('HH:mm:ss'),
          'HH:mm:ss'
        );
        const endTimeNew = moment(
          moment(event?.end?.dateTime).format('HH:mm:ss'),
          'HH:mm:ss'
        );
        const isSameDay = getIsSameDay(event, existingEvent);
        const isSameRoom = existingEvent.attendees.some(
          (attendee) => attendee.emailAddress.address === eventRoom
        );
        return (
          isSameRoom &&
          isSameDay &&
          ((startTimeNew.isSameOrBefore(endTimeExisting) &&
            endTimeNew.isSameOrAfter(startTimeExisting)) ||
            (startTimeNew.isAfter(startTimeExisting) &&
              endTimeNew.isBefore(endTimeExisting)) ||
            (startTimeNew.isSameOrBefore(startTimeExisting) &&
              endTimeNew.isSameOrAfter(endTimeExisting)))
        );
      });
      conflictedEvents.push(conflicts);
      const isConflcitedEvent = conflicts.some(
        (conflitEvent) => conflitEvent.subject === event.subject
      );
      if (!isConflcitedEvent) {
        return event;
      }
      return;
    }
  );

  const newEvents = await Promise.all(newEventsPromises);
  newEvents.filter((event) => event !== undefined);

  return { conflictedEvents, newEvents };
};

export const syncEvents = async (
  kos_client: KosApiClient,
  microsoft_client: MicrosoftClient
) => {
  const semester = await kos_client.getSemester();
  const courseEvents: any[] = await kos_client.getCourseEvent(semester.name) || [];
  const exams: any[] = await kos_client.getExams(semester.name) || [];
  const parallels: any[] = await kos_client.getParallels(semester?.name) || [];
  const endOfLectures = new Date(
    new Date(semester.from).setDate(
      semester.from.getDate() + WEEKS_OF_LECTURES * 7 + 5
    )
  );
  const microsoftParrallels = await parseParrallels({
    semesterStart: semester.from,
    semesterEnd: endOfLectures,
    data: parallels,
  });
  const microsoftExams = await parseExams(exams);
  const microsoftCourseEvents = await parseCourseEvents(courseEvents);
  const allEvents: EventType[] = [
    ...microsoftParrallels?.flat(),
    ...microsoftExams,
    ...microsoftCourseEvents,
  ];
  const allKosEvents: any = [
    ...parallels,
    ...exams,
    ...courseEvents,
  ];

  const { conflictedEvents, newEvents } = await getSortedEvents(
    allEvents,
    microsoft_client
  );

  try {
    const eventPromises = newEvents
      ?.filter(
        (event: EventType | undefined): event is EventType =>
          event !== undefined
      )
      .map(async (event: EventType) => {
        return await microsoft_client.createEvent({
          roomEmail: event.attendees[0].emailAddress.address,
          event: event,
        });
      });

    const conflictPromises = conflictedEvents
      .flat()
      ?.map(async (conflict: EventType) => {
        const room = await Room.findOne({
          displayName: conflict?.location?.displayName,
        });
        const authorKos = allKosEvents.find((event: any )=> event?.course["_"] === conflictedEvents[0][0].subject)?.author.name
        const authorKosEmail = `${authorKos}@fit.cvut.cz`
        const authorMS = conflict?.organizer.emailAddress.address;
        const prevConflict = await Conflict.findOne({
          eventName: conflict?.subject,
          start: conflict?.start,
          end: conflict?.end,
          kosEventOrganiser: authorKosEmail,
          msEventOrganiser: authorMS,
        });


        if (room && !prevConflict) {
          await microsoft_client.sendEmail({
            roomId: room?.roomId,
            content: `There is a conflict between existing event ${conflict.subject} at ${conflict?.start?.dateTime}
            and new incoming from KOS ${conflict.subject} at ${conflict?.start?.dateTime}. \n Kos contact person:${authorKosEmail}. \n MS contact person:${authorMS}`,
          });
        }

        await Conflict.create({
          eventName: conflict?.subject,
          start: conflict?.start,
          end: conflict?.end,
          room: room,
          kosEventOrganiser: authorKosEmail,
          msEventOrganiser: authorMS,
        });
      });

    const res = await Promise.all([eventPromises, conflictPromises]);
    console.log('Write done!');
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
