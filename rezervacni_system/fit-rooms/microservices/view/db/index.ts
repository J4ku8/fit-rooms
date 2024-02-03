import mongoose from "mongoose";
import Room from "./model/room";
import { Room as RoomType } from '../types'

const connect = async () => {
    try {
        return await mongoose.connect(process.env.DB_URL || "");
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
}

export const getRooms = async () => {
    try{
        await connect()
        return await Room.find({}) as RoomType[]
    }catch (e) {
        console.log("Cannot get rooms from DB: ",e)
        return []
    }
}
