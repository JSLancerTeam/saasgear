import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as EnvelopeIcon} from '@/assets/images/svg/envelope.svg';
import FormGroup from '../Common/FormGroup';
import FormControl from '../Common/FormControl/FormControl';
import ErrorText from '../Common/ErrorText';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';

const FormControlStyle = styled(FormControl)`
  display: flex;
`;

const InviteInput = styled(Input)`
  width: 300px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
`;

const InviteBtn = styled(Button)`
  display: flex;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    *[stroke] {
      stroke: #FFFFFF;
    }
    *[fill] {
      fill: #FFFFFF;
    }
  }
`;

function InviteMemberForm({ onSubmit, register, formErrors }) {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormControlStyle>
          <InviteInput type="text" placeholder="david@jslancer.com" name="emailMember" ref={register} />
          <InviteBtn type="submit" color="primary">
            <EnvelopeIcon />
            <span>Invite</span>
          </InviteBtn>
        </FormControlStyle>
        {formErrors?.emailMember && (
          <ErrorText message={formErrors.emailMember.message} />
        )}
      </FormGroup>
    </form>
  );
}

InviteMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
};

export default InviteMemberForm;