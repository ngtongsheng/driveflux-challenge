import React, { useCallback, useContext } from 'react';
import { Button } from '@driveflux-code-challenge/ui';
import { PricingContext, START_EDIT } from '../../state/context';

export const EditButton = () => {
  const [, dispatch] = useContext(PricingContext);

  const handleClick = useCallback(() => {
    dispatch({
      type: START_EDIT,
    });
  }, [dispatch]);

  return <Button onClick={handleClick}>Edit</Button>;
};

export default EditButton;
