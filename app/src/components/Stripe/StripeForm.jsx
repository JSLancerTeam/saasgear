import React, { useState, useEffect, memo } from 'react';
import PropsType from 'prop-types';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';


const StripeForm = ({ onSubmitSuccess, className, onGoBack, apiLoading, apiError, submitText = 'Submit' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setIsSubmitting(apiLoading)
  }, [apiLoading])

  useEffect(() => {
    setError(apiError)
  }, [apiError])

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const card = elements.getElement(CardNumberElement);
      const result = await stripe.createToken(card);
      if (result.error) {
        setError(result.error.message);
      } else {
        onSubmitSuccess(result.token.id);
      }
    } catch (err) {
      setError(err.toString());
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="mb-5">
        {onGoBack && (
          <button className="mb-4 w-5" type="button" onClick={onGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2 px-4 w-full text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
      >
        {isSubmitting ? 'Please wait' : submitText}
      </button>
    </form>
  );
}

StripeForm.propTypes = {
  onSubmitSuccess: PropsType.func.isRequired,
  className: PropsType.string,
  onGoBack: PropsType.func,
  submitText: PropsType.string,
  apiLoading: PropsType.bool,
  apiError: PropsType.string,
};

export default memo(StripeForm);
