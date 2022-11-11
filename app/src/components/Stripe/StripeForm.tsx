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
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';

const StripeFormContainer = styled.form`
  width: 300px;
`;

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

const FormGroupCardExpire = styled(FormGroup)`
  margin-right: 10px;
`;

const FormGroupCardCvc = styled(FormGroup)`
  margin-left: 10px;
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

const RowGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    <StripeFormContainer onSubmit={onSubmit} className={className}>
      <div>
        {onGoBack && <BackButton type="button" onClick={onGoBack} />}
        <div>
          <FormGroup>
            <FormGroupLabel htmlFor="street_address">
              {t('Payment.label.card')}
            </FormGroupLabel>
            <CardNumberEl className="card-el" />
          </FormGroup>
          <RowGroup>
            <FormGroupCardExpire>
              <FormGroupLabel htmlFor="first_name">{t('Payment.label.expiration')}</FormGroupLabel>
              <CardExpiryElementEl />
            </FormGroupCardExpire>
            <FormGroupCardCvc>
              <FormGroupLabel htmlFor="last_name">{t('Payment.label.cvc')}</FormGroupLabel>
              <CardCvcElementEl />
            </FormGroupCardCvc>
          </RowGroup>
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
    </StripeFormContainer>
  );
};

export default memo(StripeForm);
