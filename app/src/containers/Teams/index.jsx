/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import EmptyTeams from 'components/Team/EmptyTeams';
import ListTeam from 'components/Team/ListTeam';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { setTeams } from "@/features/admin/team";

import getTeamsQuery from "@/queries/teams/getTeams";

export default function Teams() {
  const { teams } = useSelector((state) => state.team);
  const { data, loading } = useQuery(getTeamsQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading)
      dispatch(setTeams({ teams: data?.teams }))
  }, [data, loading])

  return teams.length === 0
    ? <EmptyTeams />
    : <ListTeam teams={teams} />
}