import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropsType from 'prop-types';
import { useTranslation } from 'react-i18next';

import { mobileQuery } from '@/constants/style';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';
import FormControl from '../Common/FormControl';
import Input from '../Common/Input/Input';


const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  
  button {
    ${mobileQuery} {
      width: 100%;
    }
  }

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
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroupLabel>{t('team.label.name')}</FormGroupLabel>
        <FormControl>
          <Input
            type="text"
            placeholder={t('team.placeholder.team-name')}
            name="teamName"
            ref={register}
          />
          {formErrors?.teamName && (
            <ErrorText message={formErrors.teamName.message} />
          )}
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('team.label.id')}</FormGroupLabel>
        <FormControl>
          <Input
            type="text"
            placeholder={t('team.placeholder.team-id')}
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
          {isEdit ? t('team.text.save') : t('team.text.add')}
        </Button>
        <Button onClick={() => history.push('/teams')}>{t('common.text.cancel')}</Button>
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
