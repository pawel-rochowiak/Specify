import classes from "./StartPage.module.css";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import DetailsItem from "../components/DetailsItem";
import { useSelector } from "react-redux";

const ProjectPage = (props) => {
  const stateProjects = useSelector((state) => state.projects);

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>All projects</div>
        <div className={classes.categoriesTask}>
          <div>Project</div>
          <div>Type</div>
          <div>Scope</div>
          <div>Date</div>
          <div>Team</div>
        </div>
        <div className={classes.taskList}>
          {stateProjects?.map((el, index) => (
            <DetailsItem
              key={`project${index + 1}`}
              items={el}
              grid="5"
              dataset={index}
              edit={props.createItem}
              type="projectsState"
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={props.createItem}
          >
            Add project
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectPage;
