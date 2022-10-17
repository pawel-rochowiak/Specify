import { useState } from "react";
import classes from "../pages/StartPage.module.css";
import classesIcons from "../components/icons/Arrows.module.css";
import PlusIcon from "../components/icons/PlusIcon";
import ArrowRight from "../components/icons/ArrowRight";
import ArrowLeft from "../components/icons/ArrowLeft";

const SideMenuLinks = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const sidebarVisibilityHandler = () => {
    setIsVisible(!isVisible);
  };

  const classList = !isVisible
    ? `${classes.sidebarDropdown}`
    : `${classes.sidebarDropdown} ${classes.sidebarDropdownHide}`;

  return (
    <div id="dropdown" className={classList}>
      <ul>{props.links}</ul>
      {!isVisible ? (
        <ArrowLeft
          unit="4.5rem"
          className={classesIcons.arrowRight}
          onClick={sidebarVisibilityHandler}
        />
      ) : (
        <ArrowRight
          unit="4.5rem"
          className={classesIcons.arrowRight}
          onClick={sidebarVisibilityHandler}
        />
      )}
    </div>
  );
};

export default SideMenuLinks;
