import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from '@apollo/react-hooks';

import ListTeamMember from "@/components/Team/ListTeamMember";
import { addTeamMember } from "@/features/admin/team";
import getTeamDetailQuery from "@/queries/teams/getTeamDetail";
import InviteMember from "./InviteMember";
import TeamDetails from "./TeamDetails";

export default function EditTeam() {
  const { teamId } = useParams()
  const { teams } = useSelector((state) => state.team);
  const [currentTeam, setCurrentTeam] = useState()
  const { data, loading } = useQuery(getTeamDetailQuery, { variables: { alias: teamId } });
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!loading) {
      dispatch(addTeamMember({ teamID: teamId, data: data?.getTeamDetail, }))
    }
  }, [data, loading])

  useEffect(() => {
    const team = teams.find(it => it.teamID === teamId)
    if (teamId && team) {
      setCurrentTeam(team)
    } else {
      history.replace('/teams')
    }
  }, [teams])

  return currentTeam ? <>
    <TeamDetails team={currentTeam} />
    <div className="border-2 p-8 rounded shadow mt-4">
      <div className="text-xl">Team Members</div>
      <ListTeamMember teamMembers={currentTeam?.teamMembers.filter(it => it.status !== 'pending')} />
    </div>
    <InviteMember alias={teamId} teamMembers={currentTeam?.teamMembers.filter(it => it.status === 'pending')} />
  </> : null
}