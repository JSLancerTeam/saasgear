import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import type { RootState } from '@/config/store';
import { toggleSidebar } from '@/features/admin/sidebar';
import { ReactComponent as LogoIcon } from '@/assets/images/svg/logo.svg';
import routes from '@/routes';
import Dropdown from '@/containers/Dashboard/DropDown';

interface SidebarProps {
  options: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ options }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  function closeSidebar() {
    dispatch(toggleSidebar(false));
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          role="presentation"
          className="sm:fixed sm:h-screen sm:w-screen overflow-hidden sm:left-0 sm:top-0 sm:z-[49] text-black opacity-30"
        />
      )}
      <div
        className={cn(
          'w-[235px] h-screen flex flex-col sm:fixed sm:left-[-235px] sm:z-[50] sm:bg-white sm:transition-all sm:duration-[400ms] sm:active:left-0 sm:active:z-[50]',
          { active: isOpen },
        )}
      >
        <a
          href="/"
          className="flex h-[81px] items-center pl-[30px] border-b border-r border-solid border-gray"
        >
          <LogoIcon />
          <div className="text-primary text-[22px] leading-[27px] font-medium ml-2 [&>span:first-child]:font-extrabold">
            <span>{t('Common.logo.saas')}</span>
            <span>{t('Common.logo.gear')}</span>
          </div>
        </a>
        <div className="flex-grow">
          <div className='mb-2 w-full pl-[27px] border-l-2 border-solid border-transparent flex items-center [&.active]:rounded-r-[10px] [&.active]:rounded-b-[10px] [&.active]:rounded-t-[0px] [&.active]:rounded-l-[0px] [&.active]:bg-regular-primary [&.active]:border-primary [&.active>.menu-text]:text-primary [&.active>.menu-text]:font-medium [&.active>svg_*[fill]]:fill-primary [&.active>svg_*[stroke]]:stroke-primary'>
            <Dropdown options={options} />
          </div>
          <ul className="p-0 pr-[14px]">
            {routes
              .filter((route) => route.isSidebar)
              .map((route) => (
                <li key={route.path} className="h-[60px] flex items-center">
                  <NavLink
                    to={route.path}
                    activeClassName="active"
                    onClick={closeSidebar}
                    className="w-full h-full pl-[27px] border-l-2 border-solid border-transparent flex items-center [&.active]:rounded-r-[10px] [&.active]:rounded-b-[10px] [&.active]:rounded-t-[0px] [&.active]:rounded-l-[0px] [&.active]:bg-regular-primary [&.active]:border-primary [&.active>.menu-text]:text-primary [&.active>.menu-text]:font-medium [&.active>svg_*[fill]]:fill-primary [&.active>svg_*[stroke]]:stroke-primary"
                  >
                    {route.icon}
                    <span className="menu-text text-[18px] leading-[22px] text-white-blue ml-[10px]">
                      {route.name}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
