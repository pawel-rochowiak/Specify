import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

let initialPersistLS = JSON.parse(window.localStorage.getItem("store"))?.users
  ? JSON.parse(window.localStorage.getItem("store")).users
  : initialState;

const usersSlice = createSlice({
  name: "users",
  initialState: initialPersistLS,
  reducers: {
    login(state, action) {
      if (action.payload) {
        const user = state.find((el) => el.email === action.payload.email);
        user.isLoggedIn = true;
        user.token = action.payload.idToken;
      }
    },
    logout(state, action) {
      if (action.payload) {
        const user = state.find((el) => el.email === action.payload);
        user.token = "";
        user.isLoggedIn = !user.isLoggedIn;
        localStorage.clear();
      }
    },
    addUser(state, action) {
      state.push({
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
      });
    },
    addUserError(state, action) {
      state.find((user) => user.email === action.payload.email).error =
        action.payload.error;
    },
    removeUserError(state, action) {
      const user = state.find((el) => el.email === action.payload.email);
      console.log(user);
      if (user.error) delete user.error;
    },
    replceUsers(_, action) {
      initialPersistLS = action.payload;
      return action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
