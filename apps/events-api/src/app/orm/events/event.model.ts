import { model, Model } from 'mongoose';
import { EventSchema } from './event.schema';

export const EventModel: Model<Event> = model<Event>('Event', EventSchema);