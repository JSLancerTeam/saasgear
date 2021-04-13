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
  const socialButton = useMemo(
    () => [
      process.env.REACT_APP_FACEBOOK_CLIENT_KEY ? {
        name: 'Facebook',
        logo: FaceBookSvg,
        url: `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/facebook/callback&scope=email`,
      } : null,
      process.env.REACT_APP_GOOGLE_CLIENT_KEY ? {
        name: 'Google',
        logo: GoogleSvg,
        url: `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/google/callback&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}`,
      } : null,
      process.env.REACT_APP_GITHUB_CLIENT_KEY ? {
        name: 'Github',
        logo: GithubSvg,
        url: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_KEY}&scope=user`,
      } : null,
    ],
    [],
  );

  return (
    <>
      <SocialList>
        {socialButton.filter(item => item).map((btn) => (
          <SocialButton
            className="cursor-pointer hover:bg-gray-300"
            key={`social-btn-${btn.name}`}
            href={btn.url}
          >
            <img src={btn.logo} alt={`${btn.name}-icon`} />
          </SocialButton>
        ))}
      </SocialList>
    </>
  )
};

export default SocialAuth;
