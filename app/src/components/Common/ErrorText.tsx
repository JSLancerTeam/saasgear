import React from 'react';
import classNames from 'classnames';

interface Props {
  message?: string;
  position?: string;
  [key: string]: unknown;
}

const ErrorText: React.FC<Props> = ({ message = "", position = "left", ...props }) => (
  <p
    className={classNames('text-[12px] text-red mt-[5px] mb-[7px] block', {
      'text-left': position === 'left',
      'text-center': position === 'center',
      'text-right': position === 'right'
    })}
    {...props}
  >
    {message}
  </p>
)

export default ErrorText;
