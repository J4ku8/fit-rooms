import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a schema for an 'Event' collection
const semesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
});

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester;
