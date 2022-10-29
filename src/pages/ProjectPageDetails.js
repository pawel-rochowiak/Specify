import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import SLICE from "../store/DUMMY_STATE_SLICE";

const ProjectPageDetails = (props) => {
  return (
    <Fragment>
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
            {SLICE.projects.find((el) => el.name === props.name).area.length !==
            0 ? (
              SLICE.projects
                .find((el) => el.name === props.name)
                .area.map((el, index) => (
                  <DetailItem key={index + 1} items={el} grid="4" />
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
    </Fragment>
  );
};

export default ProjectPageDetails;
