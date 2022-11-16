import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import type { RootState } from '@/config/store';
import { toggleSidebar } from '@/features/admin/sidebar';
import { ReactComponent as LogoIcon } from '@/assets/images/svg/logo.svg';
import { COLORS } from '@/constants/style';
import routes from '@/routes';

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

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  function closeSidebar() {
    dispatch(toggleSidebar(false))
  }

  return (
    <>
      {isOpen && <div onClick={closeSidebar} role='presentation' className='sm:fixed sm:h-screen sm:w-screen overflow-hidden sm:left-0 sm:top-0 sm:z-[49] text-black opacity-30' /> }
      <div className={cn('w-[235px] h-screen flex flex-col sm:fixed sm:left-[-235px] sm:z-[50] sm:bg-white sm:transition-all sm:duration-[400ms] sm:active:left-0 sm:active:z-[50]', { active: isOpen })}>
        <a href="/" className='flex h-[81px] items-center pl-[30px] border-b border-r border-solid border-gray'>
          <LogoIcon />
          <div className='text-primary text-[22px] leading-[27px] font-medium ml-2 [&>span:first-child]:font-extrabold'>
            <span>SaaS</span>
            <span>gear</span>
          </div>
        </a>
        <div className='flex-grow'>
          <ul className='p-0 pr-[14px]'>
            {routes
              .filter((route) => route.isSidebar)
              .map((route) => (
                <li key={route.path} className='h-[60px] flex items-center'>
                  <NavLinkStyle to={route.path} activeClassName="active" onClick={closeSidebar}>
                    {route.icon}
                    <MenuText>{route.name}</MenuText>
                  </NavLinkStyle>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
