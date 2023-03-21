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

      const sortedStateData = stateData.projects?.map((el) => {
        return {
          name: el.name,
          type: el.type,
          scope: el.scope,
          date: el.date,
          path: el.path,
          area: el.area ? el.area : [],
          projectTasks: el.projectTasks ? el.projectTasks : [],
        };
      });

      const newDataLibrary = stateData.library?.map((el) => {
        return {
          name: el.name,
          path: el.path,
          materials: el.materials ? el.materials : [],
        };
      });

      const newDataTasks = stateData.tasks?.map((el) => {
        return {
          ...el,
          materials: el.materials ? el.materials : [],
        };
      });

      const newDataSupplier = stateData.suppliers?.map((el) => {
        return {
          name: el.name,
          field: el.field,
          adress: {
            country: el.adress.country,
            city: el.adress.city,
            street: el.adress.street,
            number: el.adress.number,
          },
          contactPerson: {
            fullName: el.contactPerson.fullName,
            email: el.contactPerson.email,
            tel: el.contactPerson.tel,
          },
          matCollections: el.matCollections ? el.matCollections : [],
          path: el.path,
        };
      });

      dispatch(projectActions.replceProjects(sortedStateData));
      dispatch(suppliersActions.replceSuppliers(newDataSupplier));
      dispatch(tasksActions.replceTasks(newDataTasks));
      dispatch(libraryActions.replceLibrary(newDataLibrary));
      dispatch(globalActions.replaceTarget(stateData.global));
      dispatch(usersActions.replceUsers(stateData.users));
    } catch (error) {
      console.log(error);
    }
  };
};
