import React from "react";
import styled from "styled-components";
import { COLORS } from "@/constants/style";

const CheckMark = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: ${COLORS.WHITE};
  &::after {
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: 1px solid ${COLORS.WHITE};
    border-width: 0 2px 2.3px 0;
    transform: rotate(45deg);
  }
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${CheckMark} {
    background-color: ${COLORS.SEMI_PRIMARY};
  }
  &:checked ~ ${CheckMark}::after {
    display: block;
  }
`;
type InputType = "checkbox" | "radio";
type Props = {
  type?: InputType,
  defaultChecked?: boolean,
  placeholder?: string,
  id: string,
  [x: string]: unknown,
};
const Checkbox = React.forwardRef(
  (
    { type, defaultChecked, placeholder, id, ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <span className="relative w-6 h-6 inline-block rounded overflow-hidden border-[1px] border-solid border-light_white_gray">
      {" "}
      <Input
        type={type}
        defaultChecked={defaultChecked}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
      />{" "}
      <CheckMark
        htmlFor={id}
        className='absolute top-0 left-0 w-6 h-6 text-white after:content-[""] after:absolute after:hidden after:left-2 after:top-[3px] after:w-[5px] after:h-2.5 after:border-[1px] after:border-solid after:border-white after:border-t-0 after:border-r-2 after:border-b-[2.3] after:border-l-0'
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
