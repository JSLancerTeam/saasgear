import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ContentPage, DescContent, TitleContent, TitlePage } from '@/components/Layout/blockStyle';
import InformationSetting from './InformationSetting';
import PasswordSetting from './PasswordSetting';
import PlanSetting from './PlanSetting';

const TitleContentStyle = styled(TitleContent)`
  margin-bottom: 4px;
`;

const ContentPageStyle = styled(ContentPage)`
  padding-bottom: 0;
`;

const Profile = () => {
  const { data, loading } = useSelector((state) => state.user);

  return (
    <div>
      <TitlePage>Account Settings</TitlePage>
      {loading ? <div>Loading...</div> : (
        <>
          <ContentPageStyle>
            <TitleContentStyle>Account</TitleContentStyle>
            <DescContent>This information can be edited from your profile page</DescContent>
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
