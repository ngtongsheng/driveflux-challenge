import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { Pricing } from '@driveflux-code-challenge/interfaces';
import { InputNumber } from '@driveflux-code-challenge/ui';
import {
  PricingContext,
  SUCCESS_GET_PRICINGS,
  TOGGLE_READONLY,
  UPDATE_PRICING_FIELD,
  RESET_ALL_PRICINGS,
  START_SAVE_PRICINGS,
  CANCEL_EDIT,
  SUCCESS_SAVE_PRICINGS,
} from '../state/context';

export const Index = () => {
  const [state, dispatch] = useContext(PricingContext);
  const { pricings, readOnly, isSaving } = state;

  const getPricings = useCallback(async () => {
    const { data } = await axios.get<Pricing[]>('/api/pricing');

    dispatch({
      type: SUCCESS_GET_PRICINGS,
      payload: {
        pricings: data,
      },
    });
  }, [dispatch]);

  const handlePricingField = useCallback(
    (id: string, { value, name }: HTMLInputElement) => {
      dispatch({
        type: UPDATE_PRICING_FIELD,
        payload: {
          field: name,
          value,
          id,
        },
      });
    },
    [dispatch]
  );

  const handleToggleReadOnly = useCallback(() => {
    dispatch({
      type: TOGGLE_READONLY,
    });
  }, [dispatch]);

  const handleResetAllPricings = useCallback(() => {
    dispatch({
      type: RESET_ALL_PRICINGS,
    });
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    dispatch({
      type: START_SAVE_PRICINGS,
    });

    try {
      await axios.put('/api/pricing', { pricings });
      dispatch({
        type: SUCCESS_SAVE_PRICINGS,
      });
    } catch (err) {
      dispatch({
        type: CANCEL_EDIT,
      });
    }
  }, [dispatch, pricings]);

  useEffect(() => {
    getPricings();
  }, [getPricings]);

  return (
    <>
      <style jsx>{`
        table.table tr td {
          vertical-align: middle;
        }
      `}</style>
      <div className="columns is-vcentered">
        <div className="column">
          <div className="title is-5 is-uppercase">Pricing</div>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            {readOnly && (
              <button
                className="button is-primary"
                onClick={handleToggleReadOnly}
              >
                Edit
              </button>
            )}
            {!readOnly && (
              <>
                <button
                  disabled={isSaving}
                  className="button is-light"
                  onClick={handleToggleReadOnly}
                >
                  Cancel
                </button>
                <button
                  disabled={isSaving}
                  className="button is-light"
                  onClick={handleResetAllPricings}
                >
                  Clear
                </button>
                <button
                  disabled={isSaving}
                  className="button is-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {!!pricings.length && (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr className="is-uppercase">
              <th>Plan</th>
              <th>Lite</th>
              <th>Standard</th>
              <th>Unlimited</th>
            </tr>
          </thead>
          <tbody>
            {pricings.map(({ id, label, lite, standard, unlimited }) => (
              <tr key={id}>
                <td>{label}</td>
                <td>
                  <InputNumber
                    name="lite"
                    value={lite}
                    readOnly={readOnly}
                    disabled={isSaving}
                    onChange={({ target }) => handlePricingField(id, target)}
                  />
                </td>
                <td>
                  <InputNumber
                    name="standard"
                    value={standard}
                    readOnly={readOnly}
                    disabled={isSaving}
                    onChange={({ target }) => handlePricingField(id, target)}
                  />
                </td>
                <td>
                  <InputNumber
                    name="unlimited"
                    value={unlimited}
                    readOnly={readOnly}
                    disabled={isSaving}
                    onChange={({ target }) => handlePricingField(id, target)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Index;
