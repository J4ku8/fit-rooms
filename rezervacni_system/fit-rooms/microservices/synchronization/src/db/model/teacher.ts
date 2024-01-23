import {EventTypes} from "../../utils/types";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define a schema for an 'Event' collection
const teacherSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String, // Assuming room is a String, adjust the type accordingly
        default: '',
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher
