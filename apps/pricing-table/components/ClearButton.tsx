import React, { useCallback, useContext } from 'react';
import { Button } from '@driveflux-code-challenge/ui';
import { PricingContext, RESET_ALL_PRICINGS } from '../state/context';

export const ClearButton = () => {
  const [, dispatch] = useContext(PricingContext);

  const handleClick = useCallback(() => {
    dispatch({
      type: RESET_ALL_PRICINGS,
    });
  }, [dispatch]);

  return (
    <Button type="white" onClick={handleClick}>
      Clear
    </Button>
  );
};

export default ClearButton;
