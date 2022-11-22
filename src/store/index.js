import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasks-slice";
import librarySlice from "./library-slice";
import projectSlice from "./projects-slice";
import suppliersSlice from "./suppliers-slice";
import globalSlice from "./global-slice";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksSlice.reducer,
    projects: projectSlice.reducer,
    suppliers: suppliersSlice.reducer,
    library: librarySlice.reducer,
  },
});

export default store;
