import { NavLink } from "react-router-dom";
import classes from "./Accordion.module.css";
///ICONS///
import TasksIcon from "./icons/TasksIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import SuppliersIcon from "./icons/SuppliersIcon";
import LibraryIcon from "./icons/LibraryIcon";

const Accordion = (props) => {
  const liftTargetHandler = (event) => {
    const targetStart = event.target.closest("a[class*='accordionItem']")
      .dataset.accordion;

    const target = targetStart.toLowerCase();

    props.getTarget(target);
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
    <NavLink
      key={props.name}
      to={`/home/${props.name.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? classes.accordionItem_active : classes.accordionItem
      }
      onClick={liftTargetHandler}
      data-accordion={props.data}
      id={`sidebar_${props.name.toLowerCase()}`}
    >
      <div className={classes.data}>
        <div className={classes.itemDescription}>
          <DynamicComponent unit="2rem" />
        </div>
      </div>
    </NavLink>
  );
};

export default Accordion;
