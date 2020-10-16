import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { Pricing } from '@driveflux-code-challenge/interfaces';
import { Table } from '@driveflux-code-challenge/ui';
import { PricingContext, SUCCESS_GET_PRICINGS } from '../state/context';
import SaveButton from '../components/SaveButton';
import EditButton from '../components/EditButton';
import CancelButton from '../components/CancelButton';
import ClearButton from '../components/ClearButton';
import PricingInput from '../components/PricingInput';

export const Index = () => {
  const [state, dispatch] = useContext(PricingContext);
  const { pricings, readOnly } = state;

  const getPricings = useCallback(async () => {
    const { data } = await axios.get<Pricing[]>('/api/pricing');

    dispatch({
      type: SUCCESS_GET_PRICINGS,
      payload: {
        pricings: data,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    getPricings();
  }, [getPricings]);

  return (
    <>
      <div className="columns is-vcentered">
        <div className="column">
          <div className="title is-4 is-uppercase">Pricing</div>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            {readOnly && <EditButton />}
            {!readOnly && <CancelButton />}
            {!readOnly && <ClearButton />}
            {!readOnly && <SaveButton />}
          </div>
        </div>
      </div>
      {!!pricings.length && (
        <Table
          thead={
            <tr className="is-uppercase">
              <th>Plan</th>
              <th>Lite</th>
              <th>Standard</th>
              <th>Unlimited</th>
            </tr>
          }
        >
          {pricings.map(({ id, label, lite, standard, unlimited }) => (
            <tr key={id}>
              <td>{label}</td>
              <td>
                <PricingInput id={id} name="lite" value={lite} />
              </td>
              <td>
                <PricingInput id={id} name="standard" value={standard} />
              </td>
              <td>
                <PricingInput id={id} name="unlimited" value={unlimited} />
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
};

export default Index;
