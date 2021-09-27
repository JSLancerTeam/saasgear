import React from 'react';
import styled from 'styled-components';

import { ReactHookFormType } from '@/typeReactHookForm';
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

type Props = ReactHookFormType & {
  apiError?: string;
  isSubmiting?: boolean;
}

const InviteMemberForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmiting,
}) => (
  <form onSubmit={onSubmit}>
    <FormGroup>
      <FormControlStyle>
        <InviteInput
          type="text"
          placeholder="david@jslancer.com"
          name="emailMember"
          ref={register}
        />
        <InviteBtn type="submit" color="primary" disabled={isSubmiting}>
          <EnvelopeIcon />
          <span>Invite</span>
        </InviteBtn>
      </FormControlStyle>
      {formErrors?.emailMember && (
        <ErrorText message={formErrors.emailMember.message} />
      )}
      {apiError && <ErrorText message={apiError} />}
    </FormGroup>
  </form>
);

export default InviteMemberForm;
