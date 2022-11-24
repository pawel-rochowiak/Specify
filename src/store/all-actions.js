import { projectActions } from "../store/projects-slice";
import { suppliersActions } from "../store/suppliers-slice";
import { tasksActions } from "../store/tasks-slice";
import { libraryActions } from "../store/library-slice";
import { globalActions } from "../store/global-slice";
import { usersActions } from "../store/users-slice";

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

      dispatch(projectActions.replceProjects(sortedStateData));
      dispatch(suppliersActions.replceSuppliers(stateData.suppliers));
      dispatch(tasksActions.replceTasks(stateData.tasks));
      // dispatch(libraryActions.replceLibrary(stateData.library));
      dispatch(globalActions.replaceTarget(stateData.global));
      dispatch(usersActions.replceUsers(stateData.users));
    } catch (error) {
      console.log(error.message);
    }
  };
};
