import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let initialPersistLS = JSON.parse(window.localStorage.getItem("store"))?.tasks
  ? JSON.parse(window.localStorage.getItem("store")).tasks
  : initialState;

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialPersistLS,
  reducers: {
    addTasks(state, action) {
      state.push({
        name: `${action.payload.task} - ${action.payload.name}`,
        area: `${action.payload.area}`,
        path: `t${state.length}`,
        dk: action.payload.dk,
        fireZone: action.payload.fz,
        project: action.payload.name,
        number: action.payload.number,
        specification: action.payload.task,
        resPerson: action.payload.resPerson,
        date: action.payload.date,
      });
    },
    editTask(state, action) {
      state[action.payload.taskIndex].name = action.payload.task;
      state[action.payload.taskIndex].project = action.payload.name;
      state[action.payload.taskIndex].number = action.payload.number;
      state[action.payload.taskIndex].dk = action.payload.dk;
      state[action.payload.taskIndex].fz = action.payload.fz;
      state[action.payload.taskIndex].area = action.payload.area;
      state[action.payload.taskIndex].date = action.payload.date;
    },
    addTaskEditDate(state, action) {
      state[action.payload.taskIndex].editedOn = action.payload.dateString;
    },
    deleteTask(state, action) {
      state.splice(action.payload, 1);
      state.map((el, index) => (el.path = `t${index}`));
    },
    replceTasks(_, action) {
      initialPersistLS = action.payload;
      return action.payload;
    },
    addMaterials(state, action) {
      state[action.payload.index].materials = action.payload.materials;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
