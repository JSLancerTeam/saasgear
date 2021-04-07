import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropsType from 'prop-types';

import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button/Button';
import FormControl from '../Common/FormControl/FormControl';
import Input from '../Common/Input/Input';

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;

  button:first-child {
    margin-right: 16px;
  }
`;

export default function TeamForm({
  onSubmit,
  register,
  formErrors,
  isEdit,
  loading,
}) {
  const history = useHistory();

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroupLabel>Team name</FormGroupLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Your team name"
            name="teamName"
            ref={register}
          />
          {formErrors?.teamName && (
            <ErrorText message={formErrors.teamName.message} />
          )}
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>Team ID</FormGroupLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="A unique ID for your team"
            name="teamID"
            ref={register}
          />
          {formErrors?.teamID && (
            <ErrorText message={formErrors.teamID.message} />
          )}
        </FormControl>
      </FormGroup>
      <ButtonGroup>
        <Button color="primary" type="submit" disabled={loading}>
          {isEdit ? 'Save Team' : 'Add Team'}
        </Button>
        <Button onClick={() => history.push('/teams')}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
}

TeamForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  isEdit: PropsType.bool,
  loading: PropsType.bool,
};
