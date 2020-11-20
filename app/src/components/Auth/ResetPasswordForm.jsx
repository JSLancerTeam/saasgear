import React from 'react';
import PropTypes from 'prop-types';

function ResetPasswordForm({ onSubmit, register, errors, apiError }) {
  return apiError ? (
    <h3 className="mt-6 text-base leading-9 font-extrabold text-gray-900 text-center">
      {apiError}
    </h3>
  ) : (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          New password
        </label>
        <input
          id="password"
          name="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors && errors.password && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-3 mt-6">
        <label
          htmlFor="passwordConfirmation"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Re-enter Password
        </label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors && errors.passwordConfirmation && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.passwordConfirmation.message}
          </p>
        )}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  apiError: PropTypes.string,
};

export default ResetPasswordForm;
