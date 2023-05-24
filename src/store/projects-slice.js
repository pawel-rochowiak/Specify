import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let initialPersistLS = JSON.parse(window.localStorage.getItem("store"))
  ?.projects
  ? JSON.parse(window.localStorage.getItem("store")).projects
  : initialState;

const projectSlice = createSlice({
  name: "projects",
  initialState: initialPersistLS,
  reducers: {
    addProjects(state, action) {
      state.push({
        name: action.payload.name,
        type: action.payload.type,
        scope: action.payload.scope,
        date: action.payload.date,

        path: `p${state.length}`,
        area: [],
        projectTasks: [],
      });
    },
    deleteProject(state, action) {
      state.splice(action.payload.index, 1);
      state.map((el, index) => (el.path = `p${index}`));
    },
    editProject(state, action) {
      state[action.payload.projectIndex].name = action.payload.name;
      state[action.payload.projectIndex].type = action.payload.type;
      state[action.payload.projectIndex].scope = action.payload.scope;
      state[action.payload.projectIndex].date = action.payload.date;
    },
    addAreas(state, action) {
      state[action.payload.project].area.push({
        name: action.payload.name,
        deck: action.payload.deck,
        fz: action.payload.fz,
        subcontractor: action.payload.subcontractor,
      });
    },
    deleteProjectArea(state, action) {
      state[action.payload.sectionMainItemIndex].area.splice(
        +action.payload.index,
        1
      );
    },
    editProjectArea(state, action) {
      const editedArea = {
        name: action.payload.name,
        deck: action.payload.deck,
        fz: action.payload.fz,
        subcontractor: action.payload.subcontractor,
      };

      state[action.payload.project].area[
        action.payload.areaToEdit
      ] = editedArea;
    },

    replceProjects(state, action) {
      initialPersistLS = action.payload;
      return action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
