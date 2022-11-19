import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Pagination from '../Common/Pagination';

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
      <table className="w-full border-collapse [&_tr]:h-[56px] [&_th]:font-bold [&_th]:text-[12px] [&_th]:leading-[15px] [&_th]:tracking-[2px] [&_th]:uppercase [&_th]:text-white_blue [&_th]:text-left [&_td]:text-[14px] [&_td]:leading-6 [&_td]:text-sapphire_blue [&_tbody_tr:nth-child(even)]:bg-light_gray [&_tbody_tr:hover]:bg-regular_primary">
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
      </table>
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
