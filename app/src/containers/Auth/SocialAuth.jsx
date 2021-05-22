import React, { useMemo } from 'react';
import styled from 'styled-components';

// Icons
import FaceBookSvg from '@/assets/images/svg/facebook.svg';
import GoogleSvg from '@/assets/images/svg/google.svg';
import GithubSvg from '@/assets/images/svg/github.svg';

const SocialButton = styled.a`
  border: 1px solid rgb(156 163 175 / 38%);
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  justify-content: center;
  & > a {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
    & > img {
      max-width: 35px;
    }
  }
`;

const SocialAuth = () => {
  const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/facebook/callback&scope=email`;
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/google/callback&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}`;
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_KEY}&scope=user`;

  return (
    <SocialList>
      {process.env.REACT_APP_FACEBOOK_CLIENT_KEY && (
        <SocialButton href={facebookLoginUrl}>
          <img src={FaceBookSvg} alt="Facebook icon" />
        </SocialButton>
      )}
      {process.env.REACT_APP_GOOGLE_CLIENT_KEY && (
        <SocialButton href={googleLoginUrl}>
          <img src={GoogleSvg} alt="Google icon" />
        </SocialButton>
      )}
      {process.env.REACT_APP_GITHUB_CLIENT_KEY && (
        <SocialButton href={githubUrl}>
          <img src={GithubSvg} alt="Github icon" />
        </SocialButton>
      )}
    </SocialList>
  );
};

export default SocialAuth;
