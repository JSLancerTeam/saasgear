import React from 'react';
import PropTypes from 'prop-types';
import EnvelopeIcon from 'assets/images/svg/envelope.svg';

InviteMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};

function InviteMemberForm({ onSubmit, register, formErrors }) {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3 flex items-center">
        <input
          name="emailMember"
          type="text"
          className="mr-2 w-64 form-input block transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="David@jslancer.vn"
          ref={register}
        />
        <button
          type="submit"
          className="group flex items-center justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          <span className="flex items-center mr-3">
            <img
              className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              src={EnvelopeIcon}
              alt="the-lock"
            />
          </span>
            Invite
        </button>
      </div>
      {formErrors?.emailMember && (
        <p className="text-red-500 text-xs italic mt-1">
          {formErrors.emailMember.message}
        </p>
      )}
    </form>
  );
}

export default InviteMemberForm;