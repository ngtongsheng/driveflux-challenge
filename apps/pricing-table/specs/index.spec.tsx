import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';
import { PricingContextProvider } from '../state/context';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PricingContextProvider>
        <Index />
      </PricingContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
