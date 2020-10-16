import React, { useCallback, useContext } from 'react';
import { Button } from '@driveflux-code-challenge/ui';
import { PricingContext, CANCEL_EDIT } from '../../state/context';

export const CancelButton = () => {
  const [, dispatch] = useContext(PricingContext);

  const handleClick = useCallback(() => {
    dispatch({
      type: CANCEL_EDIT,
    });
  }, [dispatch]);

  return (
    <Button type="white" onClick={handleClick}>
      Cancel
    </Button>
  );
};

export default CancelButton;
