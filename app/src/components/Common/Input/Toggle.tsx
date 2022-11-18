import React, { forwardRef } from 'react';

type Props = {
  defaultChecked: boolean;
  label: string;
  className?: string;
  [x: string]: unknown
}

const Toggle = forwardRef(({ defaultChecked, label, className, ...props }: Props, ref: React.Ref<HTMLInputElement>) => (
  <div>
    {label && <div className="font-bold text-[12px] leading-[15px] opacity-90 text-white_blue mb-[11px] uppercase sm:mt-[11px]">{label}</div>}
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      className={`hidden [&:checked+label]:bg-green [&:checked+label::after]:left-[calc(100%_-_2px)] [&:checked+label::after]:translate-x-[-100%] ${className}`}
      {...props}
      ref={ref}
      id="switch"
    />
    <label htmlFor="switch" className="cursor-pointer indent-[-9999px] w-[46px] h-6 bg-gray block rounded-lg relative active:after:w-[25px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-[20px] after:h-[20px] after:bg-white after:rounded-md after:duration-300" />
  </div>
));

export default React.memo(Toggle);

