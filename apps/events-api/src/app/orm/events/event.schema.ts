import { Event } from '@ff/interfaces';
import { Schema } from 'mongoose';

export const EventSchema: Schema = new Schema<Event>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  isVirtual: { type: Boolean, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
});
