import { render } from '@testing-library/react';

import InterestedEvents from './interested-events';

describe('InterestedEvents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InterestedEvents />);
    expect(baseElement).toBeTruthy();
  });
});
