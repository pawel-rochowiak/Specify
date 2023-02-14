import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  { name: "Wood", path: "cat1", materials: [] },
  { name: "Tiles", path: "cat2", materials: [] },
  { name: "Curtain", path: "cat3", materials: [] },
  { name: "Upholstery", path: "cat4", materials: [] },
];

const librarySlice = createSlice({
  name: "library",
  initialState: initialState,
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
      state.find((el) => el.name === action.payload.category).materials[
        action.payload.materialIndex
      ] = {
        name: action.payload.name,
        supplier: action.payload.supplier,
        collection: action.payload.collection,
        category: action.payload.category,
        certificates: action.payload.certificates,
        info: action.payload.info,
        image: action.payload.image,
        link: action.payload.link,
      };
    },
    deleteMaterial(state, action) {
      console.log(action.payload);
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
      initialState = action.payload;
      return action.payload;
    },
  },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
