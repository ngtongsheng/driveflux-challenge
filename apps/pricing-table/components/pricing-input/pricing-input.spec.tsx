import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { PricingContext, PricingContextProvider } from '../../state/context';
import PricingInput from './pricing-input';

jest.mock('axios');

const setup = () => {
  const Component = () => {
    const [state] = useContext(PricingContext);
    const { pricings } = state;

    return (
      <div>
        {pricings.map(({ id, lite, standard, unlimited }) => {
          return (
            <div key={id}>
              <PricingInput id="test" name="lite" value={lite} />
              <PricingInput id="test" name="standard" value={standard} />
              <PricingInput id="test" name="unlimited" value={unlimited} />
            </div>
          );
        })}
        <div className="state">
          <span id="pricings">{Object.values(pricings[0]).join(',')}</span>
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
            lite: '0',
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
  const inputs = container.querySelectorAll('.input');
  const lite = inputs[0];
  const standard = inputs[1];
  const unlimited = inputs[2];
  const state = container.querySelector('.state');

  return {
    ...utils,
    inputs,
    state,
    lite,
    standard,
    unlimited,
  };
};

afterEach(cleanup);

describe('PricingInput', () => {
  it('should render successfully', () => {
    const { baseElement, inputs } = setup();
    expect(baseElement).toBeTruthy();
    expect(inputs).toMatchSnapshot();
  });

  it('should be able to change standard & unlimited individually', async () => {
    const { standard, unlimited, state } = setup();

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,0,0,0'
    );

    fireEvent.change(standard, { target: { value: '10' } });
    fireEvent.change(unlimited, { target: { value: '10' } });

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,0,10,10'
    );
  });

  it('should be update standard & unlimited when change lite', async () => {
    const { lite, state } = setup();

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,0,0,0'
    );

    fireEvent.change(lite, { target: { value: '10' } });

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,10,20,30'
    );
  });

  it('should not able to set negative number', async () => {
    const { lite, standard, state } = setup();

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,0,0,0'
    );

    fireEvent.change(lite, { target: { value: '10' } });
    fireEvent.change(standard, { target: { value: '-10' } });

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,10,0,30'
    );

    fireEvent.change(lite, { target: { value: '-10' } });

    expect(state.querySelector('#pricings').innerHTML).toEqual(
      'test,test,0,0,0'
    );
  });
});
