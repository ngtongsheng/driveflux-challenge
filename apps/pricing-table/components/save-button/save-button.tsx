import React, { useCallback, useContext } from 'react';
import { Button } from '@driveflux-code-challenge/ui';
import {
  CANCEL_EDIT,
  PricingContext,
  START_SAVE_PRICINGS,
  SUCCESS_SAVE_PRICINGS,
} from '../../state/context';
import axios from 'axios';

export const SaveButton = () => {
  const [state, dispatch] = useContext(PricingContext);
  const { pricings } = state;

  const handleClick = useCallback(async () => {
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

  return <Button onClick={handleClick}>Save</Button>;
};

export default SaveButton;
