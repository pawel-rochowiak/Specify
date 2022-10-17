import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import Note from "../components/Note";
import { Fragment } from "react";

const ProjectPageDetails = (props) => {
  const DUMMY_DATA_SLICE = [
    [
      { number: "1" },
      { name: "International Restaurants" },
      { deck: "6-9" },
      { fz: "1-2" },
      { team: "Marielle, Linda" },
      { status: "50%" },
    ],
    [
      { number: "2" },
      { name: "Lido Pool" },
      { deck: "17-18" },
      { fz: "3-4" },
      { team: "Marielle, Ilonka" },
      { status: "30%" },
    ],
    [
      { number: "3" },
      { name: "Crew Training" },
      { deck: "9" },
      { fz: "3-4" },
      { team: "Tomek, Anna" },
      { status: "70%" },
    ],
  ];

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
            {DUMMY_DATA_SLICE.map((el, index) => (
              <DetailItem key={index + 1} items={el} grid="6" />
            ))}
            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
        <div className={classes.tasks}>
          <div className={classes.name}>Notes</div>
          <div className={classes.categoriesNotes}>
            <div>Date</div>
            <div>Note</div>
          </div>
          <div className={classes.taskList}>
            <Note date="29/10/2022" note="trololololo" />
            <Note
              date="07/09/2022"
              note="Signage specification needed. Please contact our subcontractor and request NCS code chart."
            />
            <div className={`${classes.item} ${classes.action}`}>
              Create note
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectPageDetails;
