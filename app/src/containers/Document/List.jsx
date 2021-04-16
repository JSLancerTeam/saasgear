import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import DocumentTable from '@/components/Document/DocumentTable';
import getDocumentListQuery from '@/queries/document/getDocumentList';
import { ContentPage, TitlePage } from '@/components/Layout/blockStyle';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const TitlePageStyle = styled(TitlePage)`
  margin-bottom: 0;
`;

const RightHeader = styled.div`
  display: flex;
`;

const SearchInput = styled(Input)`
  width: 284px;
  margin-right: 38px;
`;

const CreateBtn = styled(Button)`
  width: 264px;
`;

const ListDocument = () => {
  const history = useHistory();
  const { data, loading, refetch } = useQuery(getDocumentListQuery);

  function onFetchDocuments(offset, limit) {
    refetch({ offset, limit });
  }

  return (
    <div>
      <Header>
        <TitlePageStyle>Document</TitlePageStyle>
        <RightHeader>
          <SearchInput placeholder="Search.." />
          <CreateBtn
            color="primary"
            onClick={() => history.push('/document/create')}
          >
            Create New Document
          </CreateBtn>
        </RightHeader>
      </Header>
      <ContentPage>
        <DocumentTable
          data={data?.getDocuments?.documents}
          total={data?.getDocuments?.count}
          loading={loading}
          onFetch={onFetchDocuments}
        />
      </ContentPage>
    </div>
  );
};

export default ListDocument;
