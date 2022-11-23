import React from 'react';
import classNames from 'classnames';

type BadgeWrapper = {
  type: 'success' | 'error' | 'info';
}

type Props = {
  type: BadgeWrapper["type"];
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({ children, type = 'success' }) => <div
  className={classNames('p-[15px] text-center block my-[10px] mx-0 rounded-lg text-white', {
    'bg-red': type === 'error',
    'bg-green': type === 'success'
  })}>{children}</div>;
export default React.memo(Badge);
