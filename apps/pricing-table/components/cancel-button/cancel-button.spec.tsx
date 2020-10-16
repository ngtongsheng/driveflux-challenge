import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { PricingContext, PricingContextProvider } from '../../state/context';
import CancelButton from './cancel-button';

const setup = () => {
  const Component = () => {
    const [state] = useContext(PricingContext);
    const { readOnly, pricings } = state;

    return (
      <div>
        <CancelButton />
        <div className="state">
          <span id="readOnly">{String(readOnly)}</span>
          <span id="pricings">{String(pricings[0].lite)}</span>
        </div>
      </div>
    );
  };

  const utils = render(
    <PricingContextProvider
      overrideState={{
        snapshot: [
          {
            id: 'test',
            label: 'test',
            lite: '0',
            standard: '0',
            unlimited: '0',
          },
        ],
        pricings: [
          {
            id: 'test',
            label: 'test',
            lite: '100',
            standard: '0',
            unlimited: '0',
          },
        ],
        readOnly: false,
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

describe('CancelButton', () => {
  it('should render successfully', () => {
    const { baseElement, button } = setup();
    expect(baseElement).toBeTruthy();
    expect(button).toMatchSnapshot();
  });

  it('should be able to cancel edit mode', async () => {
    const { button, state } = setup();

    expect(state.querySelector('#readOnly').innerHTML).toEqual('false');
    expect(state.querySelector('#pricings').innerHTML).toEqual('100');

    fireEvent.click(button);

    expect(state.querySelector('#readOnly').innerHTML).toEqual('true');
    expect(state.querySelector('#pricings').innerHTML).toEqual('0');
  });
});
