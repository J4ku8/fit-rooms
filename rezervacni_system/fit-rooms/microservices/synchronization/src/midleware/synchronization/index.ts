export const parseCvutData = (data: any) => {
    const event = {
        subject: 'Let\'s go for lunch',
        body: {
            contentType: 'HTML',
            content: 'Does mid month work for you?'
        },
        start: {
            dateTime: '2019-03-15T12:00:00',
            timeZone: 'Pacific Standard Time'
        },
        end: {
            dateTime: '2019-03-15T14:00:00',
            timeZone: 'Pacific Standard Time'
        },
        location: {
            displayName: 'Harry\'s Bar'
        },
        attendees: [
            {
                emailAddress: {
                    address: 'adelev@contoso.onmicrosoft.com',
                    name: 'Adele Vance'
                },
                type: 'required'
            }
        ],
        transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'
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
    const mockParallel = [parallel]
    const mockEvents = [event]

}
