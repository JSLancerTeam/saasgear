import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';

type It = {
  id?: string;
  name: string;
  alias: string;
}

type TeamsPayload = {
  teams: It[]
} 

type TeamMembers = {
  userName: string;
  userId: string;
  email: string;
  isOwner: boolean;
  status: string;
}

type AddTeamMemberPayload = {
  teamID: string;
  data: TeamMembers
}

type Teams = {
  id?: string;
  teamID?: string;
  teamName?: string;
  teamMembers: TeamMembers[];
}

type AddNewPayload = {
  data: Teams;
}

type State = {
  teams: Teams[]
}

const initialState: State = {
  teams: [],
};

const team = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addNew(state: State, action: PayloadAction<AddNewPayload>) {
      const { data } = action.payload;
      state.teams = [...state.teams, data];
    },
    addTeamMember(state: State, action: PayloadAction<AddTeamMemberPayload>) {
      const { teamID, data } = action.payload;
      const teamIndex = state.teams.findIndex((it) => it.teamID === teamID);
      state.teams[teamIndex].teamMembers = flatten([
        ...state.teams[teamIndex].teamMembers,
        data,
      ]);
    },
    setTeams(state: State, action: PayloadAction<TeamsPayload>) {
      const { teams } = action.payload;
      state.teams = teams.map((it: It) => ({
        teamName: it.name,
        teamID: it.alias,
        teamMembers: [],
      }));
    },
  },
});

export const { addNew, addTeamMember, setTeams } = team.actions;

export type { Teams, TeamMembers };

export default team.reducer;
