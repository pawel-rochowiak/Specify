import { createStore } from "redux";

const initialState = {
  users: [],
  projects: [],
  suppliers: [],
  materials: [],
};

const addUserReducer = (state = initialState, action) => {
  if ((action.type = "add")) {
    return {};
  }
};

const store = createStore();

// const state = {
//   users: [
//     {
//       name: "Pawel",
//       surname: "Rochowiak",
//       email: "pawel.rochowiak@gmail.com",
//       userID: "PR1",
//       tasks: [],
//     },
//   ],
//   projects: [
//     {
//       name: "Disney",
//       number: "1195-4",
//       venues: {
//         name: "International Restaurant",
//         deck: "7-9",
//         fireZone: "3",
//         revision: "0",
//       },
//       team: ["Anna", "Ola", "Linda"],
//     },
//   ],
//   suppliers: [
//     {
// name: "Preciosa",
// specialisation: "lighting",
// adress: {
//   country: "Czech Republic",
//   city: "n/a",
//   street: "n/a",
//   number: "n/a",
//   contactPerson: {
//     fullName: "Pavel Kozel",
//     email: "pavel.koziel@pepiczek.cz",
//     tel: "0700-88-07-88",
//         },
//       },
//     },
//   ],
//   materials: {},
// };
