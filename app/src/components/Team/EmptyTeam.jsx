import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from '../Common/Button/Button';
import { DescContent, TitleContent } from '../Layout/blockStyle';

const Content = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: auto auto auto;
  width: 30%;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    border-radius: 100%;
  }
`;

const RightContent = styled.div`
  flex-grow: 1;
  padding-left: 32px;
`;

export default function EmptyTeam() {
  const history = useHistory();

  const fakeAvatars = useMemo(
    () =>
      Array.from(
        { length: 9 },
        () =>
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ),
    [],
  );

  return (
    <Content>
      <LeftContent>
        {fakeAvatars.map((it, index) => (
          <Avatar key={`${Math.random()}`}>
            <img src={it} alt={index} />
          </Avatar>
        ))}
      </LeftContent>
      <RightContent>
        <TitleContent>No Teams Yet!</TitleContent>
        <DescContent>Create your first team below to get started</DescContent>
        <Button color="primary" onClick={() => history.push('/teams/new')}>Create Team</Button>
      </RightContent>
    </Content>
  );
}

