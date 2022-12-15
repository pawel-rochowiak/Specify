import { createSlice } from "@reduxjs/toolkit";

const initialState = [
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
    matCollections: [
      {
        name: "Col1",
        materials: ["mat1", "mat2", "mat3"],
      },
    ],
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
];

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: initialState,
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
        path: `s${state.length + 1}`,
      });
    },
    deleteSupplier(state, action) {
      state.splice(action.payload.index, 1);
      state.map((el, index) => (el.path = `s${index}`));
    },
    editSupplier(state, action) {
      state[action.payload.supplierIndex].name = action.payload.name;
      state[action.payload.supplierIndex].field = action.payload.field;
      state[action.payload.supplierIndex].adress.country =
        action.payload.country;
      state[action.payload.supplierIndex].adress.city = action.payload.city;
      state[action.payload.supplierIndex].adress.street = action.payload.street;
      state[action.payload.supplierIndex].adress.number = action.payload.number;
      state[action.payload.supplierIndex].contactPerson.fullName =
        action.payload.fullName;
      state[action.payload.supplierIndex].contactPerson.email =
        action.payload.email;
      state[action.payload.supplierIndex].contactPerson.tel =
        action.payload.tel;
    },
    deleteMaterial(state, action) {
      console.log(action.payload);
      const supplierIndex = state.findIndex(
        (el) => el.name === action.payload.supplier
      );
      const collectionIndex = state[supplierIndex].matCollections.findIndex(
        (el) => el.name === action.payload.collection
      );

      state[supplierIndex].matCollections[collectionIndex].materials.splice(
        action.payload.index,
        1
      );

      if (
        state[supplierIndex].matCollections[collectionIndex].materials
          .length === 0
      ) {
        state[supplierIndex].matCollections.splice(collectionIndex, 1);
      }
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
    replceSuppliers(state, action) {
      return action.payload;
    },
  },
});

export const suppliersActions = suppliersSlice.actions;

export default suppliersSlice;
