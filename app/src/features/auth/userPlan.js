import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
};

const userPlan = createSlice({
  name: 'userPlan',
  initialState,
  reducers: {
    setUserPlan(state, action) {
      const { data, loading } = action.payload;
      const dataUserPlan = data || {};
      state.data = dataUserPlan;
      state.loading = loading || false;
    },
  },
});

export const { setUserPlan } = userPlan.actions;

export default userPlan.reducer;
