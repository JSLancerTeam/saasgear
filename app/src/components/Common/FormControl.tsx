import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const FormControl: React.FC<Props> = ({ className = "", children, ...props }) => (
  <div className={`w-full block ${className}`} {...props}>
    {children}
  </div>
)

export default React.memo(FormControl);
