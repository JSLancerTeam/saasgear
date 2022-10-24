import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import loginQuery from '@/queries/auth/login';

import {
  SignUpFormContainer,
  FormContent,
  FormHeader,
  FormNote,
} from '@/components/Auth/AuthForm';
import FormControl from '@/components/Common/FormControl';
import { COLORS } from '@/constants/style';
import Input from '@/components/Common/Input/Input';
import Checkbox from '@/components/Common/Input/InputCheckbox';
import Button from '@/components/Common/Button';
import ErrorText from '@/components/Common/ErrorText';
import Logo from '@/components/Common/Logo';
import FormGroup from '@/components/Common/FormGroup';
import FormGroupLabel from '@/components/Common/FormGroupLabel';
import SocialAuth from '@/containers/Auth/SocialAuth';

const SignInContainer = styled(SignUpFormContainer)`
  width: 300px;
`;
const RembemberSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
`;
const RememberLabel = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-left: 5px;
`;
const SubmitButton = styled(Button)`
  width: 100%;
  text-transform: uppercase;
  margin-top: 32px;
`;
const ForgotLink = styled.div`
  & > a {
    font-size: 14px;
    line-height: 24px;
    color: ${COLORS.LIGHT_PRIMARY};
    text-align: right;
    display: block;
    margin-top: 24px;
  }
`;
const TextHaveAccount = styled(FormNote)`
  margin-top: 179px;
  text-align: center;
`;

const SignInSchema = yup.object().shape({
  email: yup.string().required('common.validation.require-email').email('common.validation.valid-email'),
  password: yup.string().required('common.validation.require-password'),
});

function SignInForm() {
  const { t } = useTranslation();

  const { register, handleSubmit, errors: formErrors } = useForm({
    resolver: yupResolver(SignInSchema),
  });
    
  const [loginMutation, { error, loading }] = useMutation(loginQuery);
  const history = useHistory();

  async function onSubmit(params) {
    try {
      const { data } = await loginMutation({ variables: params });
      if (data?.login) {
        history.push('/');
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }
  
  useEffect(() => {
    if (error) {
      console.log(error.graphQLErrors)
      console.log(Object.keys(error));
    }
  }, [error]);

  return (
    <SignInContainer>
      <Logo />
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>{t('sign-in.text.heading')}</FormHeader>
        <div>
          <FormGroup>
            <FormGroupLabel>{t('common.label.email')}</FormGroupLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('common.placeholder.email')}
                name="email"
                ref={register}
              />
              {formErrors?.email && (
                <ErrorText message={t(formErrors.email.message)} />
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>{t('common.label.password')}</FormGroupLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={t('common.placeholder.password')}
                name="password"
                ref={register}
              />
              {formErrors?.password && (
                <ErrorText message={t(formErrors.password.message)} />
              )}
            </FormControl>
          </FormGroup>
          <RembemberSection>
            <Checkbox type="checkbox" name="rembemer" id="rembemer" />
            <RememberLabel htmlFor="rembemer">{t('common.label.remember-label')}</RememberLabel>
          </RembemberSection>
          <SubmitButton color="primary" type="submit" disabled={loading}>
            {loading ? t('common.text.please-wait') : t('sign-in.text.button-text')}
          </SubmitButton>
          <ForgotLink>
            <Link to="/auth/forgot-password">{t('sign-in.text.forgot-password')}</Link>
          </ForgotLink>
          <SocialAuth />
        </div>
      </FormContent>
      {error?.graphQLErrors.length > 0 && <ErrorText message={t(`common.error.${error.graphQLErrors[0].extensions.code}`)} position="center" />}
      <TextHaveAccount>
        {t('common.text.not-have-account')} <Link to="/auth/signup">{t('common.text.register')}</Link>.
      </TextHaveAccount>
    </SignInContainer>
  );
}

export default SignInForm;
