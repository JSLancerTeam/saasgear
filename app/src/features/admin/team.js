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
    }
  },
});

export const { addNew, addTeamMember, setTeams } = team.actions;

export default team.reducer;
