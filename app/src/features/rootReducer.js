import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@/features/auth/user';
import userPlanSlice from '@/features/auth/userPlan';
import teamSlice from '@/features/admin/team';

const rootReducer = combineReducers({
  user: userSlice,
  userPlan: userPlanSlice,
  team: teamSlice,
});

export default rootReducer;
