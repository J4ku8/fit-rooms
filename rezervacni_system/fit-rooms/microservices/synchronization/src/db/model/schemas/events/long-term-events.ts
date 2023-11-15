import ScheduledEvent from "./index";

import mongoose from 'mongoose';

const LongTermEvents = ScheduledEvent.discriminator('LongTermEvents', new mongoose.Schema({}));

module.exports = LongTermEvents;
