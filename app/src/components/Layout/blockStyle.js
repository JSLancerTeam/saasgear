import styled from 'styled-components';
import { COLORS } from '@/constants/style';

export const TitlePage = styled.h3`
  font-weight: bold;
  font-size: 26px;
  line-height: 36px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 32px;
`;

export const ContentPage = styled.div`
  background: #FFFFFF;
  border: 1px solid #EAEDF7;
  box-shadow: 0px 2px 4px rgba(28, 41, 90, 0.0367952);
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 25px;
`;

export const TitleContent = styled.h5`
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 32px;
`;

export const DescContent = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: ${COLORS.WHITE_GRAY};
  margin-bottom: 14px;
`;