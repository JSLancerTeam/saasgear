import styled from 'styled-components';
import { COLORS } from '@/constants/style';

export const Table = styled.table`
  width: 100%;

  tr {
    height: 56px;
  }

  th {
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.WHITE_BLUE};
    text-align: left;
  }

  td {
    font-size: 14px;
    line-height: 24px;
    color: ${COLORS.SAPPHIRE_BLUE};
  }

  tbody {
    tr {
      &:nth-child(even) {
        background: ${COLORS.LIGHT_GRAY};
      }

      &:hover {
        background: ${COLORS.REGULAR_PRIMARY};
      }
    }
  }
`;
