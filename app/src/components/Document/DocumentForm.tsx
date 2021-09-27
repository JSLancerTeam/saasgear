import React, { memo } from 'react';
import { Controller, Control } from 'react-hook-form';
import styled from 'styled-components';
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
}) => (
  <form onSubmit={onSubmit}>
    <FormGroup>
      <FormGroupLabel>Name</FormGroupLabel>
      <Input name="name" ref={register} />
      {formErrors?.name && <ErrorText message={formErrors.name.message} />}
    </FormGroup>
    <FormGroup>
      <FormGroupLabel>Body</FormGroupLabel>
      <Controller
        name="body"
        control={control}
        defaultValue=""
        render={({ onChange }) => (
          <WYSIWYGEditor editorContent={editorContent} onChange={onChange} />
        )}
      />
      {formErrors?.body && <ErrorText message={formErrors.body.message} />}
    </FormGroup>
    {apiError && <ErrorText message={apiError} />}

    <ButtonGroup>
      <SaveBtn color="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Please wait' : 'Save'}
      </SaveBtn>
    </ButtonGroup>
  </form>
);

export default memo(DocumentForm);
