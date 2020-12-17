import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Pagination from '../Common/Pagination';

const DocumentTable = ({ data, total, loading, onFetch }) => (
  <div className="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3">
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created By</th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
          <th className="px-6 py-3 border-b-2 border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading && (
          <tr>
            <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">Loading...</td>
          </tr>
        )}

        {!loading && data.length === 0 && (
          <tr>
            <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">No result</td>
          </tr>
        )}

        {!loading && data.length > 0 && (
          data.map(item => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm leading-5 text-gray-800">#{item.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5 text-blue-900">{item.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.createdBy}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b text-center border-gray-500 text-sm leading-5">
                <Link to={`/document/edit/${item.id}`} className="px-4 py-2 mr-4 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</Link>
                <Link to={`/document/view/${item.id}`} className="px-4 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    {total > 0 && (
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
        <div>
          <Pagination total={total} onPageChange={onFetch} />
        </div>
      </div>
    )}
  </div>
);

DocumentTable.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  loading: PropTypes.bool,
  onFetch: PropTypes.func.isRequired,
}

export default memo(DocumentTable);