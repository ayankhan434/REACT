import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth/authSlice";
export let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
