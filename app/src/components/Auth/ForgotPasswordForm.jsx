import React from 'react';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';

function ForgotPasswordForm({ onSubmit, register, errors }) {
  return (
    <form className="mt-5" onSubmit={onSubmit}>
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
        {errors && errors.email && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
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
          Send
        </button>
        <Link to="/auth/signin" className="mt-3 block text-blue-500">
          Go back to login
        </Link>
      </div>
    </form>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
};

export default ForgotPasswordForm;
