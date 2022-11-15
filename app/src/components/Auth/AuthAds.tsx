import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '@/assets/css/react-slide-custom.css';
import { COLORS } from '@/constants/style';
import squareGrid from '@/assets/images/svg/square-grid.svg';
import squareRadiusPrimary from '@/assets/images/svg/square-radius-primary.svg';
import squareRadiusTopBig from '@/assets/images/svg/square-radius-top-big.svg';

const SlideCustom = styled(Slide)`
  max-width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  margin: 0 auto;
  max-width: 100%;
`;

const SlideItemTitle = styled.h4`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${COLORS.WHITE};
  margin-top: 82px;
  margin-bottom: 12px;
`;

const SlideItemDescription = styled.div`
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: ${COLORS.WHITE};
`;

const SlideItemContainer = styled.div`
  max-width: 80%;
  display: block;
  margin: 0 auto;
  text-align: center;
`;

const AuthAdsArea: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-center items-center h-full relative'>
      <div className='absolute w-[129px] h-[121px] top-[164px] right-[50px]'>
        <img src={squareGrid} alt="" />
      </div>
      <div className='absolute top-[180px] left-[56px]'>
        <img src={squareRadiusPrimary} alt="" />
      </div>
      <div className='absolute left-[38px] bottom-[110px] border-[1px] border-solid border-light_blue rounded-[50%] w-[58px] h-[58px]' />
      <div className='absolute left-[26.52%] right-0 bottom-0 top-[44.01%]'>
        <img src={squareRadiusTopBig} alt="" />
      </div>
      <div className='.slide-container'>
        <SlideCustom
          easing="ease"
          arrows={false}
          canSwipe={false}
          duration={3000}
          indicators
        >
          <div>
            <SlideItemContainer>
              <SlideImage src="https://placeimg.com/517/337/any" alt="asd" />
              <SlideItemTitle>{t('Advertisement.ad1_title')}</SlideItemTitle>
              <SlideItemDescription>
                {t('Advertisement.ad1')}
              </SlideItemDescription>
            </SlideItemContainer>
          </div>
          <div>
            <SlideItemContainer>
              <SlideImage src="https://placeimg.com/517/337/any" alt="asd" />
              <SlideItemTitle>{t('Advertisement.ad2_title')}</SlideItemTitle>
              <SlideItemDescription>
                {t('Advertisement.ad2')}
              </SlideItemDescription>
            </SlideItemContainer>
          </div>
          <div>
            <SlideItemContainer>
              <SlideImage src="https://placeimg.com/517/337/any" alt="asd" />
              <SlideItemTitle>{t('Advertisement.ad3_title')}</SlideItemTitle>
              <SlideItemDescription>
                {t('Advertisement.ad3')}
              </SlideItemDescription>
            </SlideItemContainer>
          </div>
        </SlideCustom>
      </div>
    </div>
  );
};
export default React.memo(AuthAdsArea);
