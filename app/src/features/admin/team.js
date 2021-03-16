import { createSlice } from '@reduxjs/toolkit';
import flatten from "lodash/flatten";

const initialState = {
  teams: [],
};

const team = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addNew(state, action) {
      const { data } = action.payload
      state.teams = [...state.teams, data]
    },
    addTeamMember(state, action) {
      const { teamID, data } = action.payload
      const teamIndex = state.teams.findIndex(it => it.teamID === teamID)
      state.teams[teamIndex].teamMembers = flatten([...state.teams[teamIndex].teamMembers, data])
    },
    setTeams(state, action) {
      const { teams } = action.payload
      state.teams = teams.map(it => ({ teamName: it.name, teamID: it.alias, teamMembers: [] }))
    },
    removeTeamMember(state, action) {
      const { memberId, teamId } = action.payload
      const teamIndex = state.teams.findIndex(it => it.teamID === teamId)
      console.log(state.teams)
      console.log(teamIndex)
      state.teams[teamIndex].teamMembers = [...state.teams[teamIndex].teamMembers].filter(it => it.userId !== memberId)
    }
  },
});

export const { addNew, addTeamMember, setTeams, removeTeamMember } = team.actions;

export default team.reducer;
