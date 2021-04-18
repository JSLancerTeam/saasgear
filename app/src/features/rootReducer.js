import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@/features/auth/user';
import userPlanSlice from '@/features/auth/userPlan';
import teamSlice from '@/features/admin/team';
import sidebarSlice from '@/features/admin/sidebar';

const rootReducer = combineReducers({
  user: userSlice,
  userPlan: userPlanSlice,
  team: teamSlice,
  sidebar: sidebarSlice,
});

export default rootReducer;
