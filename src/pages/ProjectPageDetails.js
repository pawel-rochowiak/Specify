import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

const ProjectPageDetails = () => {
  const stateProjects = useSelector((state) => state.projects);
  const stateProjectsTasks = useSelector((state) => state.tasks);
  const [createItem] = useOutletContext();
  const params = useParams();
  const path = params.projectId;

  const element = stateProjects.find((el) => el.path === path);
  const projectAreas = element.area;
  const currentProjectTasks = stateProjectsTasks.filter(
    (el) => el.project === element.name
  );

  const userInitials = localStorage.getItem("currentUser");
  console.log(currentProjectTasks);
  // <Link key={path} to={`/home/${stateTarget}/${path}`}>
  //     <li className={classes.item}>{name}</li>
  //   </Link>
  return (
    <div className={classes.mainContent}>
      <div className={classes.tasks}>
        <div className={classes.name}>{element.name}</div>
        <div className={classes.categoriesAreas}>
          <div>Name</div>
          <div>Deck</div>
          <div>Fire Zone</div>
          <div>Outfitter</div>
        </div>
        <div className={classes.taskList}>
          {stateProjects.find((el) => el.name === element.name).area.length !==
          0 ? (
            stateProjects
              .find((el) => el.name === element.name)
              .area.map((el, index) => (
                <div className={classes.area__spec_container}>
                  <DetailItem
                    key={index + 1}
                    dataset={index}
                    section="projects"
                    items={el}
                    grid="4"
                    edit={createItem}
                    type="projectsState"
                  />
                  {currentProjectTasks.map((el) => (
                    <div className={classes.area__specifications}>
                      <Task
                        key={path}
                        venue={el.area}
                        name={element.name}
                        person={userInitials}
                        task={el.specification}
                        date={el.date}
                        disabled={true}
                      />
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p>No areas please add</p>
          )}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
          >
            Add venue
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDetails;
