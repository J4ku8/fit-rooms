import { NextApiRequest, NextApiResponse } from "next";
import {
  isToday,
  thisMonthRange,
  todayDate,
} from "../../../src/utils/time-helper";
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
    const calendar = await client
      ?.api(`/users/${roomEmail}/calendar`)
      .header("Prefer", 'outlook.timezone="Central Europe Standard Time"')
      .get();
    res.status(200).json(calendar);
  } catch (err: any) {
    console.log(`Error getting events: ${err}`);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
