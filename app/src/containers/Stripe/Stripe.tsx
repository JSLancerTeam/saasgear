import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import StripeForm from '@/components/Stripe/StripeForm';

const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);

type Props = {
  onSubmitSuccess: (token: string) => void;
  className?: string;
  onGoBack?: () => void;
  apiLoading: boolean;
  apiError?: string;
  submitText?: string;
}

const StripeContainer: React.FC<Props> = ({
  onSubmitSuccess,
  className,
  onGoBack,
  apiLoading,
  apiError,
  submitText,
}) => (
  <Elements stripe={stripePromise}>
    <StripeForm
      onSubmitSuccess={onSubmitSuccess}
      className={className}
      onGoBack={onGoBack}
      apiLoading={apiLoading}
      apiError={apiError}
      submitText={submitText}
    />
  </Elements>
);

export default StripeContainer;
