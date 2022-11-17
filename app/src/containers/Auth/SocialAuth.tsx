import React from 'react';

// Icons
import FaceBookSvg from '@/assets/images/svg/facebook.svg';
import GoogleSvg from '@/assets/images/svg/google.svg';
import GithubSvg from '@/assets/images/svg/github.svg';

const SocialAuth: React.FC = () => {
  const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/facebook/callback&scope=email`;
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/google/callback&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}`;
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_DOMAIN}/social/github/callback&scope=user`;

  return (
    <div className="flex justify-center items-center mt-[15px] [&>a]:w-10 [&>a]:h-10 [&>a]:ml-[10px] [&>a:first-child]:ml-0 [&>a>img]:max-w-[35px]">
      {process.env.REACT_APP_FACEBOOK_CLIENT_KEY && (
        <a href={facebookLoginUrl} className="border border-solid border-[#9CA3AF] border-opacity-[0.38] rounded-[5px] h-10 flex justify-center items-center">
          <img src={FaceBookSvg} alt="Facebook icon" />
        </a>
      )}
      {process.env.REACT_APP_GOOGLE_CLIENT_KEY && (
        <a href={googleLoginUrl} className="border border-solid border-[#9CA3AF] border-opacity-[0.38] rounded-[5px] h-10 flex justify-center items-center">
          <img src={GoogleSvg} alt="Google icon" />
        </a>
      )}
      {process.env.REACT_APP_GITHUB_CLIENT_KEY && (
        <a href={githubUrl} className="border border-solid border-[#9CA3AF] border-opacity-[0.38] rounded-[5px] h-10 flex justify-center items-center">
          <img src={GithubSvg} alt="Github icon" />
        </a>
      )}
    </div>
  );
};

export default SocialAuth;