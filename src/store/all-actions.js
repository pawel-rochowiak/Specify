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

      const sortedStateDataLibrary = stateData.library.map((el) => {
        el.materials?.map((el) => {
          return {
            name: el.name,
            collection: el.collection,
            supplier: el.supplier,
            certificate: el.certificate,
            info: el.info,
            imageUrl: el.image,
            link: el.link,
          };
        });
      });

      //   <div className={classes.item}>
      //   <div className={classes.materialNumber}>{props.number}</div>
      //   <div className={classes.materialName}>{props.name}</div>
      //   <div className={classes.materialName}>{props.collection}</div>
      //   <div className={classes.materialSupplier}>{props.supplier}</div>
      //   <div className={classes.materialCertificate}>{props.certificate}</div>
      //   <div className={classes.materialInfo}>{props.info}</div>
      //   <img className={classes.materialImage} src={props.imageUrl} />
      //   <a className={classes.materialLink} href={props.link} target="_blank">
      //     Link
      //   </a>
      // </div>

      dispatch(projectActions.replceProjects(sortedStateData));
      dispatch(suppliersActions.replceSuppliers(stateData.suppliers));
      dispatch(tasksActions.replceTasks(stateData.tasks));
      dispatch(libraryActions.replceLibrary(stateData.library));
      dispatch(globalActions.replaceTarget(stateData.global));
      dispatch(usersActions.replceUsers(stateData.users));
    } catch (error) {
      console.log(error.message);
    }
  };
};
