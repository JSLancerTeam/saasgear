import React from 'react';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '@/assets/css/react-slide-custom.css';
import { COLORS } from '@/constants/style';
import squareGrid from '@/assets/images/svg/square-grid.svg';
import squareRadiusPrimary from '@/assets/images/svg/square-radius-primary.svg';
import squareRadiusTopBig from '@/assets/images/svg/square-radius-top-big.svg';

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
  border: 1px solid ${COLORS.LIGHT_BLUE};
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
  color: ${COLORS.WHITE};
  margin-top: 82px;
  margin-bottom: 12px;
`
const SlideItemDescription = styled.div`
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: ${COLORS.WHITE};
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
        <img src={squareGrid} alt=""/>
      </AdsIconGrid>
      <AdsIconBlock>
        <img src={squareRadiusPrimary} alt=""/>
      </AdsIconBlock>
      <AdsCircleIcon>
      </AdsCircleIcon>
      <AdsBigBlock>
        <img src={squareRadiusTopBig} alt=""/>
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
