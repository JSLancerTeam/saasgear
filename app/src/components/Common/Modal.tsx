import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

type Overlay = {
  isOpen: boolean;
}

type Props = {
  isOpen: Overlay["isOpen"];
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<Props> = ({ isOpen, children }) => (
  <div className={cn("fixed top-0 left-0 w-full h-full block bg-[#273259] bg-opacity-[0.42]", { 'hidden': !isOpen })}>
    <div className="fixed bg-white w-[765px] max-w-[70%] h-auto top-1/2 left-1/2 transform_modal rounded-[10px] sm:max-w-[90%]">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
