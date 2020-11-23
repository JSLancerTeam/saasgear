import React from 'react';
import PropsType from 'prop-types';

function SecurityForm({ onSubmit, register, errors }) {
  return (
    <form className="form flex flex-wrap w-full" onSubmit={onSubmit}>
      <div className="w-full">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.currentPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.newPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {errors?.confirmPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.confirmPassword.message}
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

SecurityForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  errors: PropsType.object,
};

export default SecurityForm;
