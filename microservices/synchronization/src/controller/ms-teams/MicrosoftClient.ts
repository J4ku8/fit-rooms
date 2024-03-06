import { AppSettings } from '../../utils/types';
import MicrosoftAuth from '../../midleware/auth/MicrosoftAuth';
import config from '../../config/config';
import { Client } from '@microsoft/microsoft-graph-client';

const settings: AppSettings = {
  clientId: config.client_id_ms,
  clientSecret: config.client_secret_ms,
  tenantId: config.tenant_id_ms,
};

const microsoftAuth = new MicrosoftAuth(settings);

class MicrosoftClient {
  // @ts-ignore
  public client: Client;
  constructor() {
    this.client = microsoftAuth.initializeGraphForAppOnlyAuth();
  }
  public async listRooms(): Promise<any> {
    try {
      const rooms = await this.client
        .api('/places/microsoft.graph.room')
        .select(['displayName', 'id', 'emailAddress'])
        .top(25)
        .orderby('displayName')
        .get();
      // @ts-ignore
      return rooms.value.map(({ id, ...rest }) => ({ roomId: id, ...rest }));
    } catch (err) {
      console.log(`Error getting users: ${err}`);
    }
  }
  public async roomEvents(roomEmail: string): Promise<any> {
    try {
      const events = await this.client
        .api(`/users/${roomEmail}/calendar/events`)
        .get();
      return events.value;
    } catch (err) {
      console.log(`Error getting users: ${err}`);
    }
  }

  public async createEvent({
    roomEmail,
    event,
  }: {
    roomEmail: string;
    event: any;
  }): Promise<void> {
    const res = await this.client
      .api(`/users/${roomEmail}/calendar/events`)
      .post(event);
    return res;
  }
  public async deleteEvent({
    roomEmail,
    eventId,
  }: {
    roomEmail: string;
    eventId: any;
  }): Promise<void> {
    const res = await this.client
      .api(`/users/${roomEmail}/calendar/events/${eventId}`)
      .delete();
    return res;
  }

  public async sendEmail({
    roomId,
    recipient,
    content,
  }: {
    roomId: string;
    recipient?: string;
    content: string;
  }) {
    const email = {
      message: {
        subject: 'Conflict with KOS meeting',
        body: {
          contentType: 'Text',
          content: content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipient,
            },
          },
        ],
      },
      saveToSentItems: 'false',
    };
    console.log('sending...');
    return await this.client.api(`/users/${roomId}/sendMail`).post(email);
  }
}
export default MicrosoftClient;
