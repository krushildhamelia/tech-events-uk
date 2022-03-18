import {
  fetchEventCategory,
  eventCategoryAdapter,
  eventCategoryReducer,
} from './event-category.slice';

describe('eventCategory reducer', () => {
  it('should handle initial state', () => {
    const expected = eventCategoryAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(eventCategoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchEventCategorys', () => {
    let state = eventCategoryReducer(
      undefined,
      fetchEventCategory.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = eventCategoryReducer(
      state,
      fetchEventCategory.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = eventCategoryReducer(
      state,
      fetchEventCategory.rejected(new Error('Uh oh'), null, null)
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
