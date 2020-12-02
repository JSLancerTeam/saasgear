import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileUser(state, action) {
      const { data, loading } = action.payload;
      const dataUser = data || {};
      state.data = dataUser;
      state.loading = loading;
    },
    toggleToastError(state, action) {
      const { error } = action.payload;
      state.error = error;
    },
  },
});

export const { setProfileUser, toggleToastError } = user.actions;

export default user.reducer;
