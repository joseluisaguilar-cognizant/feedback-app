import { FunctionComponent, ReactNode } from 'react';

interface IButton {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  version?: 'primary' | 'secondary';
  isDisabled?: boolean;
}

const Button: FunctionComponent<IButton> = ({
  children,
  version = 'primary',
  type = 'button',
  isDisabled = false,
}) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

export default Button;
