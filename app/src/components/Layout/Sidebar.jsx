import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as LogoIcon } from '@/assets/images/svg/logo.svg';
import { ReactComponent as DashboardIcon } from '@/assets/images/svg/dashboard.svg';
import { ReactComponent as DocumentIcon } from '@/assets/images/svg/document.svg';
import { COLORS } from '@/constants/style';

const Wrapper = styled.div`
  width: 235px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.a`
  display: flex;
  height: 81px;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid ${COLORS.GRAY};
  border-right: 1px solid ${COLORS.GRAY};
`;

const LogoText = styled.div`
  color: #0080FF;
  font-size: 22px;
  line-height: 27px;
  font-weight: 500;
  margin-left: 8px;

  span:first-child {
    font-weight: 800;
  }
`;

const MenuWrapper = styled.div`
  flex-grow: 1;
`;

const MenuList = styled.ul`
  padding: 0;
  padding-right: 14px;
`;

const MenuItem = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 27px;
  border-left: 2px solid transparent;

  ${(props) => props.active && css`
    border-radius: 0px 10px 10px 0px;
    background-color: ${COLORS.REGULAR_PRIMARY};
    border-left-color: ${COLORS.PRIMARY};

    ${MenuText} {
      color: ${COLORS.PRIMARY};
      font-weight: 500;
    }

    svg {
      *[fill] {
        fill: ${COLORS.PRIMARY};
      }
      *[stroke] {
        stroke: ${COLORS.PRIMARY};
      }
    }
  `}
`;

const MenuText = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.WHITE_BLUE};
  margin-left: 10px;
`;

const Sidebar = () => (
  <Wrapper>
    <LogoWrapper href="/">
      <LogoIcon />
      <LogoText>
        <span>SaaS</span>
        <span>gear</span>
      </LogoText>
    </LogoWrapper>
    <MenuWrapper>
      <MenuList>
        <MenuItem active>
          <DashboardIcon />
          <MenuText>Dashboard</MenuText>
        </MenuItem>
        <MenuItem>
          <DocumentIcon />
          <MenuText>Document</MenuText>
        </MenuItem>
      </MenuList>
    </MenuWrapper>
  </Wrapper>
);

export default Sidebar;