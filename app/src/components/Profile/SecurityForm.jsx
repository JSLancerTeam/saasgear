import React from 'react';
import PropsType from 'prop-types';

function SecurityForm({ 
  onSubmit, 
  register, 
  formErrors,
  apiError,
  isSubmitting, 
}) {
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
          type="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors?.currentPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.currentPassword.message}
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
          type="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors?.newPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.newPassword.message}
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
          type="password"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors?.confirmPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="w-full mt-4">
        {apiError && (
          <p className="text-red-500 text-sm text-left italic">{apiError}</p>
        )}
        <button
          type="submit"
          className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded py-2 px-4 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Please wait' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

SecurityForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  apiError: PropsType.string,
  isSubmitting: PropsType.bool.isRequired,
};

export default SecurityForm;
