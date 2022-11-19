import React from 'react';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '@/assets/css/react-slide-custom.css';
import squareGrid from '@/assets/images/svg/square-grid.svg';
import squareRadiusPrimary from '@/assets/images/svg/square-radius-primary.svg';
import squareRadiusTopBig from '@/assets/images/svg/square-radius-top-big.svg';

const AuthAdsArea: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-full relative">
      <div className="absolute w-[129px] h-[121px] top-[164px] right-[50px]">
        <img src={squareGrid} alt="" />
      </div>
      <div className="absolute top-[180px] left-[56px]">
        <img src={squareRadiusPrimary} alt="" />
      </div>
      <div className="absolute left-[38px] bottom-[110px] border-[1px] border-solid border-light_blue rounded-[50%] w-[58px] h-[58px]" />
      <div className="absolute left-[26.52%] right-0 bottom-0 top-[44.01%]">
        <img src={squareRadiusTopBig} alt="" />
      </div>
      <div className="max-w-full h-full [&>div]:h-full">
        <Slide
          easing="ease"
          arrows={false}
          canSwipe={false}
          duration={3000}
          indicators
        >
          <div>
            <div className="max-w-[80%] block mx-auto my-0 text-center">
              <img src="https://placeimg.com/517/337/any" alt="asd" className="mx-auto my-0 max-w-full" />
              <h4 className="font-bold text-[26px] leading-[36px] text-center tracking-[0.5px] text-white mt-[82px] mb-[12px]">
                {t('Advertisement.ad1_title')}
              </h4>
              <div className="text-[14px] leading-6 text-center text-white">
                {t('Advertisement.ad1')}
              </div>
            </div>
          </div>
          <div>
            <div className="max-w-[80%] block mx-auto my-0 text-center">
              <img src="https://placeimg.com/517/337/any" alt="asd" className="mx-auto my-0 max-w-full" />
              <div className="font-bold text-[26px] leading-[36px] text-center tracking-[0.5px] text-white mt-[82px] mb-[12px]">
                {t('Advertisement.ad2_title')}
              </div>
              <div className="text-[14px] leading-6 text-center text-white">
                {t('Advertisement.ad2')}
              </div>
            </div>
          </div>
          <div>
            <div className="max-w-[80%] block mx-auto my-0 text-center">
              <img src="https://placeimg.com/517/337/any" alt="asd" className="mx-auto my-0 max-w-full" />
              <div className="font-bold text-[26px] leading-[36px] text-center tracking-[0.5px] text-white mt-[82px] mb-[12px]">
                {t('Advertisement.ad3_title')}
              </div>
              <div className="text-[14px] leading-6 text-center text-white">
                {t('Advertisement.ad3')}
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};
export default React.memo(AuthAdsArea);
