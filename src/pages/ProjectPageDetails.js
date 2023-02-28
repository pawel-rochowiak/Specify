import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext, useParams, Link } from "react-router-dom";

const ProjectPageDetails = () => {
  const stateProjects = useSelector((state) => state.projects);
  const [createItem] = useOutletContext();
  const params = useParams();
  const path = params.projectId;

  const element = stateProjects.find((el) => el.path === path);
  const currentProjectTasks = element.projectTasks;

  const userInitials = localStorage.getItem("currentUser");

  return (
    <div className={classes.mainContent}>
      <div className={classes.tasks}>
        <div className={classes.name}>{element.name}</div>
        {element.area.length !== 0 ? (
          <div className={classes.categoriesAreas}>
            <div>Name</div>
            <div>Deck</div>
            <div>Fire Zone</div>
            <div>Outfitter</div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.taskList}>
          {element.area.length !== 0 ? (
            element.area.map((el, index) => (
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

                {currentProjectTasks
                  .filter((el1) => el1.area === el.name)
                  .map((el2) => (
                    <div className={classes.area__specifications}>
                      <Link key={path} to={`/home/tasks/${el2.path}`}>
                        <Task
                          key={path}
                          venue={el2.area}
                          name={element.name}
                          person={userInitials}
                          task={el2.specification}
                          date={el2.date}
                          disabled={true}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div className={classes.info_message}>
              No area has been added. Please press
              <span className={classes.highlight}>"Add venue"</span> button to
              add new area.
            </div>
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
