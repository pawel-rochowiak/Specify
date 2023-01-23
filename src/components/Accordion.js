import { Link, NavLink } from "react-router-dom";
import classes from "./Accordion.module.css";
///ICONS///
import TasksIcon from "./icons/TasksIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import SuppliersIcon from "./icons/SuppliersIcon";
import LibraryIcon from "./icons/LibraryIcon";

import { globalActions } from "../store/global-slice";
import { useDispatch } from "react-redux";

const Accordion = (props) => {
  const dispatch = useDispatch();
  const liftTargetHandler = (event) => {
    // event.preventDefault();

    const targetStart = event.target.closest("div[class*='data']").dataset
      .accordion;

    const target = targetStart.toLowerCase();
    console.log(target);

    dispatch(globalActions.setTarget(target));
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
    >
      <div
        className={classes.data}
        data-accordion={props.data}
        onClick={liftTargetHandler}
      >
        <div className={classes.itemDescription}>
          <DynamicComponent />
          <span className={classes.mLeft}>{props.name}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default Accordion;
