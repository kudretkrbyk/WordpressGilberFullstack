import { configureStore } from "@reduxjs/toolkit";
import activeComponentSlice from "./slices/activeComponentSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    activeComponent: activeComponentSlice,
    auth: authSlice, // Add auth slice here
  },
});

export default store;
