import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { COLORS, mobileQuery } from '@/constants/style';

type Overlay = {
  isOpen: boolean;
}

const Overlay = styled.div<Overlay>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(39, 50, 89, 0.42);
  display: none;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Wrapper = styled.div`
  position: fixed;
  background: white;
  width: 765px;
  max-width: 70%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  ${mobileQuery} {
    max-width: 90%;
  }
`;

export const ModalHeader = styled.h3`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  color: ${COLORS.SAPPHIRE_BLUE};
  padding: 24px 24px 0;
`;

export const ModalContent = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(124, 136, 177, 0.16);
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px;

  button + button {
    margin-left: 16px;
  }
`;

type Props = {
  isOpen: Overlay["isOpen"];
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<Props> = ({ isOpen, children }) => (
  <Overlay isOpen={isOpen}>
    <Wrapper>{children}</Wrapper>
  </Overlay>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
