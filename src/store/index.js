import { createSlice, configureStore } from "@reduxjs/toolkit";

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

// export const fetchState = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json"
//       );

//       if (!response.ok) {
//         throw new Error("Could not fetch App state!");
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const initialState = await fetchData();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

const allSlice = createSlice({
  name: "all",
  initialState: initialState,
  reducers: {
    test(state) {
      console.log("test1 dispatched");
    },
    test2(state, action) {
      console.log(`print ${action.payload}`);
    },
  },
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState.tasks,
  reducers: {
    addTasks(state, action) {
      state.push({
        name: `${action.payload.task} - ${action.payload.name}`,
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
  },
});

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: initialState.suppliers,
  reducers: {
    addSuppliers(state, action) {
      state.push({
        name: action.payload.name,
        field: action.payload.field,
        adress: {
          country: action.payload.country,
          city: action.payload.city,
          street: action.payload.street,
          number: action.payload.number,
        },
        contactPerson: {
          fullName: action.payload.fullName,
          email: action.payload.email,
          tel: action.payload.tel,
        },
        matCollections: [],
        path: `p${state.length + 1}`,
      });
    },
    addCollection(state, action) {
      const newMaterialObjMarkup = {
        name: action.payload.name,
        supplier: action.payload.supplier,
        collection: action.payload.collection
          ? action.payload.collection
          : action.payload.existingCollection,
        category: action.payload.category
          ? action.payload.category
          : action.payload.existingCategory,
        certificates: action.payload.certificates,
        info: action.payload.info,
        image: action.payload.image,
        link: action.payload.link,
        path: `cat${state.length + 1}`,
      };

      const materialCollection = state
        .find(action.payload.findSupplier)
        .matCollections.find(action.payload.findCollection);

      if (materialCollection) {
        materialCollection.materials.push(newMaterialObjMarkup);
      } else if (!materialCollection) {
        state.find(action.payload.findSupplier).matCollections.push({
          name: action.payload.collection
            ? action.payload.collection
            : action.payload.existingCollection,
          materials: action.payload.pushInto(newMaterialObjMarkup, []),
        });
      }
    },
  },
});

const projectSlice = createSlice({
  name: "projects",
  initialState: initialState.projects,
  reducers: {
    addProjects(state, action) {
      state.push({
        name: action.payload.name,
        type: action.payload.type,
        scope: action.payload.scope,
        date: action.payload.date,
        team: action.payload.team,
        path: `p${state.length + 1}`,
        area: [],
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
  },
});

const librarySlice = createSlice({
  name: "library",
  initialState: initialState.library,
  reducers: {
    addMaterials(state, action) {
      const newMaterialObjMarkup = {
        name: action.payload.name,
        supplier: action.payload.supplier,
        collection: action.payload.collection
          ? action.payload.collection
          : action.payload.existingCollection,
        category: action.payload.category
          ? action.payload.category
          : action.payload.existingCategory,
        certificates: action.payload.certificates,
        info: action.payload.info,
        image: action.payload.image,
        link: action.payload.link,
        path: `cat${state.length + 1}`,
      };

      if (state.find(action.payload.findCategory)) {
        state
          .find(action.payload.findCategory)
          .materials.push(newMaterialObjMarkup);
      } else if (!state.find(action.payload.findCategory)) {
        state.push({
          name: action.payload.category,
          path: `cat${state.length + 1}`,
          materials: action.payload.pushInto(newMaterialObjMarkup, []),
        });
      }
    },
  },
});

const store = configureStore({
  reducer: {
    all: allSlice.reducer,
    tasks: tasksSlice.reducer,
    projects: projectSlice.reducer,
    suppliers: suppliersSlice.reducer,
    library: librarySlice.reducer,
  },
});

export const allSLiceActions = allSlice.actions;
export const tasksActions = tasksSlice.actions;
export const projectActions = projectSlice.actions;
export const suppliersActions = suppliersSlice.actions;
export const libraryActions = librarySlice.actions;

export default store;
