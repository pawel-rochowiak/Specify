import { projectActions } from "../store/projects-slice";

export const fetchStateData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json"
      );

      if (!response.ok) {
        throw new Error("could not fetch cart data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const stateData = await fetchData();
      const sortedStateData = stateData.projects.map((el) => {
        return {
          name: el.name,
          type: el.type,
          scope: el.scope,
          date: el.date,
          team: el.team,
          path: el.path,
          area: el.area,
          projectTasks: el.projectTasks,
        };
      });

      // console.log(sortedStateData);
      dispatch(projectActions.replceProjects(sortedStateData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// state.push({
//   name: action.payload.name,
//   type: action.payload.type,
//   scope: action.payload.scope,
//   date: action.payload.date,
//   team: action.payload.team,
//   path: `p${state.length + 1}`,
//   area: [
//     {
//       name: "MSC restaurant 1",
//       deck: "5",
//       fireZone: "1",
//       subcontractor: "TSI",
//     },
//     {
//       name: "MSC restaurant 2",
//       deck: "9",
//       fireZone: "2",
//       subcontractor: "TSI",
//     },
//   ],
//   projectTasks: [],
// });
// },
