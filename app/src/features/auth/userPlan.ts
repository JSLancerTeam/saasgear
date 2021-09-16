import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  data: {
    id?: number;
    userId?: number;
    productId?: number;
    priceId?: number;
    name?: string;
    amount?: number;
    productType: string;
    priceType?: string;
    expiredAt?: Date;
    deletedAt?: Date;
  }
  loading?: boolean;
}

const initialState: State = {
  data: {
    productType: ''
  },
  loading: false,
};

const userPlan = createSlice({
  name: 'userPlan',
  initialState,
  reducers: {
    setUserPlan(state: State, action: PayloadAction<State>) {
      const { data, loading } = action.payload;
      const dataUserPlan = data || {};
      state.data = dataUserPlan;
      state.loading = loading || false;
    },
  },
});

export const { setUserPlan } = userPlan.actions;

export default userPlan.reducer;
