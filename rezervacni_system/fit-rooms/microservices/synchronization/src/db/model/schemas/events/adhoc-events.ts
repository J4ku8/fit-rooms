import ScheduledEvent from "./index";
import mongoose from 'mongoose';

const AdhocEvents = ScheduledEvent.discriminator('AdhocEvents', new mongoose.Schema({}));

module.exports = AdhocEvents;
