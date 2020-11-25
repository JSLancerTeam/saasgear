import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import SecurityForm from '@/components/Profile/SecurityForm';
import changePasswordQuery from '@/queries/auth/changePassword';

const SecuritySettingSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password must match'),
});

function SecuritySetting({ isActive }) {
  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SecuritySettingSchema),
  });
  const [changePasswordMutation, { error, loading }] = useMutation(changePasswordQuery);

  async function onSubmit(params) {
    const { data } = await changePasswordMutation({ variables: params });
    if (data?.changePassword) {
      toast.success('Change password successfully!')
    }
  }

  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full lg:w-1/2">
        <div className="flex flex-col">
          <SecurityForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            formErrors={formErrors}
            apiError={error?.message}
            isSubmitting={loading}
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
