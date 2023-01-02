import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Carpet Spec. - FS Yachts",
    path: "t1",
    dk: "5",
    fireZone: "1",
    project: "FS Yachts",
    specification: "Carpet",
    team: "Agata,Tomek, Rafał",
    date: "Oct 19 2022",
    status: "50%",
  },
  {
    name: "Material Spec. - Disney",
    path: "t2",
    dk: "6",
    fireZone: "2",
    project: "1936 Disney",
    specification: "Material",
    team: "Agata,Tomek, Rafał",
    date: "Dec 29 2022",
    status: "50%",
  },
  {
    name: "Carpet Spec. - Princess",
    path: "t3",
    dk: "7",
    fireZone: "3",
    project: "Princess Sun",
    specification: "Carpet",
    team: "Agata,Tomek, Rafał",
    date: "Sep 11 2022",
    status: "50%",
  },
  {
    name: "Lighting Spec. - Allura",
    path: "t4",
    dk: "8",
    fireZone: "4",
    project: "NCL Allura",
    specification: "Decorative light",
    team: "Agata,Tomek, Rafał",
    date: "Aug 14 2022",
    status: "50%",
  },
  {
    name: "Material Spec - Leonardo",
    path: "t5",
    dk: "9",
    fireZone: "5",
    project: "FS Yachts",
    specification: "Material",
    team: "Agata,Tomek, Rafał",
    date: "Jun 17 2022",
    status: "50%",
  },
  {
    name: "Lighting Spec - Azamara",
    path: "t6",
    dk: "5",
    fireZone: "3-4",
    project: "Azamara",
    specification: "Decorative light",
    team: "Rafał, Dorota, Paweł",
    date: "Jan 01 2023",
    status: "50%",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTasks(state, action) {
      state.push({
        name: `${action.payload.task} - ${action.payload.name}`,
        area: `${action.payload.area}`,
        path: `t${state.length + 1}`,
        dk: "5",
        fireZone: "1",
        project: action.payload.name,
        specification: "Carpet",
        team: action.payload.team,
        date: action.payload.date,
        status: "0%",
      });
    },
    editTask(state, action) {
      state[action.payload.taskIndex].name = action.payload.task;
      state[action.payload.taskIndex].project = action.payload.name;
      state[action.payload.taskIndex].area = action.payload.area;
      state[action.payload.taskIndex].date = action.payload.date;
      state[action.payload.taskIndex].team = action.payload.team;
    },
    deleteTask(state, action) {
      state.splice(action.payload, 1);
    },
    replceTasks(state, action) {
      return action.payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
