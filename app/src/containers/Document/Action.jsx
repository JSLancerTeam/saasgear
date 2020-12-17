import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import DocumentForm from '@/components/Document/DocumentForm';
import createDocumentQuery from '@/queries/document/createDocument';
import updateDocumentQuery from '@/queries/document/updateDocument';
import getDocumentDetailQuery from '@/queries/document/getDocumentDetail';

const ActionDocumentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  body: yup.string().required('Body is required'),
});

const ActionDocument = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const documentId = parseInt(match.params.id, 10);
  const { handleSubmit, control, register, errors, setValue } = useForm({
    resolver: yupResolver(ActionDocumentSchema),
    mode: "onChange"
  });
  const [createDocumentMutation, { loading: isCreating, error: createError }] = useMutation(createDocumentQuery);
  const [updateDocumentMutation, { loading: isUpdating, error: updateError }] = useMutation(updateDocumentQuery);
  const [fetchDocumentDetail, { data: documentData }] = useLazyQuery(getDocumentDetailQuery);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (documentId) {
      fetchDocumentDetail({ variables: { id: documentId }})
    }
  }, [documentId])

  useEffect(() => {
    if (documentData?.getDocumentDetail) {
      const values = documentData.getDocumentDetail;
      setValue('name', values.name);
      setEditorContent(values.body);
    }
  }, [documentData])

  async function onSubmit(data) {
    if (documentId) {
      await updateDocumentMutation({ variables: {
        ...data,
        id: documentId
      }});
    } else {
      await createDocumentMutation({ variables: data });
    }

    if (!createError && !updateError) {
      history.push('/document');
    }
  }

  return (
    <section>
      {documentData?.getDocumentDetail?.name && (
        <h1 className="mb-4 font-bold">{documentData.getDocumentDetail.name}</h1>
      )}
      <DocumentForm
        editorContent={editorContent}
        onSubmit={handleSubmit(onSubmit)} 
        control={control} 
        register={register} 
        isSubmitting={isCreating || isUpdating}
        formErrors={errors}
        apiError={createError?.message || updateError?.message}
      />
    </section>
  );
}

export default ActionDocument;