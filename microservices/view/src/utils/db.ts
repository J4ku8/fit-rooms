import { MongoClient } from "mongodb";
import { DB, ROOMS_COLLECTION } from "./constants";
import { Room } from "../types";

export const getRooms = async () => {
  const client = new MongoClient(process.env.DB_URL || "");
  await client.connect();

  const collection = client.db(DB).collection(ROOMS_COLLECTION);
  const data = await collection.find({}).toArray();
  client.close();

  return {
    rooms: JSON.parse(JSON.stringify(data)) as Room[],
  };
};
