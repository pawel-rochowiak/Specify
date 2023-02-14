import { createSlice } from "@reduxjs/toolkit";
import { fetchStateData } from "./all-actions";

const initialState = [{}];

// const getGet =

// const data = await fetchStateData();
// console.log(data);

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
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
    replceUsers(_, action) {
      initialState = action.payload;
      return action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
