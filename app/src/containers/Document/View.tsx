import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client';
import { useRouteMatch } from 'react-router-dom';

import getDocumentDetailQuery from '@/queries/document/getDocumentDetail';

type MatchParams = {
  id: string;
}

const ViewDocument: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const { t } = useTranslation();
  const documentId = parseInt(match.params.id, 10);
  const [fetchDocumentDetail, { data: documentData, loading }] = useLazyQuery(
    getDocumentDetailQuery,
  );

  useEffect(() => {
    if (documentId) {
      fetchDocumentDetail({ variables: { id: documentId } });
    }
  }, [documentId]);

  function createMarkup(html: string) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  return (
    <div className="min-h-[calc(100vh_-_64px)]">
      {loading && <div>{t('Common.text.loading')}</div>}

      {!loading && documentData?.getDocumentDetail && (
        <>
          <h3 className="font-bold text-[26px] leading-9 text-sapphire-blue mb-8">{documentData.getDocumentDetail.name}</h3>
          <div className="bg-white border border-solid border-dark-grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6">
            <div
              dangerouslySetInnerHTML={createMarkup(
                documentData.getDocumentDetail.body,
              )}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewDocument;
