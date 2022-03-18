import { render } from '@testing-library/react';

import EventFilter from './event-filter';

describe('EventFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventFilter />);
    expect(baseElement).toBeTruthy();
  });
});
