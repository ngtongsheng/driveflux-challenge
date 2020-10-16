import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

type ButtonTypes = 'dark' | 'white';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes;
}

export const Button: FunctionComponent<ButtonProps> = ({
  type = 'dark',
  children,
  ...props
}) => {
  const className = classNames('button', 'is-dark', {
    'is-outlined': type === 'white',
  });

  return (
    <>
      <button {...props} className={className}>
        {children}
      </button>
      <style jsx>{`
        transition: all 0.3s;
        border-radius: 0px;
        padding: 2em 3em;
        text-transform: uppercase;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;
        font-size: 10px;
        letter-spacing: 3px;
        min-width: 12em;
      `}</style>
    </>
  );
};

export default Button;
