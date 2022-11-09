import { Link } from "react-router-dom";
import classes from "./Accordion.module.css";
///ICONS///
import TasksIcon from "./icons/TasksIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import SuppliersIcon from "./icons/SuppliersIcon";
import LibraryIcon from "./icons/LibraryIcon";

const Accordion = (props) => {
  const liftTargetHandler = (event) => {
    event.preventDefault();

    const targetStart = event.target.closest("div[class*='accordionItem']")
      .dataset.accordion;

    const target = targetStart.toLowerCase();

    props.accordionActivation(target);
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
      <div className={classes.itemDescription} onClick={liftTargetHandler}>
        <Link key={props.name} to={`/${props.name.toLowerCase()}`}>
          <DynamicComponent />
        </Link>
        <span className={classes.mLeft}>{props.name}</span>
      </div>
    </div>
  );
};

export default Accordion;
