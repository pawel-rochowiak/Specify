import { Link } from "react-router-dom";
import classes from "./Accordion.module.css";
///ICONS///
import TasksIcon from "./icons/TasksIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import SuppliersIcon from "./icons/SuppliersIcon";
import LibraryIcon from "./icons/LibraryIcon";
///TEMP STATE///
import SLICE from "../store/DUMMY_STATE_SLICE";
import { useSelector } from "react-redux";

const Accordion = (props) => {
  //later to be replaced by data coming from redus and database REDUX SLICE
  const state = useSelector((state) => state);

  const showListHandler = (event) => {
    event.preventDefault();

    const targetStart = event.target.closest("div[class*='accordionItem']")
      .dataset.accordion;

    const target = targetStart.toLowerCase();

    props.accordionActivation(target);

    props.stateTransfer(state[target]);
  };

  const componentNames = {
    Tasks: TasksIcon,
    Projects: ProjectsIcon,
    Suppliers: SuppliersIcon,
    Library: LibraryIcon,
  };

  let category = props.name;
  let DynamicComponent = componentNames[category];

  return (
    <div className={classes.accordionItem} data-accordion={props.data}>
      <div className={classes.itemDescription} onClick={showListHandler}>
        <Link key={props.name} to={`/${props.name.toLowerCase()}`}>
          <DynamicComponent />
        </Link>
        <span className={classes.mLeft}>{props.name}</span>
      </div>
    </div>
  );
};

export default Accordion;
