import React from 'react';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import TheLockSvg from '@/assets/images/svg/the-lock.svg';

function ForgotPasswordForm({
  onSubmit,
  register,
  errors,
  isSubmitted,
  isSubmitting,
  apiError,
}) {
  return !isSubmitted ? (
    <form className="mt-5" onSubmit={onSubmit}>
      <h3 className="mt-6 text-base leading-9 font-extrabold text-gray-900">
        Please enter your email address that you used to register. We &apos;ll
        send you an email with a link to reset your password
      </h3>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.email && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <img
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              src={TheLockSvg}
              alt="the-lock"
            />
          </span>
          {isSubmitting ? 'Please wait' : 'Send'}
        </button>
        {apiError && (
          <p className="text-red-500 text-xs italic mt-1">{apiError}</p>
        )}
        <Link to="/auth/signin" className="mt-3 block text-blue-500">
          Go back to login
        </Link>
      </div>
    </form>
  ) : (
    <div className="rounded shadow px-4 py-2 mt-6 bg-gray-200">
      <h3 className="text-base leading-9 font-extrabold text-gray-900">
        We&apos;ve sent you an email with a link to reset password. Please check
        your email so create new password
      </h3>
    </div>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  isSubmitted: PropsType.bool.isRequired,
  isSubmitting: PropsType.bool.isRequired,
  errors: PropsType.object,
  apiError: PropsType.string,
};

export default ForgotPasswordForm;
