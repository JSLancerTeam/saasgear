const { COLOR } = require("@/constants/style");
const { default: styled } = require("styled-components");

export const SignUpFormContainer = styled.div`
  background: ${COLOR.WHITE};
  max-width: 300px;
`;
export const LogoHeader = styled.div`
  font-size: 21.6px;
  line-height: 26px;
  letter-spacing: 0.5px;
  color: ${COLOR.PRIMARY};
  font-weight: 500;
  margin-bottom: 7px;
`;
export const LogoHeaderName = styled.span`
  font-weight: 800;
`;
export const FormContent = styled.form`
  margin-bottom: 24px;
`
export const FormHeader = styled.div`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: ${COLOR.SAPPHIRE_BLUE};
  margin-bottom: 34px;
`;
export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormGroupLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2px;
  color: ${COLOR.WHITE_BLUE};
  mix-blend-mode: normal;
  opacity: 0.9;
  display: block;
  margin-bottom: 19px;
  text-transform: uppercase;
`
export const FormNote = styled.div`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${COLOR.SAPPHIRE_BLUE};
`
export const SignUpFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
export const SignUpFormLeft = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SignUpAds = styled.div`
  width: 55%;
  background: ${COLOR.PRIMARY};
  overflow: hidden;
`;