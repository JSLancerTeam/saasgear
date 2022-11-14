import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useLazyQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

import DocumentForm from '@/components/Document/DocumentForm';
import createDocumentQuery from '@/queries/document/createDocument';
import updateDocumentQuery from '@/queries/document/updateDocument';
import getDocumentDetailQuery from '@/queries/document/getDocumentDetail';
import { ContentPage, TitlePage } from '@/components/Layout/blockStyle';
import Button from '@/components/Common/Button';
import { mobileQuery } from '@/constants/style';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const TitlePageStyle = styled(TitlePage)`
  margin-bottom: 0;
`;

const SaveBtn = styled(Button)`
  width: 264px;
  ${mobileQuery} {
    display: none;
  }
`;

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
      <Header>
        <TitlePageStyle>
          {documentData?.getDocumentDetail?.name
            ? documentData.getDocumentDetail.name
            : t('Common.title.new_document')}
        </TitlePageStyle>
        <SaveBtn
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? t('Common.text.please_wait') : t('Common.text.save')}
        </SaveBtn>
      </Header>
      <ContentPage>
        <DocumentForm
          editorContent={editorContent}
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          register={register}
          isSubmitting={isCreating || isUpdating}
          formErrors={errors}
          apiError={createError?.graphQLErrors?.[0]?.extensions?.code || updateError?.graphQLErrors?.[0]?.extensions?.code}
        />
      </ContentPage>
    </div>
  );
};

export default ActionDocument;
