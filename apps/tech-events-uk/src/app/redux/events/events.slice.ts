import { APIResponse, Event, Loading } from '@ff/interfaces';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { environment } from '../../../environments/environment';
import { RootState } from '../store';

export const EVENTS_FEATURE_KEY = 'events';

export interface EventsState extends EntityState<Event> {
  loadingStatus: Loading;
  error: string|undefined|null;
  selectedCategory: string[];
  isVirtual: boolean|null;
}

export const eventsAdapter = createEntityAdapter<Event>({
  selectId: (event) => event._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchEvents())
 * }, [dispatch]);
 * ```
 */
export const fetchEvents = createAsyncThunk(
  'events/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getEvents()`;
     * Right now we just return an empty array.
     */
    const events: EventsState = (thunkAPI.getState() as RootState).events;
    return fetch(`${environment.eventsAPI}/all-events`, {
      body: JSON.stringify({ 
        selectedCategory: events.selectedCategory,
        isVirtual: events.isVirtual,
      }),
      method: 'POST',
      headers: { 
        "Content-Type": 'application/json'
      }
    })
      .then(eventsData => eventsData.json())
      .then((eventsData: APIResponse<Event[]>) => eventsData.data);
  }
);

export const initialEventsState: EventsState = eventsAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  selectedCategory: [],
  isVirtual: null,
});

export const eventsSlice = createSlice({
  name: EVENTS_FEATURE_KEY,
  initialState: initialEventsState,
  reducers: {
    removeAll: eventsAdapter.removeAll,
    setSelectedCategory(state, action: PayloadAction<string[]>) {
      state.selectedCategory = action.payload || [];
    },
    setIsVirtual(state, action: PayloadAction<boolean|null>) {
      state.isVirtual = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state: EventsState) => {
        state.loadingStatus = 'loading';
        eventsAdapter.removeAll(state);
      })
      .addCase(
        fetchEvents.fulfilled,
        (state: EventsState, action: PayloadAction<Event[]>) => {
          eventsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchEvents.rejected, (state: EventsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const eventsReducer = eventsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(eventsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const eventsActions = eventsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
import { environment } from '../../environments/environment';
import { RootState } from '../store';
 *
 * // ...
 *
 * const entities = useSelector(selectAllEvents);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = eventsAdapter.getSelectors();

export const getEventsState = (rootState: RootState): EventsState => rootState[EVENTS_FEATURE_KEY];

export const selectAllEvents = createSelector(getEventsState, selectAll);

export const selectEventsEntities = createSelector(
  getEventsState,
  selectEntities
);
