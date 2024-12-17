import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import currentCitySlice from "./currentCitySlice";
import sidebarSlice from "./sidebarSlice";

const rootReducer = combineReducers({
  user: userSlice,
  currentCity: currentCitySlice,
  sidebar: sidebarSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
