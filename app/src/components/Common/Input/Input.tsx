import React from 'react';

type InputType = "text" | "number" | "email" | "tel" | "password";

type Props = {
  type?: InputType
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  [x: string]: unknown;
}

const Input = React.forwardRef(
  ({ type = 'text', defaultValue = '', placeholder = '', className, ...props }: Props, ref: React.Ref<HTMLInputElement>) => (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`bg-light_gray border-[1px] border-solid border-white_blue rounded-[10px] px-[10px] py-[10.5px] text-[16px] leading-[19px] text-white_gray w-full focus:border-light_primary focus:outline-none active:border-light_primary active:outline-none placeholder:text-[16px] placeholder:leading-[19px] placeholder:text-light_grey ${className}`}
      {...props}
      ref={ref}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
