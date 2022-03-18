import { Event } from '@ff/interfaces';
import { Schema, Document, Query } from 'mongoose';

export const EventSchema: Schema = new Schema<Event>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  isVirtual: { type: Boolean, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
});
export interface EventQueryHelpers {
  getCategories(): Query<any, Document<Event>> & EventQueryHelpers;
  getFilteredEvents(selectedCategory: string[], isVirtual: boolean|null): Query<any, Document<Event>> & EventQueryHelpers;
}

EventSchema.query.getCategories = function(): Query<any, Document<Event>> & EventQueryHelpers {
  return this.distinct('category');
}

EventSchema.query.getFilteredEvents = function(selectedCategory: string[], isVirtual: boolean|null): Query<any, Document<Event>> & EventQueryHelpers {
  let result = this.find();
  if (selectedCategory.length > 0) {
    result = result.where('category').in(selectedCategory);
  }
  if (isVirtual !== null) {
    result = result.where('isVirtual').equals(isVirtual);
  }
  return result;
}