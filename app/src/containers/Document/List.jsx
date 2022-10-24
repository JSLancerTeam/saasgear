import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DocumentTable from '@/components/Document/DocumentTable';
import getDocumentListQuery from '@/queries/document/getDocumentList';
import { ContentPage, TitlePage } from '@/components/Layout/blockStyle';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button';

import { ReactComponent as AddIcon } from '@/assets/images/svg/add.svg';
import { mobileQuery } from '@/constants/style';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;

  ${mobileQuery} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitlePageStyle = styled(TitlePage)`
  margin-bottom: 0;
`;

const RightHeader = styled.div`
  display: flex;

  ${mobileQuery} {
    margin-top: 15px;
    width: 100%;
  }
`;

const SearchInput = styled(Input)`
  width: 284px;
  margin-right: 38px;


  ${mobileQuery} {
    width: 100%;
    margin-right: 5px;
  }
`;

const CreateBtn = styled(Button)`
  width: 264px;

  ${mobileQuery} {
    width: 30%;
  }
`;

const CreateBtnContent = styled.span`
  display: ${(props) => props.mobile ? 'none' : 'block'};

  ${mobileQuery} {
    display: ${(props) => props.mobile ? 'block' : 'none'};
  }
`

const ListDocument = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, loading, refetch } = useQuery(getDocumentListQuery);

  function onFetchDocuments(offset, limit) {
    refetch({ offset, limit });
  }

  return (
    <div>
      <Header>
        <TitlePageStyle>{t('document.title')}</TitlePageStyle>
        <RightHeader>
          <SearchInput placeholder={t('common.placeholder.search')} />
          <CreateBtn
            color="primary"
            onClick={() => history.push('/document/create')}
          >
            <CreateBtnContent>{t('document.create')}</CreateBtnContent>
            <CreateBtnContent mobile><AddIcon /></CreateBtnContent>
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
