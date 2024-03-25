import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dateSchema = new mongoose.Schema({
  dateTime: { type: String, required: true },
  timeZone: { type: String, required: true },
});

// Define a schema for an 'Event' collection
const conflictSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  start: dateSchema,
  end: dateSchema,
  kosEventOrganiser: {
    type: String,
    required: false,
  },
  msEventOrganiser: {
    type: String,
    required: false,
  },
});

const Conflict = mongoose.model('Conflict', conflictSchema);

export default Conflict;
