import {BOTH, days, EVEN, ODD, WEEKS_OF_LECTURES} from "../../utils/constants";
import {assignTimeToDate, getYearMonthDay} from "../../utils/time-handler";
import Room from "../../db/model/room";


const createParallelEvent = async (parallel: any, semesterStart: Date, semesterEnd: Date) => {
    const { parity, startTime, day, endTime, room } = parallel.timetableSlot;
    const startDay = [BOTH, ODD].includes(parity) ? semesterStart : new Date(new Date(semesterStart.getTime()).setDate(semesterStart.getDate() + 7))
    const endDay = [BOTH, EVEN].includes(parity) ? semesterEnd : new Date(new Date(semesterStart.getTime()).setDate(semesterStart.getDate() - 7))
    let week = 0
    const events = []
    const roomName = room["_"]
    const roomFromDb = await Room.findOne({ displayName: roomName });
    if(!roomFromDb){
        return []
    }
    // while(week < WEEKS_OF_LECTURES){
    //     const isWeekOdd = week % 2
    //     if(parity === ODD && !isWeekOdd){
    //         week +=1;
    //         continue
    //     }
    //     if(parity === EVEN && isWeekOdd){
    //         week +=1;
    //         continue
    //     }
    //     const helperDate = new Date(startDay)
    //     const eventDateStart = new Date(helperDate.getTime()).setDate(semesterStart.getDate() + (day-1) + (7 * week))
    //     const event = {
    //         subject: parallel.course["_"],
    //         body: {
    //             contentType: 'HTML',
    //             content: parallel.course["_"]
    //         },
    //         location: {
    //             displayName: roomName
    //         },
    //         start: {
    //             dateTime: assignTimeToDate(new Date(eventDateStart), startTime).toISOString(),
    //             timeZone: "Central Europe Standard Time"
    //         },
    //         end: {
    //             dateTime: assignTimeToDate(new Date(eventDateStart), endTime).toISOString(),
    //             timeZone: "Central Europe Standard Time"
    //         },
    //         attendees: [
    //             {
    //                 emailAddress: {
    //                     address: roomFromDb?.emailAddress,
    //                     name: roomName
    //                 },
    //                 type: 'required'
    //             }
    //         ],
    //     };
    //
    //
    //     events.push(event)
    //     week += 1
    // }
    const event = {
        subject: parallel.course["_"],
        body: {
            contentType: 'HTML',
            content: parallel.course["_"]
        },
        start: {
            dateTime: assignTimeToDate(startDay, startTime).toISOString(),
            timeZone: "Central Europe Standard Time"
        },
        end: {
            dateTime: assignTimeToDate(startDay, endTime).toISOString(),
            timeZone: "Central Europe Standard Time"
        },
        recurrence: {
            pattern: {
                type: "weekly",
                interval: parity === BOTH ? 1 : 2,
                daysOfWeek: [days[Number(day)]],
                firstDayOfWeek: days[0]
            },
            range: {
                type: "endDate",
                startDate: getYearMonthDay(startDay),
                endDate: getYearMonthDay(endDay)
            }
        },
        attendees: [
            {
                emailAddress: {
                                        address: roomFromDb?.emailAddress,
                                        name: roomName
                                    },
                type: 'required'
            }]
    }


            return event;


    // return events;
}

const createExamEvent = async (exam: any) => {
    const { course, room, startDate, endDate } = exam;
    const roomName = room["_"]
    const roomFromDb = await Room.findOne({ displayName: roomName });
    return roomFromDb ? {
        subject: `Exam - ${course["_"]}`,
        body: {
            contentType: 'HTML',
            content: course["_"]
        },
        location: {
            displayName: roomName
        },
        start: {
            dateTime: startDate,
            timeZone: "Central Europe Standard Time"
        },
        end: {
            dateTime: endDate,
            timeZone: "Central Europe Standard Time"
        },
        attendees: [
            {
                emailAddress: {
                    address: roomFromDb?.emailAddress,
                    name: roomName
                },
                type: 'required'
            }
        ],
    } : null;

}

const createCourseEvent = async (event: any) => {
    const { title, content } = event
    const roomName =  content?.room["_"] || content?.note["_"]
    if(!roomName){
        return
    }
    const roomFromDb = await Room.findOne({ displayName: roomName });

    return roomFromDb ? {
        subject: title,
        body: {
            contentType: 'HTML',
            content: title
        },
        location: {
            displayName: roomName
        },
        start: {
            dateTime: content.startDate,
            timeZone: "Central Europe Standard Time"
        },
        end: {
            dateTime: content.endDate,
            timeZone: "Central Europe Standard Time"
        },
        attendees: [
            {
                emailAddress: {
                    address: roomFromDb?.emailAddress,
                    name: roomName
                },
                type: 'required'
            }
        ],
    } : roomFromDb;

}

export const parseParrallels = async ({ semesterStart, semesterEnd, data }: { semesterStart: Date, semesterEnd: Date, data: any  }) => {

    // @ts-ignore
    const result = await Promise.all(data?.map(parallel => createParallelEvent(parallel, semesterStart, semesterEnd))) || []
    return result?.filter(value => value !== null)
}

export const parseExams = async (data: any) => {
    // @ts-ignore
    const result = await Promise.all(data?.map(exam => createExamEvent(exam)))
    return result?.filter(value => value !== null)
}

export const parseCourseEvents = async (data: any) => {
    // @ts-ignore
    const result = await Promise.all(data?.map(event => createCourseEvent(event))) || []
    return result?.filter(value => value !== null)
}
