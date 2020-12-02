import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@/features/auth/user';
import userPlanSlice from '@/features/auth/userPlan';

const rootReducer = combineReducers({
  user: userSlice,
  userPlan: userPlanSlice,
});

export default rootReducer;
