import React from 'react';
import { useTranslation } from 'react-i18next';

const Logo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-[21.6px] leading-[26px] text-primary font-medium mb-[7px]">
      <span className="font-extrabold">{t('Common.logo.saas')}</span>
      <span>{t('Common.logo.gear')}</span>
    </div>
  );
}

export default Logo;
