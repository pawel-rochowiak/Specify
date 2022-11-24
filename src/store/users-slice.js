import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    login(state, action) {
      if (action.payload) {
        const user = state.find((el) => el.email === action.payload.email);
        user.isLoggedIn = true;
      }
    },
    logout(state, action) {
      if (action.payload) {
        const user = state.find((el) => el.email === action.payload);
        user.isLoggedIn = !user.isLoggedIn;
      }
    },
    addUser(state, action) {
      state.push({
        name: action.payload.name,
        surname: action.payload.surname,
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
      });
    },
    replceUsers(_, action) {
      return action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
