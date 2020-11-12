import { combineReducers } from '@reduxjs/toolkit';

import todoSlide from '@/features/todoSlice';
import userSlice from '@/features/auth/user';

const rootReducer = combineReducers({
  todo: todoSlide,
  user: userSlice,
});

export default rootReducer;
