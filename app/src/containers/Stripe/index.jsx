import React from 'react';
import PropsType from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import StripeForm from '@/components/Stripe/StripeForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripeContainer = ({ onSubmitSuccess, className, onGoBack, apiLoading, apiError }) => (
  <Elements stripe={stripePromise}>
    <StripeForm 
      onSubmitSuccess={onSubmitSuccess}
      className={className}
      onGoBack={onGoBack} 
      apiLoading={apiLoading} 
      apiError={apiError} 
    />
  </Elements>
)

StripeContainer.propTypes = {
  onSubmitSuccess: PropsType.func.isRequired,
  className: PropsType.string,
  onGoBack: PropsType.func,
  apiLoading: PropsType.bool,
  apiError: PropsType.string,
};

export default StripeContainer;
