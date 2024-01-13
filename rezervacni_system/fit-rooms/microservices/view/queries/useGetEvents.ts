import {useQuery} from "react-query";

export const useGetEvents = (room: string) => {
    return useQuery('events', async () => {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return await response.json();
    }, {
        refetchInterval: 300000,

    });
}
