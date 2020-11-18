import React from 'react';
import PropsType from 'prop-types';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

function StripeForm({
  onSubmit,
  isSubmitting,
  submitText = 'Submit',
  error,
  errorAPI,
}) {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="street_address"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Card Number
              </label>
              <CardNumberElement className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Expiration
              </label>
              <CardExpiryElement className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                CVC
              </label>
              <CardCvcElement className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
            </div>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs italic mt-1 text-center">
            {error}
          </p>
        )}
        {errorAPI && (
          <p className="text-red-500 text-xs italic mt-1 text-center">
            {errorAPI}
          </p>
        )}
        <div className="px-4 py-3 bg-gray-50 sm:px-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 w-full border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
          >
            {isSubmitting ? 'Please wait' : submitText}
          </button>
        </div>
      </div>
    </form>
  );
}

StripeForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  isSubmitting: PropsType.bool.isRequired,
  submitText: PropsType.string,
  error: PropsType.string,
  errorAPI: PropsType.string,
};

export default StripeForm;
