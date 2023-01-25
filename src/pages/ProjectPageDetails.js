import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

const ProjectPageDetails = () => {
  const stateProjects = useSelector((state) => state.projects);
  const [createItem] = useOutletContext();
  const params = useParams();
  const path = params.projectId;

  const element = stateProjects.find((el) => el.path === path);
  console.log(element);
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
                <DetailItem
                  key={index + 1}
                  dataset={index}
                  section="projects"
                  items={el}
                  grid="4"
                  edit={createItem}
                  type="projectsState"
                />
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
