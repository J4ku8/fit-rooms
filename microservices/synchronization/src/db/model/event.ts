import mongoose from 'mongoose';
import { EventTypes } from '../../utils/types';

const Schema = mongoose.Schema;

const patternSchema = new mongoose.Schema({
  type: { type: String },
  interval: Number,
  daysOfWeek: [String],
  firstDayOfWeek: {
    type: String,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
});

const rangeSchema = new mongoose.Schema({
  type: { type: String },
  startDate: Date,
  endDate: Date,
});

const recurrenceSchema = new mongoose.Schema({
  pattern: patternSchema,
  range: rangeSchema,
});

const dateSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  timeZone: { type: String, required: true },
});

const attendeeSchema = new mongoose.Schema({
  emailAddress: {
    address: { type: String },
    name: { type: String },
  },
  type: { type: String },
});

const eventSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    contentType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  start: dateSchema,
  end: dateSchema,
  location: {
    displayName: {
      type: String,
      required: true,
    },
  },
  recurrence: recurrenceSchema,
  attendees: [attendeeSchema],
});
const Event = mongoose.model('Event', eventSchema);

export default Event;
