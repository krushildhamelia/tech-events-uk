import { fetchEvents, eventsAdapter, eventsReducer } from './events.slice';
import { Event } from '@ff/interfaces';

export const getEvent = (event: Partial<Event> = {}) => {
  return {
    _id: "1", 
    address: "dummy address",
    category: "AI",
    title: "Title",
    date: new Date().toISOString(),
    description: "Description",
    isVirtual: false,
    ...event
  }
}

describe('events reducer', () => {
  it('should handle initial state', () => {
    const expected = eventsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(eventsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchEventss', () => {
    let state = eventsReducer(undefined, fetchEvents.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = eventsReducer(
      state,
      fetchEvents.fulfilled([getEvent()], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = eventsReducer(
      state,
      fetchEvents.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
