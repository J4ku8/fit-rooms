import { NextApiRequest, NextApiResponse } from "next";
import { isToday, todayDate } from "../../../src/utils/time-helper";
import GraphApiClient from "../../../model/GraphApiClient";
import { AppSettings, PatternTypes } from "../../../src/types";

const settings: AppSettings = {
  clientSecret: process.env.CLIENT_SECRET_MS || "",
  clientId: process.env.CLIENT_ID_MS || "",
  tenantId: process.env.TENANT_ID_MS || "",
  graphUserScopes: ["user.read"],
};
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const roomEmail = _req.query.roomEmail;
    const microsoftAuth = new GraphApiClient(settings);
    const client = microsoftAuth.initializeGraphForAppOnlyAuth();
    const date = todayDate();
    const events = await client
      ?.api(
        `/users/tha1455@x2h3h.onmicrosoft.com/calendarView?startDateTime=${date}T00:00:00&endDateTime=${date}T23:59:59`,
      )
      .header("Prefer", 'outlook.timezone="Central Europe Standard Time"')
      .orderby("start/dateTime")
      .get();

    res.status(200).json(events.value);
  } catch (err: any) {
    console.log(`Error getting events: ${err}`);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
