import React from 'react';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';

function SignInForm({ onSubmit, register, errors }) {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors && errors.username && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.username.message}
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
          type="password"
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
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember"
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            ref={register}
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm leading-5 text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm leading-5">
          <Link
            to="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot your password?
          </Link>
        </div>
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
          Sign up
        </button>
      </div>
    </form>
  );
}

SignInForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
};

export default SignInForm;
