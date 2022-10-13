import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import verifyTokenQuery from '@/queries/teams/verifyInviteToken';
import getProfileQuery from '@/queries/auth/getProfile';
import joinTeamQuery from '@/queries/teams/joinTeam';
import Logo from '@/components/Common/Logo';
import {
  ForgotPasswordWrapper,
  Overlay,
  ForgotPasswordContainer,
  ForgotPasswordText,
  ForgotPasswordDescription,
  SquareIconTop,
  SmallSquareBottom,
  SmallSquareTop,
  SmallSquareGrid,
  SquareIconBottom,
  CircleIcon,
} from '@/components/Auth/AuthForm';
import Button from '@/components/Common/Button';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  button:first-child {
    margin-right: 32px;
  }
`;

function AcceptInvitation() {
  const { invitationToken } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const history = useHistory();
  const { t } = useTranslation();
  const [verify, { data, loading, error }] = useLazyQuery(verifyTokenQuery);
  const {
    data: userInfo,
    error: getProfileError,
    loading: getProfileLoading,
  } = useQuery(getProfileQuery);
  const [joinTeam] = useMutation(joinTeamQuery);

  useEffect(() => {
    if (!getProfileLoading && userInfo?.profileUser) {
      if (userInfo?.profileUser) verify({ variables: { invitationToken } });
      else history.replace(`/auth/signin?invitation=${invitationToken}`);
    }
  }, [getProfileError, userInfo]);

  useEffect(() => {
    if (!loading && data?.verifyInvitationToken) {
      setTeamInfo(data.verifyInvitationToken);
    }
    if (error) {
      history.push('/auth/signin');
    }
  }, [data, error, loading]);

  async function handleUserJoinTeam(type) {
    try {
      await joinTeam({ variables: { token: invitationToken, type } });
      history.replace('/');
    } catch (e) {
      console.error(e);
    }
  }

  return loading && getProfileLoading ? (
    <div> {t('common.text.loading')}</div>
  ) : (
    <ForgotPasswordWrapper>
      <Overlay />
      <ForgotPasswordContainer>
        <div>
          <Logo />
        </div>
        <ForgotPasswordText>{t('common.text.title')}</ForgotPasswordText>
        <ForgotPasswordDescription>
          {t('common.text.have-invitated')}{' '}
          <strong>{teamInfo?.teamName}</strong> {t('common.text.by')}{' '}
          <strong>{teamInfo?.owner}</strong>
        </ForgotPasswordDescription>
        <ButtonGroup>
          <Button color="primary" onClick={() => handleUserJoinTeam('accept')}>
            {t('common.text.accept')}
          </Button>
          <Button onClick={() => handleUserJoinTeam('decline')}>{t('common.text.decline')}</Button>
        </ButtonGroup>
        <SquareIconTop>
          <svg
            width="496"
            height="482"
            viewBox="0 0 496 482"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1H445C472.614 1 495 23.3858 495 51V481H50C22.3858 481 0 458.614 0 431V1Z"
              stroke="#2291FF"
            />
          </svg>
        </SquareIconTop>
        <SmallSquareBottom>
          <svg
            width="195"
            height="195"
            viewBox="0 0 195 195"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H145C172.614 0 195 22.3858 195 50V195H50C22.3858 195 0 172.614 0 145V0Z"
              fill="#0075E8"
            />
          </svg>
        </SmallSquareBottom>
        <SmallSquareTop>
          <svg
            width="114"
            height="121"
            viewBox="0 0 114 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H64C91.6142 0 114 22.3858 114 50V121H50C22.3858 121 0 98.6142 0 71V0Z"
              fill="#1788F8"
            />
          </svg>
        </SmallSquareTop>
        <SmallSquareGrid>
          <svg
            width="131"
            height="123"
            viewBox="0 0 131 123"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M129.844 121.5H1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 40"
              />
              <path
                d="M129.844 81.5H1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 40"
              />
              <path
                d="M129.844 41.5H1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 40"
              />
              <path
                d="M129.844 1.5H1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 40"
              />
            </g>
          </svg>
        </SmallSquareGrid>
        <SquareIconBottom>
          <svg
            width="594"
            height="523"
            viewBox="0 0 594 523"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H544C571.614 1 594 23.3858 594 51V529H51C23.3858 529 1 506.614 1 479V1Z"
              stroke="#2291FF"
            />
          </svg>
        </SquareIconBottom>
        <CircleIcon>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="29" stroke="#2291FF" />
          </svg>
        </CircleIcon>
      </ForgotPasswordContainer>
    </ForgotPasswordWrapper>
  );
}

export default AcceptInvitation;
