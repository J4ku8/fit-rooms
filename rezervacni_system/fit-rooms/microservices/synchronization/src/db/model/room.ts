import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define a schema for an 'Event' collection
const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    }
});

const Room = mongoose.model('Room', roomSchema);

export default Room
