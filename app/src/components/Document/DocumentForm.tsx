import React, { memo } from 'react';
import { Controller, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ReactHookFormType } from "@/typeReactHookForm";

import WYSIWYGEditor from './WYSIWYG';
import FormGroup from '../Common/FormGroup';
import FormGroupLabel from '../Common/FormGroupLabel';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';
import Input from '../Common/Input/Input';

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
        {formErrors?.name?.message && <ErrorText message={String(t(formErrors.name.message))} />}
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
        {formErrors?.body?.message && <ErrorText message={String(t(formErrors.body.message))} />}
      </FormGroup>
      {apiError && <ErrorText message={`Document.error.${apiError}`} />}

      <div className="flex justify-end">
        <Button color="primary" type="submit" disabled={isSubmitting} className="w-[264px] sm:w-full">
          {isSubmitting ? t('Common.text.please_wait') : t('Common.text.save')}
        </Button>
      </div>
    </form>
  );
};

export default memo(DocumentForm);
