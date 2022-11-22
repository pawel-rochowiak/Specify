import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = [
  { name: "Paweł", surname: "Rochowiak", token: "", isLoggedIn: false },
];

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    login(state, action) {
      if (action.payload.token) {
        const user = state.find((el) => el.token === action.payload.token);
        user.isLoggedIn = true;
      }
    }, //action.payload.token
    logout(state, action) {},
    addUser(state, action) {
      state.push({
        name: action.payload.name,
        surname: action.payload.surname,
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
      });
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
