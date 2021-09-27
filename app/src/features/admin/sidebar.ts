import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
}

const initialState: InitialState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  }
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
