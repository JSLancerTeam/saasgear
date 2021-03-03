import React from 'react';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '@/assets/css/react-slide-custom.css';
import { COLOR } from '@/constants/style';

const AuthAdsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;
const AdsIconGrid = styled.div`
  position: absolute;
  width: 129px;
  height: 121px;
  top: 164px;
  right: 50px;
`;
const AdsIconBlock = styled.div`
  position: absolute;
  left: 56px;
  top: 180px;
`
const AdsCircleIcon = styled.div`
  position: absolute;
  left: 38px;
  bottom: 110px;
  border: 1px solid ${COLOR.LIGHT_BLUE};
  border-radius: 50%;
  width: 58px;
  height: 58px;
`
const AdsBigBlock = styled.div`
  position: absolute;
  left: 26.52%;
  right: 0%;
  top: 44.01%;
  bottom: 0%;
`
const SlideCustom = styled(Slide)`
  max-width: 100%;
  height: 100%;
`
const SlideImage = styled.img`
  margin: 0 auto;
  max-width: 100%;
`
const SlideItemTitle = styled.h4`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE};
  margin-top: 82px;
  margin-bottom: 12px;
`
const SlideItemDescription = styled.div`
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLOR.WHITE};
`
const SlideItemContainer = styled.div`
  max-width: 80%;
  display: block;
  margin: 0 auto;
  text-align: center;
`

function AuthAdsArea() {
  return (
    <AuthAdsWrapper>
      <AdsIconGrid>
        <svg width="131" height="123" viewBox="0 0 131 123" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path d="M129.844 121.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
            <path d="M129.844 81.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
            <path d="M129.844 41.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
            <path d="M129.844 1.5H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 40"/>
          </g>
        </svg>
      </AdsIconGrid>
      <AdsIconBlock>
        <svg width="337" height="327" viewBox="0 0 337 327" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H287C314.614 0 337 22.3858 337 50V327H50C22.3858 327 0 304.614 0 277V0Z" fill="#0075E8"/>
        </svg>
      </AdsIconBlock>
      <AdsCircleIcon>
      </AdsCircleIcon>
      <AdsBigBlock>
        <svg width="594" height="523" viewBox="0 0 594 523" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H544C571.614 1 594 23.3858 594 51V529H51C23.3858 529 1 506.614 1 479V1Z" stroke="#2291FF"/>
        </svg>
      </AdsBigBlock>
      <SlideCustom easing="ease" arrows={false} canSwipe={false} duration={3000} indicators>
        <div>
          <SlideItemContainer>
            <SlideImage src="/images/auth/auth-ads.png" alt="asd" />
            <SlideItemTitle>Connect and manage with your team!</SlideItemTitle>
            <SlideItemDescription>Aziest Jordan is one of the biggest superstars to have immerged from the professional designer in world.</SlideItemDescription>
          </SlideItemContainer>
        </div>
        <div>
          <SlideItemContainer>
            <SlideImage src="/images/auth/auth-ads.png" alt="asd" />
            <SlideItemTitle>Connect and manage with your team!</SlideItemTitle>
            <SlideItemDescription>Aziest Jordan is one of the biggest superstars to have immerged from the professional designer in world.</SlideItemDescription>
          </SlideItemContainer>
        </div>
        <div>
          <SlideItemContainer>
            <SlideImage src="/images/auth/auth-ads.png" alt="asd" />
            <SlideItemTitle>Connect and manage with your team!</SlideItemTitle>
            <SlideItemDescription>Aziest Jordan is one of the biggest superstars to have immerged from the professional designer in world.</SlideItemDescription>
          </SlideItemContainer>
        </div>
        <div>
          <SlideItemContainer>
            <SlideImage src="/images/auth/auth-ads.png" alt="asd" />
            <SlideItemTitle>Connect and manage with your team!</SlideItemTitle>
            <SlideItemDescription>Aziest Jordan is one of the biggest superstars to have immerged from the professional designer in world.</SlideItemDescription>
          </SlideItemContainer>
        </div>
      </SlideCustom>
    </AuthAdsWrapper>
  );
}

export default React.memo(AuthAdsArea);
