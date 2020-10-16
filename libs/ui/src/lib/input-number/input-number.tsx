import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from 'react';

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  isEditable?: boolean;
}

export const InputNumber: FunctionComponent<InputNumberProps> = ({
  isEditable = true,
  onChange,
  ...props
}) => {
  const handleBlur = useCallback(
    (event) => {
      const { target } = event;
      const { value, name } = target;

      if (!value) {
        onChange({
          ...event,
          target: {
            ...target,
            name,
            value: '0',
          },
        });

        return;
      }
    },
    [onChange]
  );
  return (
    <>
      <input
        {...props}
        className="input"
        type="number"
        onBlur={handleBlur}
        onChange={onChange}
      />
      <style jsx>{`
        input[readOnly] {
          border-color: transparent;
          outline: none;
          background: none;
        }

        input[readOnly]:active,
        input[readOnly]:focus {
          border-color: #dbdbdb;
        }
      `}</style>
    </>
  );
};

export default InputNumber;