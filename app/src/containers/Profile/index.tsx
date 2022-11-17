import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/config/store';
import InformationSetting from './InformationSetting';
import PasswordSetting from './PasswordSetting';
import PlanSetting from './PlanSetting';

const Profile: React.FC = () => {
  const { data, loading } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="font-bold text-[26px] leading-9 text-sapphire_blue mb-8">{t('Profile.title')}</h3>
      {loading ? <div>{t('Common.text.loading')}</div> : (
        <>
          <div className="bg-white border border-solid border-dark_grey shadow-xxl rounded-[10px] p-6 mb-[25px] sm:px-[10px] sm:py-6 pb-0">
            <h5 className="font-bold text-[22px] leading-[30px] text-sapphire_blue mb-1">
              {t('Profile.text.account')}
            </h5>
            <p className="text-[16px] leading-[26px] text-white_gray mb-[14px]">
              {t('Profile.text.desc')}
            </p>
            <InformationSetting user={data} />
            <PasswordSetting />
          </div>
          <PlanSetting />
        </>
      )}
    </div>
  );
};

export default Profile;
