import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileUser(state, action) {
      const { data, loading } = action.payload;
      const dataUser = data ? data.profileUser : {};
      state.data = dataUser;
      state.loading = loading;
    },
  },
});

export const { setProfileUser } = user.actions;

export default user.reducer;
