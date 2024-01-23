import mongoose from "mongoose";

const url = 'mongodb://localhost:27017'; // default MongoDB connection URL

const dbName = 'fit-rooms';

async function connect() {
    try {
        return await mongoose.connect('mongodb://localhost:27017/fit-rooms');
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
}

export default connect
