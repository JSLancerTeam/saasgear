import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AccountForm from '@/components/Profile/AccountForm';

const AccountSettingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Email invalid'),
});

function AccountSetting({ isActive, user }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AccountSettingSchema),
    defaultValues: user,
  });

  function onSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full lg:w-1/2">
        <div className="flex flex-col">
          <AccountForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

AccountSetting.propTypes = {
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default AccountSetting;
