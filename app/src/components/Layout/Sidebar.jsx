import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { toggleSidebar } from '@/features/admin/sidebar';
import { ReactComponent as LogoIcon } from '@/assets/images/svg/logo.svg';
import { COLORS, mobileQuery } from '@/constants/style';
import routes from '@/routes';

const Wrapper = styled.div`
  width: 235px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${mobileQuery} {
    position: fixed;
    left: -235px;
    z-index: 0;
    background: #fff;
    z-index: 50;
    transition: all .4s ease-in-out;
    &.active {
      left: 0;
      z-index: 50;
    }
  }
`;

const WrapperOverlay = styled.div`
  ${mobileQuery} {
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: rgba(0, 0, 0, .3);
    left: 0;
    top: 0;
    z-index: 49;
  }
`

const LogoWrapper = styled.a`
  display: flex;
  height: 81px;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid ${COLORS.GRAY};
  border-right: 1px solid ${COLORS.GRAY};
`;

const LogoText = styled.div`
  color: #0080ff;
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
`;

const MenuText = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.WHITE_BLUE};
  margin-left: 10px;
`;

const NavLinkStyle = styled(NavLink)`
  width: 100%;
  height: 100%;
  padding-left: 27px;
  border-left: 2px solid transparent;
  display: flex;
  align-items: center;

  &.active {
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
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);

  function closeSidebar() {
    dispatch(toggleSidebar(false))
  }

  return (
    <>
      {isOpen && <WrapperOverlay onClick={closeSidebar} /> }
      <Wrapper className={cn({ active: isOpen })}>
        <LogoWrapper href="/">
          <LogoIcon />
          <LogoText>
            <span>SaaS</span>
            <span>gear</span>
          </LogoText>
        </LogoWrapper>
        <MenuWrapper>
          <MenuList>
            {routes
              .filter((route) => route.isSidebar)
              .map((route) => (
                <MenuItem key={route.path}>
                  <NavLinkStyle to={route.path} activeClassName="active" onClick={closeSidebar}>
                    {route.icon}
                    <MenuText>{route.name}</MenuText>
                  </NavLinkStyle>
                </MenuItem>
              ))}
          </MenuList>
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default Sidebar;
