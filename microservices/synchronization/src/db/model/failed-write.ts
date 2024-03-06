const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const failedWriteSchema = new Schema({
  ids: {
    type: [String],
    required: true,
  },
});

const FailedWrite = mongoose.model('FailedWrite', failedWriteSchema);

export default FailedWrite;
