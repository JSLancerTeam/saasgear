import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import verifyTokenQuery from "@/queries/teams/verifyInviteToken";
import getProfileQuery from "@/queries/auth/getProfile";
import joinTeamQuery from "@/queries/teams/joinTeam";
import logo from '@/assets/images/logo.png';

AcceptInvitation.propTypes = {

};

function AcceptInvitation() {
  const { invitationToken } = useParams()
  const [teamInfo, setTeamInfo] = useState(null)
  const history = useHistory()
  const [verify, { data, loading, error }] = useLazyQuery(verifyTokenQuery)
  const { data: userInfo, error: getProfileError, loading: getProfileLoading } = useQuery(getProfileQuery)
  const [joinTeam] = useMutation(joinTeamQuery)

  useEffect(() => {
    if (!getProfileLoading && userInfo?.profileUser) {
      if (userInfo?.profileUser) verify({ variables: { invitationToken } })
      else history.replace(`/auth/signin?invitation=${invitationToken}`)
    }
  }, [getProfileError, userInfo])

  useEffect(() => {
    if (!loading && data?.verifyInvitationToken) {
      setTeamInfo(data.verifyInvitationToken)
    }
    if (error) {
      history.push('/auth/signin')
    }
  }, [data, error, loading])


  async function handleUserJoinTeam(type) {
    try {
      await joinTeam({ variables: { token: invitationToken, type } })
      history.replace('/')
    } catch (e) {
      console.error(e)
    }
  }

  return loading && getProfileLoading ?
    <div> Loading ....</div>
    : <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <img className="h-48 w-auto" src={logo} alt="JSlancer" />
        <div className="p-10">
          <div className="text-3xl">Accept Invitation?</div>
          <div className="text-gray-400 mb-4">
            You&apos; ve been invitated to join <strong>{teamInfo?.teamName}</strong> by <strong>{teamInfo?.owner}</strong>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() => handleUserJoinTeam('accept')}
              className="group flex items-center justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleUserJoinTeam('decline')}
              className="group flex items-center justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out ml-2"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
}

export default AcceptInvitation;