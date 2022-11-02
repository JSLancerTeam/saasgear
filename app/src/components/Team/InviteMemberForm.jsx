import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { mobileQuery } from '@/constants/style';
import { ReactComponent as EnvelopeIcon } from '@/assets/images/svg/envelope.svg';
import FormGroup from '../Common/FormGroup';
import FormControl from '../Common/FormControl';
import ErrorText from '../Common/ErrorText';
import Input from '../Common/Input/Input';
import Button from '../Common/Button';

const FormControlStyle = styled(FormControl)`
  display: flex;
`;

const InviteInput = styled(Input)`
  width: 300px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  ${mobileQuery} {
    width: 100%;
  }
`;

const InviteBtn = styled(Button)`
  display: flex;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  align-items: center;

  svg {
    margin-right: 10px;
    *[stroke] {
      stroke: #ffffff;
    }
    *[fill] {
      fill: #ffffff;
    }
  }
`;

function InviteMemberForm({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmiting,
}) {
  const { t } = useTranslation();
  console.log(apiError);
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormControlStyle>
          <InviteInput
            type="text"
            placeholder={t('common.placeholder.g-email')}
            name="emailMember"
            ref={register}
          />
          <InviteBtn type="submit" color="primary" disabled={isSubmiting}>
            <EnvelopeIcon />
            <span>{t('team.text.invite')}</span>
          </InviteBtn>
        </FormControlStyle>
        {formErrors?.emailMember && (
          <ErrorText message={t(formErrors.emailMember.message)} />
        )}
        {apiError && <ErrorText message={apiError} />}
      </FormGroup>
    </form>
  );
}

InviteMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
  apiError: PropTypes.string,
  isSubmiting: PropTypes.bool,
};

export default InviteMemberForm;
