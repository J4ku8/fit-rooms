export const rooms = [{id: "TH:A-1444"}, {id: "TH:A-1455"}, {id: "TH:A-951"}, {id: "TH:A-924"}, {id: "TH:A-949"}, {id: "TH:A-951"}]

const courseEvent =  {
    title: 'Obhajoba semestrálního projektu',
    id: 'urn:cvut:kos:courseevent:1247365812505',
    updated: '2023-11-09T17:58:59.0',
    author: { name: 'matouj10' },
    link: { rel: 'self', href: 'courseEvents/1247365812505/' },
    content: {
        type: 'xml',
        'xsi:type': 'courseEvent',
        capacity: '5',
        course: [Object],
        creator: [Object],
        endDate: '2023-12-21T10:00:00',
        name: [Object],
        note: [Object],
        occupied: '2',
        semester: [Object],
        signinDeadline: '2023-12-21',
        startDate: '2023-12-21T09:15:00'
    }
}


const parallel = {
    id: 'urn:cvut:kos:parallel:1246661562605',
    updated: '2023-08-09T11:07:19.0',
    author: { name: 'irinkpet' },
    link: { rel: 'self', href: 'parallels/1246661562605/' },
    content: {
        type: 'xml',
        'xsi:type': 'parallel',
        capacity: '20',
        capacityOverfill: 'DENIED',
        code: '101',
        course: { _: 'Prostor.a strateg.plán.', 'xlink:href': 'courses/521UP3/' },
        enrollment: 'ALLOWED',
        occupied: '19',
        parallelType: 'TUTORIAL',
        semester: { _: 'Zimní 2023/2024', 'xlink:href': 'semesters/B231/' },
        teacher: [ [Object], [Object] ],
        timetableSlot: {
            id: '1246661562705',
            day: '4',
            duration: '1',
            endTime: '14:00:00',
            firstHour: '8',
            parity: 'BOTH',
            startTime: '13:15:00',
            room: [Object]
        }
    }
}
