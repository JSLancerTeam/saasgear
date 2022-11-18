import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Actions
import { toggleSidebar } from '@/features/admin/sidebar';

import type { RootState } from '@/config/store';
import { resolveAvatarPath } from '@/helpers/avatar.helper';
import Avatar from '@/assets/images/avatar.jpg';
import { ReactComponent as ArrowDownIcon } from '@/assets/images/svg/arrow-down-18.svg';
import { ReactComponent as MenuIcon } from '@/assets/images/svg/menu.svg';
import Input from '@/components/Common/Input';

type Props = {
  signout: () => void;
}

const Topbar: React.FC<Props> = ({ signout }) => {
  const dispath = useDispatch();
  const { t } = useTranslation();
  const {
    data: { avatarUrl, name },
  } = useSelector((state: RootState) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const profileRef = useRef<HTMLElement>(null) as React.MutableRefObject<HTMLDivElement>;

  function handleClickOutside(e: MouseEvent) {
    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setIsShowMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='h-[80px] flex items-center justify-between pl-[25px] pr-[32px] relative sm:py-0 sm:px-[15px] sm:h-16'>
      <div className='relative sm:w-full sm:mr-[15px] [&>input]:sm:h-[38px] [&>input]:sm:pl-[30px]'>
        <div onClick={() => dispath(toggleSidebar(true))} role='presentation' className='hidden absolute top-1/2 translate-y-[-50%] left-[10px] z-[15] sm:block'>
          <MenuIcon />
        </div>
        <Input placeholder="Search..." className='w-[468px] border-[#d2d5e1] sm:w-full' />
      </div>
      <div>
        <div onClick={() => setIsShowMenu(!isShowMenu)} ref={profileRef} role='presentation' className='flex items-center cursor-pointer [&>svg]:sm:hidden'>
          <div className='w-[50px] h-[50px] flex justify-center items-center topbar_avatar'>
            <img src={resolveAvatarPath(avatarUrl, Avatar)} alt="avatar" />
          </div>
          <span className='font-medium text-[18px] leading-[22px] text-sapphire_blue mx-2 my-0 sm:hidden'>{name}</span>
          <ArrowDownIcon />
        </div>
      </div>
      {isShowMenu && (
        <div className='absolute top-[calc(100%_+_17px)] right-[10px] w-[200px] sm:top-full'>
          <ul className="relative p-0 border border-solid border-dark_grey rounded-[5px] shadow-xsl bg-white before:content-[''] before:block before:absolute before:left-1/2 before:bottom-full before:translate-x-[-1/2] before:translate-y-0 before:w-0 before:h-0 before:border-[12px] before:border-solid before:border-transparent before:border-b-dark_grey sm:before:left-[unset] sm:before:right-1 after:content-[''] after:block after:absolute after:left-1/2 after:bottom-full after:translate-x-[-1/2] after:translate-y-0 after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-b-white sm:after:left-[unset] sm:after:right-2">
            <li className='list-none h-9'>
              <NavLink to="/profile" className="text-[14px] text-sapphire_blue pl-6 overflow-hidden flex items-center w-full h-full active:bg-regular_primary">
                {t('Common.title.profile')}
              </NavLink>
            </li>
            <li className='list-none h-9'>
              <button type="button" onClick={signout} className='text-[14px] text-sapphire_blue pl-6 overflow-hidden flex items-center w-full h-full border-none outline-none bg-transparent cursor-pointer'>
                {t('Common.title.sign_out')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Topbar;
