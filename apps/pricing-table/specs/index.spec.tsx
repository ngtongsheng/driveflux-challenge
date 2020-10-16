import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';
import { PricingContextProvider } from '../state/context';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PricingContextProvider
        overrideState={{
          pricings: [
            {
              id: 'test',
              label: 'test',
              lite: '0',
              standard: '0',
              unlimited: '0',
            },
          ],
        }}
      >
        <Index />
      </PricingContextProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
