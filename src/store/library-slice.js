import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let initialPersistLS = JSON.parse(window.localStorage.getItem("store"))?.library
  ? JSON.parse(window.localStorage.getItem("store")).library
  : initialState;

const librarySlice = createSlice({
  name: "library",
  initialState: initialPersistLS,
  reducers: {
    addMaterials(state, action) {
      const pushInto = (el, arr) => {
        arr.push(el);
        return arr;
      };
      const newMaterialObjMarkup = {
        name: action.payload.name,
        supplier: action.payload.supplier,
        collection: action.payload.collection,
        category: action.payload.category,
        certificates: action.payload.certificates,
        info: action.payload.info,
        image: action.payload.image,
        link: action.payload.link,
        url: action.payload.url,
        // path: `cat${state.length + 1}`,
      };

      if (state.find((el) => el.name === action.payload.category)) {
        state
          .find((el) => el.name === action.payload.category)
          .materials?.push(newMaterialObjMarkup);
      } else if (state.find((el) => el.name !== action.payload.category)) {
        state.push({
          name: action.payload.category,
          path: `cat${state.length + 1}`,
          materials: pushInto(newMaterialObjMarkup, []),
        });
      }
    },
    editMaterial(state, action) {
      const stateMat = state.find((el) => el.name === action.payload.category)
        .materials[action.payload.materialIndex];

      stateMat.name = action.payload.name ? action.payload.name : stateMat.name;
      stateMat.supplier = action.payload.supplier
        ? action.payload.supplier
        : stateMat.supplier;
      stateMat.collection = action.payload.collection
        ? action.payload.collection
        : stateMat.collection;
      stateMat.category = action.payload.category
        ? action.payload.category
        : stateMat.category;
      stateMat.certificates = action.payload.certificates
        ? action.payload.certificates
        : stateMat.certificates;
      stateMat.info = action.payload.info ? action.payload.info : stateMat.info;
      stateMat.image = action.payload.image
        ? action.payload.image
        : stateMat.image;
      stateMat.link = action.payload.link ? action.payload.link : stateMat.link;
      stateMat.url = action.payload.url ? action.payload.url : stateMat.url;
    },
    deleteMaterial(state, action) {
      if (action.payload.index === "") {
        const materialIndex = state
          .find((el) => el.name === action.payload.category)
          .materials.findIndex((el) => el.name === action.payload.name);

        state
          .find((el) => el.name === action.payload.category)
          .materials.splice(materialIndex, 1);
      } else {
        state
          .find((el) => el.name === action.payload.category)
          .materials.splice(action.payload.index, 1);
      }
    },
    replceLibrary(state, action) {
      initialPersistLS = action.payload;
      return action.payload;
    },
  },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
