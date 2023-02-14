import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
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
      // state[action.payload.taskIndex].team = action.payload.team;
    },
    deleteTask(state, action) {
      state.splice(action.payload, 1);
      state.map((el, index) => (el.path = `t${index}`));
    },
    replceTasks(_, action) {
      initialState = action.payload;
      return action.payload;
    },
    addMaterials(state, action) {
      console.log("clicked");
      state[action.payload.index].materials = action.payload.materials;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
