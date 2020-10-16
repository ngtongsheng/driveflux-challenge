import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { PricingContext, PricingContextProvider } from '../../state/context';
import EditButton from './edit-button';

const setup = () => {
  const Component = () => {
    const [state] = useContext(PricingContext);
    const { snapshot, readOnly } = state;

    return (
      <div>
        <EditButton />
        <div className="state">
          <span id="readOnly">{String(readOnly)}</span>
          <span id="snapshot">{String(snapshot.length)}</span>
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

describe('EditButton', () => {
  it('should render successfully', () => {
    const { baseElement } = setup();
    expect(baseElement).toBeTruthy();
  });

  it('should be able to start edit mode', async () => {
    const { button, state } = setup();

    expect(state.querySelector('#readOnly').innerHTML).toEqual('true');
    expect(state.querySelector('#snapshot').innerHTML).toEqual('0');

    fireEvent.click(button);

    expect(state.querySelector('#readOnly').innerHTML).toEqual('false');
    expect(state.querySelector('#snapshot').innerHTML).toEqual('1');
  });
});
