import { createSlice } from "@reduxjs/toolkit";

const initialState = [
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
    replceLibrary(state, action) {
      return action.payload;
    },
  },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
