import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from 'react';

export const InputNumber: FunctionComponent<InputHTMLAttributes<
  HTMLInputElement
>> = ({ onChange, ...props }) => {
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
        input {
          height: 3em;
          box-shadow: none;
          border-radius: 2px;
          border-color: rgb(202, 202, 202);
          color: rgb(88, 88, 88);
          outline: none;
          transition: all 0.3s;
          padding: 0.5em 1em;
        }

        input[readOnly] {
          border-color: transparent;
          outline: none;
          background: none;
        }

        input[readOnly]:hover,
        input[readOnly]:active,
        input[readOnly]:focus {
          border-color: transparent;
          cursor: default;
        }

        input:hover,
        input:active,
        input:focus {
          border-color: rgb(88, 88, 88);
          box-shadow: none;
        }
      `}</style>
    </>
  );
};

export default InputNumber;
