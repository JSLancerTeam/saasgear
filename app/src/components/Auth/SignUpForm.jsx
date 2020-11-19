import React from 'react';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';

function SignUpForm({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmitting,
  submitText = 'Submit',
}) {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors && formErrors.name && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.name.message}
          </p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-3 mt-6">
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
        {formErrors && formErrors.email && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.email.message}
          </p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-3 mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors && formErrors.password && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.password.message}
          </p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-3 mt-6">
        <label
          htmlFor="confirm_password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirm_password"
          name="passwordConfirmation"
          type="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors && formErrors.passwordConfirmation && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.passwordConfirmation.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            ref={register}
          />
          <label
            htmlFor="agreement"
            className="ml-2 block text-sm leading-5 text-gray-900"
          >
            I agree with the Privacy Policy
          </label>
        </div>

        <div className="text-sm leading-5">
          <Link
            to="/auth/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Already account?
          </Link>
        </div>
      </div>

      {formErrors && formErrors.agreement && (
        <p className="text-red-500 text-xs italic mt-1">
          {formErrors.agreement.message}
        </p>
      )}

      {apiError && (
        <p className="text-red-500 text-xs italic mt-1 text-center">
          {apiError}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {isSubmitting ? 'Please wait' : submitText}
        </button>
      </div>
    </form>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  apiError: PropsType.string,
  isSubmitting: PropsType.bool.isRequired,
  submitText: PropsType.string,
};

export default SignUpForm;
