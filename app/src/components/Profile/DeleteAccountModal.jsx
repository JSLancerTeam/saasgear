import React from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function DeleteAccountModal({
  closeModal,
  isOpen,
  onSubmit,
  email,
  register,
  errors,
  isValid,
}) {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-98"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-98"
    >
      {(ref) => (
        <div className="fixed z-10 inset-0 overflow-y-auto" ref={ref}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:top-2 sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-6 py-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Delete account
                    </h3>
                    <div className="mt-2 text-gray-500 text-sm">
                      <p>
                        Are you sure you want to delete your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                      <form
                        className="form flex flex-wrap w-full mt-3"
                        onSubmit={onSubmit}
                      >
                        <div className="w-full">
                          <label
                            htmlFor="email-confirm"
                            className="block text-sm leading-5 "
                          >
                            Please enter{' '}
                            <b className="text-blue-500">{email}</b> to confirm
                          </label>
                          <input
                            id="email-confirm"
                            autoComplete="off"
                            name="email"
                            type="email"
                            className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-3"
                            ref={register}
                          />
                          {errors?.email && (
                            <p className="text-red-500 text-xs italic mt-1 select-none">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="sm:flex sm:flex-row-reverse mt-4 w-full">
                          <button
                            type="submit"
                            disabled={!isValid}
                            style={{
                              opacity: !isValid && '50%',
                            }}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

DeleteAccountModal.propTypes = {
  closeModal: PropTypes.func,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  email: PropTypes.string,
  isValid: PropTypes.bool,
};
