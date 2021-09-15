import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Profile = {
  id?: string;
  avatarUrl?: string;
  email?: string;
  name?: string;
  profileUser?: {
    invitationToken: string;
  }
}

type Error = {
  error: string | null
}

type ProfileUser = {
  data: Profile;
  loading: boolean;
}

type State = {
  data: Profile;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: {},
  error: null,
  loading: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileUser(state: State, action: PayloadAction<ProfileUser>) {
      const { data, loading } = action.payload;
      const dataUser = data || {};
      state.data = {...state.data, ...dataUser};
      state.loading = loading;
    },
    toggleToastError(state: State, action: PayloadAction<Error>) {
      const { error } = action.payload;
      state.error = error;
    },
  },
});

export const { setProfileUser, toggleToastError } = user.actions;

export default user.reducer;
