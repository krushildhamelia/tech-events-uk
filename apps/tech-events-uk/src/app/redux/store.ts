import { EVENTS_FEATURE_KEY, eventsReducer } from '../../app/redux/events/events.slice';
import { environment } from '../../environments/environment';
import { configureStore } from '@reduxjs/toolkit';
import { eventCategoryReducer, EVENT_CATEGORY_FEATURE_KEY } from './event-category/event-category.slice';

export const store = configureStore({
  reducer: { 
    [EVENTS_FEATURE_KEY]: eventsReducer,
    [EVENT_CATEGORY_FEATURE_KEY]: eventCategoryReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: !environment.production,
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>; 