import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { setTeams } from "@/features/admin/team";
import getTeamsQuery from "@/queries/teams/getTeams";
import EmptyTeam from '@/components/Team/EmptyTeam';
import ListTeam from '@/components/Team/ListTeam';

export default function ListTeamContainer() {
  const { teams } = useSelector((state) => state.team);
  const { data, loading } = useQuery(getTeamsQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading)
      dispatch(setTeams({ teams: data?.teams }))
  }, [data, loading])

  return teams.length > 0 ? <ListTeam teams={teams} /> : <EmptyTeam />
}