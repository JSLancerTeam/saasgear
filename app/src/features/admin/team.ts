import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';

type It = {
  id?: number;
  name: string;
  alias: string;
}

type TeamPayload = {
  teams: It[]
} 

type ITeamMember = {
  userName?: string;
  userId?: number;
  email?: string;
  isOwner?: boolean;
  status: 'active' | 'inactive' | 'pending' | 'decline';
}

type AddTeamMemberPayload = {
  teamID: string;
  data: ITeamMember | ITeamMember[];
}

type Team = {
  id?: number;
  teamID?: string;
  teamName?: string;
  teamMembers?: ITeamMember[];
}

type AddNewPayload = {
  data: Team;
}

type State = {
  teams: Team[];
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
        ...state.teams[teamIndex].teamMembers ?? [],
        data,
      ]);
    },
    setTeams(state: State, action: PayloadAction<TeamPayload>) {
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

export type { Team, ITeamMember };

export default team.reducer;
