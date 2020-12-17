import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import getDocumentDetailQuery from '@/queries/document/getDocumentDetail';

const ViewDocument = () => {
  const match = useRouteMatch();
  const documentId = parseInt(match.params.id, 10);
  const [fetchDocumentDetail, { data: documentData, loading }] = useLazyQuery(getDocumentDetailQuery);


  useEffect(() => {
    if (documentId) {
      fetchDocumentDetail({ variables: { id: documentId }})
    }
  }, [documentId])
  
  function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <section>
      {loading && (
        <div>Loading...</div>
      )}

      {!loading && documentData?.getDocumentDetail && (
        <>
          <h1 className="mb-4 font-bold">{documentData.getDocumentDetail.name}</h1>
          <div className="preview" dangerouslySetInnerHTML={createMarkup(documentData.getDocumentDetail.body)}></div>
        </>
      )}
    </section>
  );
}

export default ViewDocument;