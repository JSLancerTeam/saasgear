import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useLazyQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DocumentForm from '@/components/Document/DocumentForm';
import createDocumentQuery from '@/queries/document/createDocument';
import updateDocumentQuery from '@/queries/document/updateDocument';
import getDocumentDetailQuery from '@/queries/document/getDocumentDetail';
import Button from '@/components/Common/Button';

const ActionDocumentSchema = yup.object().shape({
  name: yup.string().required('Common.validation.require_name'),
  body: yup.string().required('Common.validation.require_body'),
});

type MatchParams = {
  id: string;
}

type Payload = {
  id?: number;
  name?: string;
  body?: string;
}

const ActionDocument: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const history = useHistory();
  const { t } = useTranslation();
  const documentId = parseInt(match.params.id, 10);
  const { handleSubmit, control, register, errors, setValue } = useForm({
    resolver: yupResolver(ActionDocumentSchema),
    mode: 'onChange',
  });
  const [
    createDocumentMutation,
    { loading: isCreating, error: createError },
  ] = useMutation(createDocumentQuery);
  const [
    updateDocumentMutation,
    { loading: isUpdating, error: updateError },
  ] = useMutation(updateDocumentQuery);
  const [fetchDocumentDetail, { data: documentData }] = useLazyQuery(
    getDocumentDetailQuery,
  );
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (documentId) {
      fetchDocumentDetail({ variables: { id: documentId } });
    }
  }, [documentId]);

  useEffect(() => {
    if (documentData?.getDocumentDetail) {
      const values = documentData.getDocumentDetail;
      setValue('name', values.name);
      setEditorContent(values.body);
    }
  }, [documentData]);

  async function onSubmit(data: Payload) {
    if (documentId) {
      await updateDocumentMutation({
        variables: {
          ...data,
          id: documentId,
        },
      });
    } else {
      await createDocumentMutation({ variables: data });
    }

    if (!createError && !updateError) {
      history.push('/document');
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[26px]">
        <h3 className="font-bold text-[26px] leading-9 text-sapphire_blue">
          {documentData?.getDocumentDetail?.name
            ? documentData.getDocumentDetail.name
            : t('Common.title.new_document')}
        </h3>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isCreating || isUpdating}
          className="w-[264px] sm:hidden"
        >
          {isCreating || isUpdating ? t('Common.text.please_wait') : t('Common.text.save')}
        </Button>
      </div>
      <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
        <DocumentForm
          editorContent={editorContent}
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          register={register}
          isSubmitting={isCreating || isUpdating}
          formErrors={errors}
          apiError={createError?.graphQLErrors?.[0]?.extensions?.code || updateError?.graphQLErrors?.[0]?.extensions?.code}
        />
      </div>
    </div>
  );
};

export default ActionDocument;
