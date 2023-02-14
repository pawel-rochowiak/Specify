import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  target: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setTarget(state, action) {
      state.target = action.payload;
    },
    replaceTarget(state, action) {
      initialState = action.payload;
      return action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;

export default globalSlice;
