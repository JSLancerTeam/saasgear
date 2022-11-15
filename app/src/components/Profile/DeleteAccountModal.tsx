import React from 'react';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';

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
      <ModalHeader>{t('Profile.label.delete')}</ModalHeader>
      <ModalContent>
        <DeleteText>
          {t('Profile.text.delete_modal')}
        </DeleteText>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <NoteLabel>
              <Trans
                components={[<EmailText></EmailText>]}
                values={{ email }}
              >
                {t('Profile.text.please_enter')}
              </Trans>
            </NoteLabel>
            <Input type="email" name="email" ref={register} />
            {errors?.email?.message && <ErrorText message={String(t(errors.email.message))} />}
          </FormGroup>
        </Form>
      </ModalContent>
      <ModalFooter>
        <Button onClick={closeModal}>{t('Common.text.no')}</Button>
        <Button type="submit" color="primary" disabled={!isValid}>
          {t('Common.text.delete')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default DeleteAccountModal;