import classes from "./ProjectPageDetails.module.css";
import ProjectDetailsItem from "../components/ProjectDetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";

const SuppliersPageDetails = (props) => {
  return (
    <Fragment>
      <div className={classes.mainContent}>
        <div className={classes.tasks}>
          <div className={classes.name}>{props.name}</div>
          <div className={classes.categoriesTask}>
            <div>No.</div>
            <div>Name</div>
            <div>Deck</div>
            <div>Fire Zone</div>
            <div>Team</div>
            <div>Status</div>
          </div>
          <div className={classes.taskList}>
            <ProjectDetailsItem
              number="1"
              name="International Restaurants"
              deck="6-9"
              fz="1-2"
              team="Marielle, Linda"
              status="50%"
            />
            <ProjectDetailsItem
              number="2"
              name="Lido Pool"
              deck="17-18"
              fz="3-4"
              team="Marielle, Ilonka"
              status="70%"
            />
            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SuppliersPageDetails;
