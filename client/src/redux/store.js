import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import currentCitySlice from "./currentCitySlice";

const rootReducer = combineReducers({
  user: userSlice,
  currentCity: currentCitySlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
