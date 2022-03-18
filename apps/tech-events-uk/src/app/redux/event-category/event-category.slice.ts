import { APIResponse, Loading } from '@ff/interfaces';
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

export const EVENT_CATEGORY_FEATURE_KEY = 'eventCategory';

export interface EventCategoryState extends EntityState<string> {
  loadingStatus: Loading;
  error: string|undefined|null;
}

export const eventCategoryAdapter = createEntityAdapter<string>({
  selectId: (category) => category,
  sortComparer: (a, b) => a.localeCompare(b),
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
 *   dispatch(fetchEventCategory())
 * }, [dispatch]);
 * ```
 */
export const fetchEventCategory = createAsyncThunk(
  'eventCategory/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getEventCategorys()`;
     * Right now we just return an empty array.
     */
    return fetch(`${environment.eventsAPI}/all-category`)
      .then(result => result.json())
      .then((result: APIResponse<string[]>) => result.data)
  }, {
    condition: (argument, {getState, extra}) => {
      const { eventCategory } = getState() as RootState;    

      if(eventCategory.loadingStatus === 'loaded' || eventCategory.loadingStatus === 'loading') {
        return false;
      }
      return true;
    }
  }
);

export const initialEventCategoryState: EventCategoryState = eventCategoryAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const eventCategorySlice = createSlice({
  name: EVENT_CATEGORY_FEATURE_KEY,
  initialState: initialEventCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventCategory.pending, (state: EventCategoryState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchEventCategory.fulfilled,
        (
          state: EventCategoryState,
          action: PayloadAction<string[]>
        ) => {
          eventCategoryAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchEventCategory.rejected,
        (state: EventCategoryState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const eventCategoryReducer = eventCategorySlice.reducer;

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
 *   dispatch(eventCategoryActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const eventCategoryActions = eventCategorySlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
import { environment } from '../../../environments/environment';
 *
 * // ...
 *
 * const entities = useSelector(selectAllEventCategory);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = eventCategoryAdapter.getSelectors();

export const getEventCategoryState = (rootState: RootState): EventCategoryState => rootState[EVENT_CATEGORY_FEATURE_KEY];

export const selectAllEventCategory = createSelector(
  getEventCategoryState,
  selectAll
);

export const selectEventCategoryEntities = createSelector(
  getEventCategoryState,
  selectEntities
);
