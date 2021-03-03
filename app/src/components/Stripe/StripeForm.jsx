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
import { FormGroup } from '@/components/Common/FormGroup';
import { FormGroupLabel } from '@/components/Common/FormGroupLabel';

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
  box-sizing: border-box;
`

const FormGroupCardExpire = styled(FormGroup)`
  margin-right: 10px;
`
const FormGroupCardCvc = styled(FormGroup)`
  margin-left: 10px;
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
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
`
const SubmitButton = styled(Button)`
  width: 100%;
`
const BackButton = styled(Button)`
  border-color: transparent;
  padding: 0;
  margin-bottom: 20px;
  cursor: pointer;
  & > svg {
    color: ${COLOR.RED};
    width: 20px;
  }
`
const RowGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <div>
        {onGoBack && (
          <BackButton type="button" onClick={onGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </BackButton>
        )}
        <div>
          <FormGroup>
            <FormGroupLabel
              htmlFor="street_address"
            >
              Card Number
            </FormGroupLabel>
            <CardNumberEl className="card-el" />
          </FormGroup>
          <RowGroup>
            <FormGroupCardExpire>
              <FormGroupLabel htmlFor="first_name">
                Expiration
              </FormGroupLabel>
              <CardExpiryElementEl/>
            </FormGroupCardExpire>
            <FormGroupCardCvc>
              <FormGroupLabel htmlFor="last_name">
                CVC
              </FormGroupLabel>
              <CardCvcElementEl />
            </FormGroupCardCvc>
          </RowGroup>
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
