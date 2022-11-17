import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Pagination from '../Common/Pagination';
import { Table } from '../Common/Table';

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

  return (
    <div className="block w-full overflow-x-auto table_responsive">
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
    </div>
  );
};

export default memo(DocumentTable);
