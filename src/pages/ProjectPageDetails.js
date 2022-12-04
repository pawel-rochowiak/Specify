import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";

const ProjectPageDetails = (props) => {
  const stateProjects = useSelector((state) => state.projects);
  return (
    <div className={classes.mainContent}>
      <div className={classes.tasks}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.categoriesAreas}>
          <div>Name</div>
          <div>Deck</div>
          <div>Fire Zone</div>
          <div>Outfitter</div>
        </div>
        <div className={classes.taskList}>
          {stateProjects.find((el) => el.name === props.name).area.length !==
          0 ? (
            stateProjects
              .find((el) => el.name === props.name)
              .area.map((el, index) => (
                <DetailItem
                  key={index + 1}
                  dataset={index}
                  section="projects"
                  items={el}
                  grid="4"
                  edit={props.createItem}
                  type="projectsState"
                />
              ))
          ) : (
            <p>No areas please add</p>
          )}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={props.createItem}
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
