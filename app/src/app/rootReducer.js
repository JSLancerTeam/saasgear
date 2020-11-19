import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '@/features/auth/user';

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
