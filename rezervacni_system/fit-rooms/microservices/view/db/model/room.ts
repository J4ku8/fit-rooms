import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define a schema for an 'Event' collection
const roomSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    }
});

const Room = mongoose.model('Room', roomSchema);

export default Room
