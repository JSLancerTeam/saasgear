import React, { memo } from 'react';
import { Controller, Control } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactHookFormType } from "@/typeReactHookForm";

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

type Props = ReactHookFormType & {
  editorContent?: string;
  isSubmitting: boolean;
  apiError?: string;
  control: Control<Record<string, unknown>>;
}

const DocumentForm: React.FC<Props> = ({
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
        <FormGroupLabel>{t('Common.label.name')}</FormGroupLabel>
        <Input name="name" ref={register} />
        {formErrors?.name?.message && <ErrorText message={t(formErrors.name.message)} />}
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('Common.label.body')}</FormGroupLabel>
        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ onChange }) => (
            <WYSIWYGEditor editorContent={editorContent} onChange={onChange} />
          )}
        />
        {formErrors?.body?.message && <ErrorText message={t(formErrors.body.message)} />}
      </FormGroup>
      {apiError && <ErrorText message={`Document.error.${apiError}`} />}

      <ButtonGroup>
        <SaveBtn color="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('Common.text.please-wait') : t('Common.text.save')}
        </SaveBtn>
      </ButtonGroup>
    </form>
  );
};

export default memo(DocumentForm);
