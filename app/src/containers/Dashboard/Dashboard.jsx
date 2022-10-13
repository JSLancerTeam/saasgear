import React from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="text-2xl text-red-700 leading-tight">{t('dashboard')}</h1>
    </div>
  );
}

export default Dashboard;
