import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { PricingContext, PricingContextProvider } from '../../state/context';
import ClearButton from './clear-button';

const setup = () => {
  const Component = () => {
    const [state] = useContext(PricingContext);
    const { pricings } = state;

    return (
      <div>
        <ClearButton />
        <div className="state">
          <span id="pricings">
            {String(pricings[0].lite)},{String(pricings[0].standard)},
            {String(pricings[0].unlimited)}
          </span>
        </div>
      </div>
    );
  };

  const utils = render(
    <PricingContextProvider
      overrideState={{
        pricings: [
          {
            id: 'test',
            label: 'test',
            lite: '2',
            standard: '4',
            unlimited: '6',
          },
        ],
      }}
    >
      <Component />
    </PricingContextProvider>
  );
  const { container } = utils;
  const button = container.querySelector('.button');
  const state = container.querySelector('.state');

  return {
    ...utils,
    button,
    state,
  };
};

afterEach(cleanup);

describe('ClearButton', () => {
  it('should render successfully', () => {
    const { baseElement } = setup();
    expect(baseElement).toBeTruthy();
  });

  it('should be able to clear all pricing fields', async () => {
    const { button, state } = setup();

    expect(state.querySelector('#pricings').innerHTML).toEqual('2,4,6');

    fireEvent.click(button);

    expect(state.querySelector('#pricings').innerHTML).toEqual('0,0,0');
  });
});
