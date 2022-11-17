import React from 'react';
import { useQuery } from '@apollo/client';
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

const ListDocument: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, loading, refetch } = useQuery(getDocumentListQuery);

  function onFetchDocuments(offset: number, limit: number) {
    refetch({ offset, limit });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[26px] sm:flex-col sm:items-start">
        <h3 className="font-bold text-[26px] leading-9 text-sapphire_blue mb-0">
          {t('Document.title')}
        </h3>
        <div className="flex sm:mt-[15px] sm:w-full">
          <SearchInput placeholder={t('Common.placeholder.search')} />
          <CreateBtn
            color="primary"
            onClick={() => history.push('/document/create')}
          >
            <span className="block sm:hidden">{t('Document.create')}</span>
            <span className="hidden sm:block"><AddIcon /></span>
          </CreateBtn>
        </div>
      </div>
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
