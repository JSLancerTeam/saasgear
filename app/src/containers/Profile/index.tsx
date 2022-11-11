import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ContentPage, Description, TitleContent, TitlePage } from '@/components/Layout/blockStyle';
import { RootState } from '@/config/store';
import InformationSetting from './InformationSetting';
import PasswordSetting from './PasswordSetting';
import PlanSetting from './PlanSetting';

const TitleContentStyle = styled(TitleContent)`
  margin-bottom: 4px;
`;

const ContentPageStyle = styled(ContentPage)`
  padding-bottom: 0;
`;

const Profile: React.FC = () => {
  const { data, loading } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <div>
      <TitlePage>{t('Profile.title')}</TitlePage>
      {loading ? <div>{t('Common.text.loading')}</div> : (
        <>
          <ContentPageStyle>
            <TitleContentStyle>{t('Profile.text.account')}</TitleContentStyle>
            <Description>{t('Profile.text.desc')}</Description>
            <InformationSetting user={data} />
            <PasswordSetting />
          </ContentPageStyle>
          <PlanSetting />
        </>
      )}
    </div>
  );
};

export default Profile;
