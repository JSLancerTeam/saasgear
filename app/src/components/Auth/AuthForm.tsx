import { COLORS, mobileQuery } from '@/constants/style';
import styled from 'styled-components/macro';

export const SignUpFormContainer = styled.div`
  background: ${COLORS.WHITE};
  max-width: 300px;
`;

export const FormContent = styled.form`
  margin-bottom: 24px;
`;

export const FormHeader = styled.div`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 34px;
`;

export const FormNote = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.SAPPHIRE_BLUE};
`;

export const SignUpFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;

  ${mobileQuery} {
    flex-direction: column;
    padding-top: 40px;
  }
`;

export const SignUpFormLeft = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobileQuery} {
    width: 100%;
  }
`;

export const SignUpAds = styled.div`
  width: 55%;
  background: ${COLORS.PRIMARY};
  overflow: hidden;

  ${mobileQuery} {
    display: none;
  }
`;

export const ForgotPasswordText = styled.div`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  color: #242f57;
  margin-top: 3px;
`;

export const ForgotPasswordDescription = styled.p`
  font-size: 14px;
  line-height: 24px;
  color: #242f57;
  max-width: 567px;
  margin: 24px auto 40px;
`;

export const ForgotPasswordFormWrapper = styled.form`
  width: 420px;
  margin: 0 auto;
  text-align: left;
  display: block;
`;

export const ForgotPasswordButton = styled.div`
  margin-top: 50px;
  display: block;
  text-align: center;
`;

export const TextNote = styled(FormNote)`
  text-align: center;
  margin-top: 69px;
`;

export const ConfirmationText = styled(ForgotPasswordDescription)`
  background: ${COLORS.GREEN};
  color: ${COLORS.WHITE};
  padding: 14px 15px;
  border-radius: 3px;
  font-size: 16px;
`;

export const ForgotPasswordWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ForgotPasswordContainer = styled.div`
  width: 762px;
  margin: 0 auto;
  text-align: center;
  background: ${COLORS.WHITE};
  padding: 40px;
  border-radius: 5px;
  position: relative;
`;

export const SquareIconTop = styled.div`
  position: absolute;
  width: 495px;
  height: 480px;
  left: -400px;
  top: -175px;
  z-index: -1;
`;

export const SmallSquareBottom = styled.div`
  position: absolute;
  width: 195px;
  height: 195px;
  left: -60px;
  bottom: -25px;
  z-index: -1;
`;

export const SmallSquareTop = styled.div`
  position: absolute;
  width: 114px;
  height: 121px;
  top: -57px;
  right: -54px;
  z-index: -1;
`;

export const SmallSquareGrid = styled.div`
  position: absolute;
  width: 129px;
  height: 121px;
  top: -105px;
  right: -300px;
`;

export const SquareIconBottom = styled.div`
  position: absolute;
  width: 593px;
  height: 528px;
  right: -400px;
  bottom: -190px;
  z-index: -1;
`;

export const CircleIcon = styled.div`
  position: absolute;
  width: 58px;
  height: 58px;
  bottom: -26px;
  right: 164px;
  z-index: -1;
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${COLORS.PRIMARY};
  z-index: -2;
`;
