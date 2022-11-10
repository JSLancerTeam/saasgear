import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from "@/typeReactHookForm";
import { COLORS, mobileQuery } from '@/constants/style';
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

const NoteLabel = styled(FormGroupLabel)`
  ${mobileQuery} {
    font-size: 11px;
  }
`;

type Props = ReactHookFormType & {
  closeModal?: () => void;
  isOpen: boolean;
  email?: string | null;
  isValid?: boolean;
}

const DeleteAccountModal: React.FC<Props> = ({
  closeModal,
  isOpen,
  onSubmit,
  email,
  register,
  errors,
  isValid,
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{t('profile.label.delete')}</ModalHeader>
      <ModalContent>
        <DeleteText>
          {t('profile.text.delete-modal')}
        </DeleteText>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <NoteLabel>
              {t('profile.text.please-enter')} <EmailText>{email}</EmailText> {t('profile.text.to-confirm')}
            </NoteLabel>
            <Input type="email" name="email" ref={register} />
            {errors?.email && <ErrorText message={t(`${errors.email.message}`)} />}
          </FormGroup>
        </Form>
      </ModalContent>
      <ModalFooter>
        <Button onClick={closeModal}>{t('common.text.no')}</Button>
        <Button type="submit" color="primary" disabled={!isValid}>
          {t('common.text.delete')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default DeleteAccountModal;