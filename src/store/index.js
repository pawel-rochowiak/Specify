import { createStore } from "redux";

const initialState = {
  tasks: [
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
  ],
  projects: [
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
      area: [],
      projectTasks: [],
    },
    {
      name: "NCL",
      type: "NB",
      scope: "Public",
      date: "",
      team: "Anna, Hanna",
      path: "p5",
      area: [],
      projectTasks: [],
    },
  ],
  suppliers: [
    {
      name: "Preciosa",
      field: "lighting",
      adress: {
        country: "Czech Republic",
        city: "n/a",
        street: "n/a",
        number: "n/a",
      },
      contactPerson: {
        fullName: "Pavel Kozel",
        email: "pavel.koziel@pepiczek.cz",
        tel: "0700-88-07-88",
      },
      matCollections: [
        {
          name: "Col1",
          materials: ["mat1", "mat2", "mat3"],
        },
        {
          name: "Col2",
          materials: ["mat4", "mat5", "ma6"],
        },
        {
          name: "Col3",
          materials: ["mat7", "mat8", "mat9"],
        },
      ],
      path: "s1",
    },
    {
      name: "Marine Interior",
      field: "manufacturer",
      adress: {
        country: "Italy",
        city: "n/a",
        street: "n/a",
        number: "n/a",
      },
      contactPerson: {
        fullName: "Pavel Kozel",
        email: "pavel.koziel@pepiczek.cz",
        tel: "0700-88-07-88",
      },
      matCollections: [],
      path: "s2",
    },
    {
      name: "TSI",
      path: "s3",
      field: "lighting",
      adress: {
        country: "Czech Republic",
        city: "n/a",
        street: "n/a",
        number: "n/a",
      },
      contactPerson: {
        fullName: "Pavel Kozel",
        email: "pavel.koziel@pepiczek.cz",
        tel: "0700-88-07-88",
      },
      matCollections: [
        {
          name: "Col44",
          materials: ["mat1", "mat2", "mat3"],
        },
        {
          name: "Col55",
          materials: ["mat1", "mat2", "mat3"],
        },
      ],
    },
  ],
  library: [
    { name: "Wood", path: "cat1", materials: [] },
    { name: "Tiles", path: "cat2", materials: [] },
    { name: "Curtain", path: "cat3", materials: [] },
    { name: "Upholstery", path: "cat4", materials: [] },
  ],
};

const addUserReducer = (state = initialState, action) => {
  // if ((action.type = "add")) {
  //   console.log("hej");
  // }
  return state;
};

const store = createStore(addUserReducer);

export default store;
