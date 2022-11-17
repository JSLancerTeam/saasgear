import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Pagination from '../Common/Pagination';
import { Table } from '../Common/Table';

const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

type IData = {
  id: string;
  name: string;
  body: string;
  createdBy: string;
  createdAt: Date;
}

type Props = {
  data: IData[];
  total: number;
  loading: boolean;
  onFetch: (offset: number, limit: number) => void
}

const DocumentTable: React.FC<Props> = ({ data, total, loading, onFetch }) => {
  const { t } = useTranslation();
  console.log(total);
  return (
    <TableResponsive>
      <Table>
        <thead>
          <tr>
            <th scope="col">{t('Document.table.id')}</th>
            <th scope="col">{t('Document.table.name')}</th>
            <th scope="col" className="w-[300px]">{t('Document.table.created_by')}</th>
            <th scope="col">{t('Document.table.created_at')}</th>
            <th scope="col">{t('Document.table.action')}</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center pointer-events-none">{t('Common.text.loading')}</td>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center pointer-events-none">{t('Common.text.no_result')}</td>
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
                <td className="[&>a+a]:ml-3">
                  <Link to={`/document/edit/${item.id}`}>{t('Common.text.edit')}</Link>
                  <Link to={`/document/view/${item.id}`}>{t('Common.text.view')}</Link>
                </td>
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
  );
};

export default memo(DocumentTable);
