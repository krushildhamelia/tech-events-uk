import { model, Model } from 'mongoose';
import { EventQueryHelpers, EventSchema } from './event.schema';

export const EventModel = model<Event, Model<Event, EventQueryHelpers>>('Event', EventSchema);