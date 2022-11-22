import React from 'react';
import cn from 'classnames';

type ButtonColor = 'primary' | 'default';

type ButtonType = 'button' | 'submit';

type Props = {
  color?: ButtonColor;
  type?: ButtonType;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const Button: React.FC<Props> = ({ color = 'default', type = 'button', className = '', children, ...props }) => (
  <button
    type={type}
    className={cn(`rounded-lg px-5 py-[10.5px] outline-none font-medium text-[16px] leading-[19px] text-center border border-solid border-light-primary cursor-pointer border-light-primary bg-white text-light-primary ${className}`, { 
      '!bg-light-primary': color === 'primary',
      '!text-white': color === 'primary', 
    })}
    {...props}>
    {children}
  </button>
);
export default React.memo(Button);
