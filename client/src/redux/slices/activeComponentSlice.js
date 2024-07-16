import { createSlice } from "@reduxjs/toolkit";

export const activeComponentSlice = createSlice({
  name: "activeComponent",
  initialState: "",
  reducers: {
    setActiveComponent: (state, action) => action.payload,
  },
});

export const { setActiveComponent } = activeComponentSlice.actions;
export default activeComponentSlice.reducer;
