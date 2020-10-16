import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const InputNumber: FunctionComponent<InputNumberProps> = ({
  onChange,
  error,
  ...props
}) => {
  const className = classNames('input', {
    'is-danger': error,
  });

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
    <div>
      <input
        {...props}
        className={className}
        type="number"
        onBlur={handleBlur}
        onChange={onChange}
      />
      {error && <span className="help is-danger">{error}</span>}
      <style jsx>{`
        position: relative;

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

        input + .help {
          border-radius: 2px;
          background: #f14668;
          color: #fff;
          padding: 0.5em 1em;
          width: 100%;
          position: absolute;
          top: 100%;
          transform: translateY(-6px);
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
    </div>
  );
};

export default InputNumber;
