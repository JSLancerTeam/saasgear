import React, { useState, useEffect, memo } from 'react';
import PropsType from 'prop-types';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { SignUpFormContainer } from '@/components/Auth/AuthForm';
import { COLOR } from '@/constants/style';
import styled from 'styled-components';
import Button from '@/components/Common/Button/Button';

const StripeFormContainer = styled(SignUpFormContainer)`
  width: 300px;
`
const CardNumberEl = styled(CardNumberElement)`
  padding: 11.6px 10px;
  background: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE_GRAY};
`

const CardExpiryElementEl = styled(CardExpiryElement)`
  padding: 11.6px 10px;
  background: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE_GRAY};
`

const CardCvcElementEl = styled(CardCvcElement)`
  padding: 11.6px 10px;
  background: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE_GRAY};
`
const CardLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2px;
  color: ${COLOR.WHITE_BLUE};
  mix-blend-mode: normal;
  opacity: 0.9;
  text-transform: uppercase;
  margin-bottom: 19px;
  display: block;
`
const SubmitButton = styled(Button)`
  width: 100%;
`

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
    <StripeFormContainer onSubmit={onSubmit} className={className}>
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
            <CardLabel
              htmlFor="street_address"
            >
              Card Number
            </CardLabel>
            <CardNumberEl className="card-el" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <CardLabel
              htmlFor="first_name"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Expiration
            </CardLabel>
            <CardExpiryElementEl className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <CardLabel
              htmlFor="last_name"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              CVC
            </CardLabel>
            <CardCvcElementEl className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1 text-center">
          {error}
        </p>
      )}
      <SubmitButton
        type="submit"
        disabled={isSubmitting}
        color="primary"
        width="100%"
      >
        {isSubmitting ? 'Please wait' : submitText}
      </SubmitButton>
    </StripeFormContainer>
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
