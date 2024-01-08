import ScheduledEvent from "./index";
import mongoose from 'mongoose';

const ShortTermEvents = ScheduledEvent.discriminator('ShortTermEvents', new mongoose.Schema({}));

module.exports = ShortTermEvents;
