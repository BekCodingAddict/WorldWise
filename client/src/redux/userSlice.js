import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      const loggedUser = {
        ...action.payload,
        avatar: `https://i.pravatar.cc/100?u=${action.payload.password}`,
      };
      state.user = loggedUser;
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { SetUser, logout } = userSlice.actions;
export default userSlice.reducer;
