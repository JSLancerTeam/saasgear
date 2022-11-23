import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1 className="text-2xl text-red-700 leading-tight">{t('Dashboard')}</h1>
    </div>
  );
}

export default Dashboard;
