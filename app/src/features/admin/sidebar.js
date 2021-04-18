import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => ({
      ...state,
      isOpen: action.payload,
    }),
  }
});


export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
