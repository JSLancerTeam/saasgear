import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';

import Pagination from '../Common/Pagination';
import { Table } from '../Common/Table';

const TdCenter = styled.td`
  text-align: center;
  pointer-events: none;
`;

const ActionTd = styled.td`
  a + a {
    margin-left: 12px;
  }
`;

const DocumentTable = ({ data, total, loading, onFetch }) => (
  <div>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created By</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <TdCenter colSpan={5}>Loading...</TdCenter>
          </tr>
        )}

        {!loading && data.length === 0 && (
          <tr>
            <TdCenter colSpan={5}>No result</TdCenter>
          </tr>
        )}

        {!loading && data.length > 0 && (
          data.map(item => (
            <tr key={item.id}>
              <td>#{item.id}</td>
              <td>{item.name}</td>
              <td>{item.createdBy}</td>
              <td>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              <ActionTd>
                <Link to={`/document/edit/${item.id}`}>Edit</Link>
                <Link to={`/document/view/${item.id}`}>View</Link>
              </ActionTd>
            </tr>
          ))
        )}
      </tbody>
    </Table>
    {total > 0 && (
      <div>
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