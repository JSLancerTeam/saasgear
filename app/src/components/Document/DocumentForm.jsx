import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { mobileQuery } from '@/constants/style';
import WYSIWYGEditor from './WYSIWYG';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';
import Input from '../Common/Input/Input';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveBtn = styled(Button)`
  width: 264px;
  ${mobileQuery} {
    width: 100%;
  }
`;

const DocumentForm = ({
  editorContent,
  onSubmit,
  register,
  control,
  formErrors,
  apiError,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormGroupLabel>{t('common.label.name')}</FormGroupLabel>
        <Input name="name" ref={register} />
        {formErrors?.name && <ErrorText message={t(formErrors.name.message)} />}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('common.label.body')}</FormGroupLabel>
        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ onChange }) => (
            <WYSIWYGEditor editorContent={editorContent} onChange={onChange} />
          )}
        />
        {formErrors?.body && <ErrorText message={t(formErrors.body.message)} />}
      </FormGroup>
      {apiError && <ErrorText message={apiError} />}

      <ButtonGroup>
        <SaveBtn color="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('common.text.please-wait') : t('common.text.save')}
        </SaveBtn>
      </ButtonGroup>
    </form>
  )
};

DocumentForm.propTypes = {
  editorContent: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  apiError: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
};

export default memo(DocumentForm);
