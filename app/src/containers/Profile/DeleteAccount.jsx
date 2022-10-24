import React from 'react';
import Portal from '@/components/Common/Portal';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DeleteAccountModal from '@/components/Profile/DeleteAccountModal';
import deleteAccountQuery from '@/queries/user/deleteAccount';

export default function DeleteAccount({ closeModal, isOpen }) {
  const {
    data: { email },
  } = useSelector((state) => state.user);
  const history = useHistory();
  const AccountSettingSchema = yup.object().shape({
    email: yup
      .string()
      .required('common.validation.require-email')
      .email('common.validation.valid-email')
      .matches(email),
  });
  const { register, handleSubmit, errors, watch, formState } = useForm({
    resolver: yupResolver(AccountSettingSchema),
    defaultValues: { email: '' },
    mode: 'all',
  });
  const watchEmail = watch('email');
  const [deleteAccountMutation] = useMutation(deleteAccountQuery);

  async function onSubmit() {
    const { data } = await deleteAccountMutation();
    if (data?.deleteAccount) {
      history.replace('/auth/signin');
    }
  }

  return (
    <Portal id="delete-account">
      <DeleteAccountModal
        closeModal={closeModal}
        isOpen={isOpen}
        register={register}
        errors={errors}
        email={email}
        isValid={formState.isValid && watchEmail !== ''}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Portal>
  );
}

DeleteAccount.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};
