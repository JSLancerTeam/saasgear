import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Actions
import { toggleSidebar } from '@/features/admin/sidebar';

import { resolveAvatarPath } from '@/helpers/avatar.helper';
import Avatar from '@/assets/images/avatar.jpg';
import { COLORS, mobileQuery } from '@/constants/style';
import { ReactComponent as ArrowDownIcon } from '@/assets/images/svg/arrow-down-18.svg';
import { ReactComponent as MenuIcon } from '@/assets/images/svg/menu.svg';
import Input from '@/components/Common/Input';

const Wrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 32px;
  position: relative;

  ${mobileQuery} {
    padding: 0 15px;
    height: 64px;
  }
`;

const LeftContent = styled.div`
  position: relative;

  ${mobileQuery} {
    width: 100%;
    margin-right: 15px;
  }

  & > input {
    ${mobileQuery} {
      height: 38px;
      padding-left: 30px;
    }
  }
`;

const MenuMobile = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  z-index: 15;

  ${mobileQuery} {
    display: block;
  }
`;

const RightContent = styled.div``;

const SearchInput = styled(Input)`
  width: 468px;
  border-color: #d2d5e1;

  ${mobileQuery} {
    width: 100%;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > svg {
    ${mobileQuery} {
      display: none;
    }
  }
`;

const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    object-fit: cover;

    ${mobileQuery} {
      width: 33.33px;
      height: 33.33px;
    }
  }
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin: 0 8px;

  ${mobileQuery} {
    display: none;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: calc(100% + 17px);
  right: 10px;
  width: 200px;

  ${mobileQuery} {
    top: 100%;
  }
`;

const ProfileList = styled.ul`
  position: relative;
  padding: 0;
  border: 1px solid #eaedf7;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(28, 41, 90, 0.0367952);
  background: #ffffff;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 0);
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #eaedf7;

    ${mobileQuery} {
      left: unset;
      right: 4px;
    }
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: calc(50%);
    bottom: 100%;
    transform: translate(-50%, 0);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #ffffff;

    ${mobileQuery} {
      left: unset;
      right: 8px;
    }
  }
`;
const ProfileItem = styled.li`
  list-style-type: none;
  height: 36px;
`;

const NavLinkStyle = styled(NavLink)`
  font-size: 14px;
  color: ${COLORS.SAPPHIRE_BLUE};
  padding-left: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  &.active {
    background-color: ${COLORS.REGULAR_PRIMARY};
  }
`;

const SignoutBtn = styled.button`
  font-size: 14px;
  color: ${COLORS.SAPPHIRE_BLUE};
  padding-left: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

const Topbar = ({ signout }) => {
  const dispath = useDispatch();
  const {
    data: { avatarUrl, name },
  } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const profileRef = useRef(null);

  function handleClickOutside(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsShowMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <LeftContent>
        <MenuMobile onClick={() => dispath(toggleSidebar(true))}>
          <MenuIcon />
        </MenuMobile>
        <SearchInput placeholder="Search..." />
      </LeftContent>
      <RightContent>
        <Profile onClick={() => setIsShowMenu(!isShowMenu)} ref={profileRef}>
          <AvatarWrapper>
            <img src={resolveAvatarPath(avatarUrl, Avatar)} alt="avatar" />
          </AvatarWrapper>
          <Name>{name}</Name>
          <ArrowDownIcon />
        </Profile>
      </RightContent>
      {isShowMenu && (
        <ProfileMenu>
          <ProfileList>
            <ProfileItem>
              <NavLinkStyle to="/profile">Profile</NavLinkStyle>
            </ProfileItem>
            <ProfileItem>
              <SignoutBtn onClick={signout}>Sign Out</SignoutBtn>
            </ProfileItem>
          </ProfileList>
        </ProfileMenu>
      )}
    </Wrapper>
  );
};

Topbar.propTypes = {
  signout: PropTypes.func,
};

export default Topbar;
