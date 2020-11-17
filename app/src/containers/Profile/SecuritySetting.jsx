import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SecurityForm from '@/components/Profile/SecurityForm';

const SecuritySettingSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password must match'),
});

function SecuritySetting({ isActive }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SecuritySettingSchema),
  });

  function onSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full lg:w-1/2">
        <div className="flex flex-col">
          <SecurityForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

SecuritySetting.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default SecuritySetting;
