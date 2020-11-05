import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignUpForm from 'components/Auth/SignUpForm';

const SignUpSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  agreement: yup
    .bool()
    .oneOf([true], 'You must agree with our Privacy Policy')
    .required(),
});

function SignUp() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  function onSubmit(data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign up to connect with us
          </h2>
        </div>
        <SignUpForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default SignUp;
