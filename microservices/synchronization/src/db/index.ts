import mongoose from "mongoose";
import config from "../config/config";

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(config.db);
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
}

export default connect
