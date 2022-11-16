import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Princess Cruises",
    type: "NB",
    scope: "Public",
    date: "",
    team: "Anna, Hanna",
    path: "p1",
    area: [
      {
        name: "International Restaurant",
        deck: "7-9",
        fireZone: "4",
        subcontractor: "TSI",
      },
      {
        name: "Lido Pools",
        deck: "17-18",
        fireZone: "2-3",
        subcontractor: "DeWave",
      },
    ],
    projectTasks: [],
  },
  {
    name: "Four Seasons",
    type: "NB",
    scope: "Public",
    date: "",
    team: "Anna, Hanna",
    path: "p2",
    area: [
      {
        name: "4 seasons Lounge 1",
        deck: "5-6",
        fireZone: "2",
        subcontractor: "TSI",
      },
      {
        name: "4 seasons Lounge 2",
        deck: "7",
        fireZone: "4",
        subcontractor: "Molteni",
      },
    ],
    projectTasks: [],
  },
  {
    name: "MSC",
    type: "NB",
    scope: "Public",
    date: "",
    team: "Anna, Hanna",
    path: "p3",
    area: [
      {
        name: "MSC restaurant 1",
        deck: "5",
        fireZone: "1",
        subcontractor: "TSI",
      },
      {
        name: "MSC restaurant 2",
        deck: "9",
        fireZone: "2",
        subcontractor: "TSI",
      },
    ],
    projectTasks: [],
  },
  {
    name: "Crystal Cruises",
    type: "NB",
    scope: "Public",
    date: "",
    team: "Anna, Hanna",
    path: "p4",
    area: [
      {
        name: "MSC restaurant 1",
        deck: "5",
        fireZone: "1",
        subcontractor: "TSI",
      },
      {
        name: "MSC restaurant 2",
        deck: "9",
        fireZone: "2",
        subcontractor: "TSI",
      },
    ],
    projectTasks: [],
  },
  {
    name: "NCL",
    type: "NB",
    scope: "Public",
    date: "",
    team: "Anna, Hanna",
    path: "p5",
    area: [
      {
        name: "MSC restaurant 1",
        deck: "5",
        fireZone: "1",
        subcontractor: "TSI",
      },
      {
        name: "MSC restaurant 2",
        deck: "9",
        fireZone: "2",
        subcontractor: "TSI",
      },
    ],
    projectTasks: [],
  },
];

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    addProjects(state, action) {
      state.push({
        name: action.payload.name,
        type: action.payload.type,
        scope: action.payload.scope,
        date: action.payload.date,
        team: action.payload.team,
        path: `p${state.length + 1}`,
        area: [
          {
            name: "MSC restaurant 1",
            deck: "5",
            fireZone: "1",
            subcontractor: "TSI",
          },
          {
            name: "MSC restaurant 2",
            deck: "9",
            fireZone: "2",
            subcontractor: "TSI",
          },
        ],
        projectTasks: [],
      });
    },
    addAreas(state, action) {
      state[action.payload.project].area.push({
        name: action.payload.name,
        deck: action.payload.deck,
        fz: action.payload.fz,
        subcontractor: action.payload.subcontractor,
      });
    },
    replceProjects(state, action) {
      return action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice;
