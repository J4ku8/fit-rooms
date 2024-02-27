import {BOTH, EVEN, ODD, WEEKS_OF_LECTURES} from "../../utils/constants";
import {assignTimeToDate} from "../../utils/time-handler";
import Room from "../../db/model/room";


const createParallelEvent = async (parallel: any, semesterStart: Date, semesterEnd: Date) => {
    const { parity, startTime, day, endTime, room } = parallel.timetableSlot;
    const startDay = [BOTH, ODD].includes(parity) ? semesterStart : new Date(semesterStart.setDate(semesterStart.getDate() + 7))
    const endDay = [BOTH, EVEN].includes(parity) ? semesterEnd : new Date(semesterEnd.setDate(semesterStart.getDate() - 7))
    let week = 1
    const events = []
    const roomName = room["_"]
    const roomFromDb = await Room.findOne({ displayName: roomName });
    if(!roomFromDb){
        return []
    }
    while(week <= WEEKS_OF_LECTURES){
        const isWeekOdd = week % 2
        if(parity === ODD && !isWeekOdd){
            week +=1;
            continue
        }
        if(parity === EVEN && isWeekOdd){
            week +=1;
            continue
        }
        const helperDate = new Date(startDay)
        const eventDateStart = new Date(helperDate.setDate(semesterStart.getDate() + (7 * week)))
        const event = {
            subject: parallel.course["_"],
            body: {
                contentType: 'HTML',
                content: parallel.course["_"]
            },
            location: {
                displayName: roomName
            },
            start: {
                dateTime: assignTimeToDate(eventDateStart, startTime).toISOString(),
                timeZone: "Central Europe Standard Time"
            },
            end: {
                dateTime: assignTimeToDate(eventDateStart, endTime).toISOString(),
                timeZone: "Central Europe Standard Time"
            },
            // recurrence: {
            //     pattern: {
            //         type: "weekly",
            //         interval: parity === BOTH ? 1 : 2,
            //         daysOfWeek:[ days[Number(day)]],
            //         firstDayOfWeek: days[0]
            //     },
            //     range: {
            //         type: "endDate",
            //         startDate: getYearMonthDay(startDay),
            //         endDate: getYearMonthDay(endDay)
            //     }
            // },
            attendees: [
                {
                    emailAddress: {
                        address: roomFromDb?.emailAddress,
                        name: roomName
                    },
                    type: 'required'
                }
            ],
        };


        events.push(event)
        week += 1
    }

    return events;
}

export const parseCvutData = async ({ semesterStart, semesterEnd, data }: { semesterStart: Date, semesterEnd: Date, data: any  }) => {

    // @ts-ignore
    return await Promise.all(data.map(parallel => createParallelEvent(parallel, semesterStart, semesterEnd)))
}
