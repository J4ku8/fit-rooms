import {BOTH, days, EVEN, ODD} from "../../utils/constants";
import {assignTimeToDate} from "../../utils/time-handler";



const  createEvent = (parallel: any, semesterStart: Date, semesterEnd: Date) => {
    const { parity, startTime, day, endTime } = parallel.timetableSlot;
    const startDay = [BOTH, ODD].includes(parity) ? semesterStart : new Date(semesterStart.setDate(semesterStart.getDate() + 7))
    const endDay = [BOTH, EVEN].includes(parity) ? semesterEnd : new Date(semesterEnd.setDate(semesterStart.getDate() - 7))
    const event = {
        subject: parallel.course["_"],
        body: {
            contentType: 'HTML',
            content: parallel.course["_"]
        },
        start: {
            dateTime: assignTimeToDate(startDay, startTime).toISOString(),
            timeZone: "Central Europe Time"
        },
        end: {
            dateTime: assignTimeToDate(endDay, endTime).toISOString(),
            timeZone: "Central Europe Time"
        },
        recurrence: {
            pattern: {
                type: "weekly",
                interval: parity === BOTH ? 1 : 2,
                daysOfWeek: days[Number(day)],
                firstDayOfWeek: days[0]
            },
            range: {
                type: "endDate",
                startDate: startDay,
                endDate: endDay
            }
        },
        attendees: [
            {
                emailAddress: {
                    address: 'th_a_1444@x2h3h.onmicrosoft.com',
                    name: 'TH:A-1444'
                },
                type: 'required'
            }
        ]
    };

    return event;
}

export const parseCvutData = ({ semesterStart, semesterEnd }: { semesterStart: Date, semesterEnd: Date  }, data?: any) => {
    const event = {
        subject: 'Service meet',
        body: {
            contentType: 'HTML',
            content: 'Does noon time work for you?'
        },
        start: {
            dateTime: '2017-09-04T12:00:00',
            timeZone: 'Pacific Standard Time'
        },
        end: {
            dateTime: '2017-09-04T14:00:00',
            timeZone: 'Pacific Standard Time'
        },
        recurrence: {
            pattern: {
                type: 'weekly',
                interval: 1,
                daysOfWeek: [ 'Monday' ]
            },
            range: {
                type: 'endDate',
                startDate: '2017-09-04',
                endDate: '2017-12-31'
            }
        },
        location: {
            displayName: 'Harry\'s Bar'
        },
        allowNewTimeProposals: true
    };
    const parallel = {
        type: 'xml',
        'xsi:type': 'parallel',
        capacity: '24',
        code: '1',
        course: { _: 'Grid Computing', 'xlink:href': 'courses/NI-GRI/' },
        occupied: '5',
        parallelType: 'LECTURE',
        semester: { _: 'Zimní 2023/2024', 'xlink:href': 'semesters/B231/' },
        teacher: { _: 'doc. Dr. André Sopczak', 'xlink:href': 'teachers/sopczand/' },
        timetableSlot: {
            id: '1246702568305',
            day: '4',
            duration: '2',
            endTime: '14:15:00',
            firstHour: '7',
            parity: 'BOTH',
            startTime: '12:45:00',
            room: [Object]
        }
    }
    // TODO: find first and last occurence of event in semester -> save to range object in MS event, even/odd week is defined by interval
    const mockParallel = [parallel]
    const mockEvents = [event]
    const events = mockParallel.map(parallel => createEvent(parallel, semesterStart, semesterEnd))
    return events
}
