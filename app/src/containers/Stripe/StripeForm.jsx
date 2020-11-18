import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import StripeForm from '@/components/Stripe/StripeForm';
import createSubcriptionQuery from '@/queries/stripe/createSubcription';
import getQueryParam from '@/utils/getQueryParam';

function StripeFormContainer() {
  const [createSubcriptionMutation, { error: errorAPI }] = useMutation(
    createSubcriptionQuery,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const query = getQueryParam();
  const history = useHistory();

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const planName = query.get('plan');
    if (!stripe || !elements || !planName) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message);
    } else {
      const { data } = await createSubcriptionMutation({
        variables: { token: result.token.id },
      });
      if (data) {
        history.push('/');
      }
    }

    setIsSubmitting(false);
  }

  return (
    <StripeForm
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitText="Start 14 days trial"
      error={error}
      errorAPI={errorAPI && errorAPI.message}
    />
  );
}

export default StripeFormContainer;
