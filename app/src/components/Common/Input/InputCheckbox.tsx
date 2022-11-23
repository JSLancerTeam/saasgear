import React from "react";

type InputType = "checkbox" | "radio";
type Props = {
  type?: InputType;
  defaultChecked?: boolean;
  placeholder?: string;
  id: string;
  className: string;
  [x: string]: unknown;
};
const Checkbox = React.forwardRef(
  (
    { type, defaultChecked, placeholder, id, className, ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <span className="relative w-6 h-6 inline-block rounded overflow-hidden border-[1px] border-solid border-light-white-gray">
      {" "}
      <input
        type={type}
        defaultChecked={defaultChecked}
        placeholder={placeholder}
        className={`absolute opacity-0 cursor-pointer h-0 w-0 [&:checked~.checkmark]:bg-semi-primary [&:checked~.checkmark::after]:block ${className}`}
        {...props}
        ref={ref}
        id={id}
      />{" "}
      <label
        htmlFor={id}
        className="checkmark absolute top-0 left-0 w-6 h-6 bg-white after:content-[''] after:absolute after:hidden after:left-2 after:top-[3px] after:w-[5px] after:h-2.5 after:border-[1px] after:border-solid after:border-white after:border-t-0 after:border-r-2 after:border-b-[2.3px] after:border-l-0 after:rotate-45"
      />{" "}
    </span>
  )
);
Checkbox.displayName = "Input";
Checkbox.defaultProps = {
  defaultChecked: false,
  type: "text",
  placeholder: null,
};
export default React.memo(Checkbox);
