import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      toast.success("Logget out!", { autoClose: 1500 });
    },
  },
});

export const { SetUser, logout } = userSlice.actions;
export default userSlice.reducer;
