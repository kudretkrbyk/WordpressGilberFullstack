import { configureStore } from "@reduxjs/toolkit";
import activeComponentSlice from "./slices/activeComponentSlice";

export const store = configureStore({
  reducer: {
    activeComponent: activeComponentSlice,
  },
});

export default store;
