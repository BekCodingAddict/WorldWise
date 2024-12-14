import { createSlice } from "@reduxjs/toolkit";

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState: {
    currentCity: {},
  },
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setCurrentCity } = currentCitySlice.actions;
export default currentCitySlice.reducer;
