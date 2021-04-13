import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '@/constants/style';
import Modal, { ModalHeader, ModalContent, ModalFooter } from '../Common/Modal';
import Button from '../Common/Button';
import FormGroupLabel from '../Common/FormGroupLabel';
import FormGroup from '../Common/FormGroup';
import Input from '../Common/Input/Input';
import ErrorText from '../Common/ErrorText';

const DeleteText = styled.p`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.WHITE_GRAY};
`;

const Form = styled.form`
  margin-top: 24px;
`;

const EmailText = styled.label`
  color: ${COLORS.SAPPHIRE_BLUE};
  font-weight: bold;
`;

export default function DeleteAccountModal({
  closeModal,
  isOpen,
  onSubmit,
  email,
  register,
  errors,
  isValid,
}) {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Delete Account</ModalHeader>
      <ModalContent>
        <DeleteText>
          Are you sure you want to delete your account? All of your data will be
          permanently removed. This action cannot be undone.
        </DeleteText>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <FormGroupLabel>
              Please enter <EmailText>{email}</EmailText> to confirm
            </FormGroupLabel>
            <Input type="email" name="email" ref={register} />
            {errors?.email && <ErrorText message={errors.email.message} />}
          </FormGroup>
        </Form>
      </ModalContent>
      <ModalFooter>
        <Button onClick={closeModal}>No</Button>
        <Button type="submit" color="primary" disabled={!isValid}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

DeleteAccountModal.propTypes = {
  closeModal: PropTypes.func,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  email: PropTypes.string,
  isValid: PropTypes.bool,
};
