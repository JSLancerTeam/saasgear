import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@/assets/images/avatar.png';
import { COLORS } from '@/constants/style';
import { ReactComponent as ArrowDownIcon } from '@/assets/images/svg/arrow-down-18.svg';
import Input from '../Common/Input/Input';

const Wrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 32px;
  position: relative;
`;

const LeftContent = styled.div``;

const RightContent = styled.div``;

const SearchInput = styled(Input)`
  width: 468px;
  border-color: #D2D5E1;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 100%;
  }
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin: 0 8px;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: calc(100% + 17px);
  right: 0;
  width: 272px;
`;

const ProfileList = styled.ul`
  position: relative;
  padding: 0;
  border: 1px solid #EAEDF7;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(28, 41, 90, 0.0367952);
  background: #FFFFFF;

  &:before {
    content: '';
    display: block;  
    position: absolute;
    left: 36px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #EAEDF7;
  }

  &:after {
    content: '';
    display: block;  
    position: absolute;
    left: 36px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #FFFFFF;
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
`;

const Topbar = ({ signout, user }) => {
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
  })

  return (
    <Wrapper>
      <LeftContent>
        <SearchInput placeholder="Search..." />
      </LeftContent>
      <RightContent>
        <Profile onClick={() => setIsShowMenu(!isShowMenu)} ref={profileRef}>
          <AvatarWrapper>
            <img src={Avatar} alt="avatar" />
          </AvatarWrapper>
          <Name>{user?.name}</Name>
          <ArrowDownIcon />
        </Profile>
      </RightContent>
      {isShowMenu && (
        <ProfileMenu>
          <ProfileList>
            <ProfileItem>
              <NavLinkStyle to="/profile" activeClassName="active">Profle</NavLinkStyle>
            </ProfileItem>
            <ProfileItem>
              <NavLinkStyle to="/account-settings" activeClassName="active">Accout Settings</NavLinkStyle>
            </ProfileItem>
            <ProfileItem>
              <SignoutBtn onClick={signout}>Sign Out</SignoutBtn>
            </ProfileItem>
          </ProfileList>
        </ProfileMenu>
      )}
    </Wrapper>
  );
}

Topbar.propTypes = {
  signout: PropTypes.func,
  user: PropTypes.object,
}

export default Topbar;