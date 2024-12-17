import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isSideBarOpen: false,
  },

  reducers: {
    setIsSidebarOpen: (state, actions) => {
      state.isSideBarOpen = actions.payload;
    },
  },
});

export const { setIsSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
