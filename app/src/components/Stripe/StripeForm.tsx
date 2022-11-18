import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { COLORS } from '@/constants/style';
import styled from 'styled-components';
import Button from '@/components/Common/Button';

const CardNumberEl = styled(CardNumberElement)`
  padding: 11.6px 10px;
  background: ${COLORS.LIGHT_GRAY};
  border: 1px solid ${COLORS.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${COLORS.WHITE_GRAY};
  box-sizing: border-box;
`;

const CardExpiryElementEl = styled(CardExpiryElement)`
  padding: 11.6px 10px;
  background: ${COLORS.LIGHT_GRAY};
  border: 1px solid ${COLORS.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${COLORS.WHITE_GRAY};
  width: 100%;
  box-sizing: border-box;
`;

const CardCvcElementEl = styled(CardCvcElement)`
  padding: 11.6px 10px;
  background: ${COLORS.LIGHT_GRAY};
  border: 1px solid ${COLORS.WHITE_BLUE};
  border-radius: 10px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${COLORS.WHITE_GRAY};
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const BackButton = styled(Button)`
  border-color: transparent;
  padding: 0;
  margin-bottom: 20px;
  cursor: pointer;
  & > svg {
    color: ${COLORS.RED};
    width: 20px;
  }
`;

type Props = {
  onSubmitSuccess: (token: string) => void;
  className?: string;
  onGoBack?: () => void;
  submitText?: string;
  apiLoading: boolean;
  apiError?: string; 
}

const StripeForm: React.FC<Props> = ({
  onSubmitSuccess,
  className,
  onGoBack,
  apiLoading,
  apiError = "",
  submitText = 'Submit',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setIsSubmitting(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (elements && stripe) {
        const card = elements.getElement(CardNumberElement);
        let result;
        if (card) result = await stripe.createToken(card); 
        if (result?.error) {
          setError(result.error?.code ?? "");
        } else {
          onSubmitSuccess(result?.token?.id ?? "");
        }
      }
    } catch (err: any) {
      setError(err.toString());
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className={`w-[300px] ${className}`}>
      <div>
        {onGoBack && <BackButton type="button" onClick={onGoBack} />}
        <div>
          <div className="block w-full mb-4">
            <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]" htmlFor="street_address">
              {t('Payment.label.card')}
            </label>
            <CardNumberEl className="card-el" />
          </div>
          <div className="flex items-center justify-between">
            <div className="block w-full mb-4 mr-[10px]">
              <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]" htmlFor="first_name">
                {t('Payment.label.expiration')}
              </label>
              <CardExpiryElementEl />
            </div>
            <div className="block w-full mb-4 ml-[10px]">
              <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block uppercase mb-[19px]" htmlFor="last_name">
                {t('Payment.label.cvc')}
              </label>
              <CardCvcElementEl />
            </div>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1 text-center">{t(`Sign_up.error.${error}`)}</p>
      )}
      <SubmitButton
        type="submit"
        disabled={isSubmitting}
        color="primary"
        width="100%"
      >
        {isSubmitting ? t('Common.text.please_wait') : (submitText ?? t('Common.text.submit'))}
      </SubmitButton>
    </form>
  );
};

export default memo(StripeForm);
