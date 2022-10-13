import React, { useState, useEffect, memo } from 'react';
import PropsType from 'prop-types';
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

const StripeForm = ({
  onSubmitSuccess,
  className,
  onGoBack,
  apiLoading,
  apiError,
  submitText = 'Submit',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();

  useEffect(() => {
    setIsSubmitting(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

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
        {onGoBack && <BackButton type="button" onClick={onGoBack} />}
        <div>
          <FormGroup>
            <FormGroupLabel htmlFor="street_address">
              {t('common.stripe.card')}
            </FormGroupLabel>
            <CardNumberEl className="card-el" />
          </FormGroup>
          <RowGroup>
            <FormGroupCardExpire>
              <FormGroupLabel htmlFor="first_name">{t('common.stripe.expiration')}</FormGroupLabel>
              <CardExpiryElementEl />
            </FormGroupCardExpire>
            <FormGroupCardCvc>
              <FormGroupLabel htmlFor="last_name">{t('common.stripe.cvc')}</FormGroupLabel>
              <CardCvcElementEl />
            </FormGroupCardCvc>
          </RowGroup>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1 text-center">{error}</p>
      )}
      <SubmitButton
        type="submit"
        disabled={isSubmitting}
        color="primary"
        width="100%"
      >
        {isSubmitting ? t('common.text.please-wait') : submitText}
      </SubmitButton>
    </StripeFormContainer>
  );
};

StripeForm.propTypes = {
  onSubmitSuccess: PropsType.func.isRequired,
  className: PropsType.string,
  onGoBack: PropsType.func,
  submitText: PropsType.string,
  apiLoading: PropsType.bool,
  apiError: PropsType.string,
};

export default memo(StripeForm);
