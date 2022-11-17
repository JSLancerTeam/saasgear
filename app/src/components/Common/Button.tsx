import React from 'react';
import cn from 'classnames';

// const ButtonWrapper = styled.button`
//   background: ${COLORS.LIGHT_PRIMARY};
//   border-radius: 8px;
//   padding: 10.5px 20px;
//   outline: none;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 19px;
//   text-align: center;
//   border: 1px solid ${COLORS.LIGHT_PRIMARY};
//   cursor: pointer;
//   &:focus {
//     outline: none;
//   }
//   ${({ color }) => {
//     switch (color) {
//       case 'primary': {
//         return css`
//           background: ${COLORS.LIGHT_PRIMARY};
//           border-radius: 8px;
//           color: #fff;
//         `;
//       }
//       default: {
//         return css`
//           border-color: ${COLORS.LIGHT_PRIMARY};
//           background: #fff;
//           color: ${COLORS.LIGHT_PRIMARY};
//         `;
//       }
//     }
//   }}
// `;

type ButtonColor = 'primary' | 'default';

type ButtonType = 'button' | 'submit';

type Props = {
  color?: ButtonColor;
  type?: ButtonType;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const Button: React.FC<Props> = ({ color = 'default', type = 'button', className = '', children, ...props }) => (
  <button
    type={type}
    className={cn(`rounded-lg px-5 py-[10.5px] outline-none font-medium text-[16px] leading-[19px] text-center border border-solid border-light_primary cursor-pointer border-light_primary bg-white text-light_primary ${className}`, { 
      '!bg-light_primary': color === 'primary',
      '!text-white': color === 'primary', 
    })}
    {...props}>
    {children}
  </button>
);
export default React.memo(Button);
