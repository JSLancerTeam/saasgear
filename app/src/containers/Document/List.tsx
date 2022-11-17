import React from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DocumentTable from '@/components/Document/DocumentTable';
import getDocumentListQuery from '@/queries/document/getDocumentList';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button';

import { ReactComponent as AddIcon } from '@/assets/images/svg/add.svg';

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
          <Input placeholder={t('Common.placeholder.search')} className="w-[284px] mr-[38px] sm:w-full sm:mr-[5px]" />
          <Button
            color="primary"
            onClick={() => history.push('/document/create')}
            className="w-[264px] sm:w-[30%]"
          >
            <span className="block sm:hidden">{t('Document.create')}</span>
            <span className="hidden sm:block"><AddIcon /></span>
          </Button>
        </div>
      </div>
      <div className='bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6'>
        <DocumentTable
          data={data?.getDocuments?.documents}
          total={data?.getDocuments?.count}
          loading={loading}
          onFetch={onFetchDocuments}
        />
      </div>
    </div>
  );
};

export default ListDocument;
