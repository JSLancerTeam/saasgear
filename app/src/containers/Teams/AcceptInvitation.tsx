import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import verifyTokenQuery from '@/queries/teams/verifyInviteToken';
import getProfileQuery from '@/queries/auth/getProfile';
import joinTeamQuery from '@/queries/teams/joinTeam';
import Logo from '@/components/Common/Logo';
import Button from '@/components/Common/Button';

type TeamInfo = {
  teamName?: string;
  owner?: string;
}

type Params = {
  invitationToken: string;
}

const AcceptInvitation: React.FC = () => {
  const { t } = useTranslation();
  const { invitationToken } = useParams<Params>();
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const history = useHistory();
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

  async function handleUserJoinTeam(type: 'accept' | 'decline') {
    try {
      await joinTeam({ variables: { token: invitationToken, type } });
      history.replace('/');
    } catch (e) {
      console.error(e);
    }
  }

  return loading && getProfileLoading ? (
    <div> {t('Common.text.loading')}</div>
  ) : (
    <div className="h-screen overflow-hidden flex w-full min-h-screen items-center justify-center relative">
      <div className="absolute w-full h-full bg-primary z-[-2]" />
      <div className="w-[762px] mx-auto my-0 text-center bg-white p-10 relative rounded-[5px]">
        <div>
          <Logo />
        </div>
        <div className="font-bold text-[26px] leading-9 text-sapphire_blue mt-[3px]">{t('Accept_invitation.title')}</div>
        <p className="text-[14px] leading-6 text-sapphire_blue max-w-[567px] mx-auto mt-6 mb-10">
          <Trans
            components={[<strong></strong>]}
            values={{ teamName: teamInfo?.teamName, owner: teamInfo?.owner }}
          >
            {t('Accept_invitation.have_invitated')}
          </Trans>
        </p>
        <div className="flex justify-center [&>button:first-child]:mr-8">
          <Button color="primary" onClick={() => handleUserJoinTeam('accept')}>
            {t('Accept_invitation.accept')}
          </Button>
          <Button onClick={() => handleUserJoinTeam('decline')}>{t('Accept_invitation.decline')}</Button>
        </div>
        <div className="absolute w-[495px] h-[480px] left-[-400px] top-[-175px] z-[-1]">
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
        </div>
        <div className="absolute w-[195px] h-[195px] left-[-60px] bottom-[-25px] z-[-1]">
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
        </div>
        <div className="absolute w-[114px] h-[121px] top-[-57px] right-[-54px] z-[-1]">
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
        </div>
        <div className="absolute w-[129px] h-[121px] top-[-105px] right-[-300px]">
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
        </div>
        <div className="absolute w-[593px] h-[528px] right-[-400px] bottom-[-190px] z-[-1]">
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
        </div>
        <div className="absolute w-[58px] h-[58px] bottom-[-26px] right-[164px] z-[-1]">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="29" stroke="#2291FF" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AcceptInvitation;
