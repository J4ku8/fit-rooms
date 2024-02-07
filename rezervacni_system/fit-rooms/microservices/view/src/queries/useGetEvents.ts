import {useQuery} from "react-query";
import {GraphApiFetch} from "../types";
import {useGraphApiClient} from "../hooks/useGraphApiClient";
export const useGetEvents = ({ roomId }: GraphApiFetch) => {
    const client = useGraphApiClient()
    return useQuery('events', async () => {
        try {
            try {
                const events = await client?.api(`/users/${roomId}/calendar/events`)
                    .get();
                console.log(events.value);
                return events.value
            } catch (err) {
                console.log(`Error getting users: ${err}`);
            }
        } catch (err) {
            console.log(`Error getting users: ${err}`);
        }

        // const response = await fetch('/api/events', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ room })
        // });
        //
        // if (!response.ok) {
        //     throw new Error('Failed to fetch events');
        // }
        //
        // return await response.json();
    }, {
        refetchInterval: 3000,
    });
}
