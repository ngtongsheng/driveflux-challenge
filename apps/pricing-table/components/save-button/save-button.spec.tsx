import React, { useContext } from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { PricingContext, PricingContextProvider } from '../../state/context';
import SaveButton from './save-button';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setup = () => {
  const Component = () => {
    const [state] = useContext(PricingContext);
    const { snapshot, readOnly, isSaving, pricings } = state;

    return (
      <div>
        <SaveButton />
        <div className="state">
          <span id="isSaving">{String(isSaving)}</span>
          <span id="readOnly">{String(readOnly)}</span>
          <span id="snapshot">
            {Object.values(snapshot[0] || {}).join(',')}
          </span>
          <span id="pricings">
            {Object.values(pricings[0] || {}).join(',')}
          </span>
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
            lite: '2',
            standard: '4',
            unlimited: '6',
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

describe('SaveButton', () => {
  it('should render successfully', () => {
    const { baseElement, button } = setup();
    expect(baseElement).toBeTruthy();
    expect(button).toMatchSnapshot();
  });

  it('should be successfully saved', async () => {
    const { button, state } = setup();

    mockedAxios.put.mockResolvedValue({ success: true });

    expect(state.querySelector('#readOnly').innerHTML).toEqual('false');
    expect(state.querySelector('#isSaving').innerHTML).toEqual('false');
    expect(state.querySelector('#snapshot').innerHTML).toEqual(
      'test,test,0,0,0'
    );

    fireEvent.click(button);

    expect(state.querySelector('#isSaving').innerHTML).toEqual('true');

    await waitFor(() => {
      expect(state.querySelector('#isSaving').innerHTML).toEqual('false');
      expect(state.querySelector('#readOnly').innerHTML).toEqual('true');
      expect(state.querySelector('#snapshot').innerHTML).toEqual('');
    });
  });

  it('should be reset edit mode if error', async () => {
    const { button, state } = setup();

    mockedAxios.put.mockRejectedValue({});

    expect(state.querySelector('#readOnly').innerHTML).toEqual('false');
    expect(state.querySelector('#isSaving').innerHTML).toEqual('false');
    expect(state.querySelector('#snapshot').innerHTML).toEqual(
      'test,test,0,0,0'
    );

    fireEvent.click(button);

    expect(state.querySelector('#isSaving').innerHTML).toEqual('true');

    await waitFor(() => {
      expect(state.querySelector('#isSaving').innerHTML).toEqual('false');
      expect(state.querySelector('#readOnly').innerHTML).toEqual('true');
      expect(state.querySelector('#snapshot').innerHTML).toEqual('');
      expect(state.querySelector('#pricings').innerHTML).toEqual(
        'test,test,0,0,0'
      );
    });
  });
});
