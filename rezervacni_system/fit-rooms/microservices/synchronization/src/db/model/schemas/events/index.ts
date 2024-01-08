const mongoose = require('mongoose');
const { EventTypes } = require('../../../../utils/types'); // Adjust the path as needed

const Schema = mongoose.Schema;

// Define a schema for an 'Event' collection
const eventSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(EventTypes),
        required: true,
    },
    room: {
        type: String, // Assuming room is a String, adjust the type accordingly
        default: 'Default Room',
    },
    people: {
        type: [String], // Assuming people is an array of strings, adjust the type accordingly
        default: [],
    },
});

const ScheduledEvent = mongoose.model('Event', eventSchema);

export default ScheduledEvent
