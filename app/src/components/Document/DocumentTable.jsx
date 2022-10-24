import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import styled from 'styled-components';

import Pagination from '../Common/Pagination';
import { Table } from '../Common/Table';

const TdCenter = styled.td`
  text-align: center;
  pointer-events: none;
`;

const THead = styled.th`
  width: ${(props) => props.width ?? 'auto'};
`

const ActionTd = styled.td`
  a + a {
    margin-left: 12px;
  }
`;

const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`

const DocumentTable = ({ data, total, loading, onFetch }) => {
  const { t } = useTranslation();

  return (
    <TableResponsive>
      <Table>
        <thead>
          <tr>
            <th scope="col">{t('document.table.id')}</th>
            <th scope="col">{t('document.table.name')}</th>
            <THead scope="col" width="300px">{t('document.table.created-by')}</THead>
            <th scope="col">{t('document.table.created-at')}</th>
            <th scope="col">{t('document.table.action')}</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <TdCenter colSpan={5}>{t('common.text.loading')}</TdCenter>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr>
              <TdCenter colSpan={5}>{t('common.text.no-result')}</TdCenter>
            </tr>
          )}

          {!loading &&
            data.length > 0 &&
            data.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>{item.createdBy}</td>
                <td>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                <ActionTd>
                  <Link to={`/document/edit/${item.id}`}>{t('common.text.edit')}</Link>
                  <Link to={`/document/view/${item.id}`}>{t('common.text.view')}</Link>
                </ActionTd>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > 0 && (
        <div>
          <div>
            <Pagination total={total} onPageChange={onFetch} />
          </div>
        </div>
      )}
    </TableResponsive>
  )
};

DocumentTable.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  loading: PropTypes.bool,
  onFetch: PropTypes.func.isRequired,
};

export default memo(DocumentTable);
