import React from 'react';
import PropsType from 'prop-types';

function AccountForm({ onSubmit, register, errors }) {
  return (
    <form className="form flex flex-wrap w-full" onSubmit={onSubmit}>
      <div className="w-full">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.firstName && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Last name
        </label>
        <input
          id="lastName"
          name="lastName"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.lastName && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
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
      <div className="w-full mt-4">
        <label
          htmlFor="company"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.company && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.company.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <label
          htmlFor="position"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Position
        </label>
        <input
          id="position"
          name="position"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.position && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.position.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded py-2 px-4 mt-4"
      >
        Submit
      </button>
    </form>
  );
}

AccountForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
};

export default AccountForm;
