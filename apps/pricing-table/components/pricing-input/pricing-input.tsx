import React, { FunctionComponent, useCallback, useContext } from 'react';
import { InputNumber, InputNumberProps } from '@driveflux-code-challenge/ui';
import { PricingContext, UPDATE_PRICING_FIELD } from '../../state/context';

export const PricingInput: FunctionComponent<InputNumberProps> = ({
  id,
  value,
  name,
  ...props
}) => {
  const [state, dispatch] = useContext(PricingContext);
  const { readOnly, isSaving } = state;

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

  return (
    <InputNumber
      {...props}
      name={name}
      value={value}
      readOnly={readOnly}
      disabled={isSaving}
      onChange={({ target }) => handlePricingField(id, target)}
    />
  );
};

export default PricingInput;
