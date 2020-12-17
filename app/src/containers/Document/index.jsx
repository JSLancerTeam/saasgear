import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import DocumentTable from '@/components/Document/DocumentTable';
import getDocumentListQuery from '@/queries/document/getDocumentList';

const Document = () => {
  const { data, loading, refetch } = useQuery(getDocumentListQuery);

  function onFetchDocuments(offset, limit) {
    refetch({ offset, limit });
  }

  return (
    <div className="container">
      <div className="align-middle inline-block w-full py-4 overflow-hidden bg-white px-12">
        <div className="flex justify-between">
          <div className="relative">
            <div className="absolute pt-2 pl-2 w-7">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              name="search"
              className="form-input pl-8 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="Search"
            />
          </div>
          <Link to="/document/create" className="px-5 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Create New Document</Link>
        </div>
      </div>
      <DocumentTable data={data?.getDocuments?.documents} total={data?.getDocuments?.count} loading={loading} onFetch={onFetchDocuments} />
    </div>
  )
}

export default Document;
