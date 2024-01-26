import { AppSettings } from '../../utils/types';
import MicrosoftAuth from "../../midleware/auth/MicrosoftAuth";
import config from "../../config/config";
import {Client} from "@microsoft/microsoft-graph-client";


const settings: AppSettings = {
    'clientId': config.client_id_ms,
    'clientSecret': config.client_secret_ms,
    'tenantId': config.tenant_id_ms
};

const microsoftAuth = new MicrosoftAuth(settings)

class GraphTutorial {
    // @ts-ignore
    public client: Client;
    constructor() {
        this.client = microsoftAuth.initializeGraphForAppOnlyAuth();
    }
    public async listRooms(): Promise<any> {
        try {
            const rooms = await this.client.api('/places/microsoft.graph.room')
                .select(['displayName', 'id', 'emailAddress'])
                .top(25)
                .orderby('displayName')
                .get();
            console.log(rooms.value);
            return rooms.value
        } catch (err) {
            console.log(`Error getting users: ${err}`);
        }
    }
    public async roomEvents(roomEmail: string): Promise<any> {
        try {
            const events = await this.client.api(`/users/${roomEmail}/calendar/events`)
                .get();
            console.log(events.value);
            return events.value
        } catch (err) {
            console.log(`Error getting users: ${err}`);
        }
    }

    private async getEvent(): Promise<void> {
        // TODO
    }

    public async createEvent(roomEmail: string): Promise<void> {
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

    }
    public async deleteEvent(eventId: string): Promise<void> {
        // TODO
    }

    public async updateEvent(eventId: string): Promise<void> {
        // TODO
    }



}
export default GraphTutorial
