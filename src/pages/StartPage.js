import { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//CSS module//
import classes from "./StartPage.module.css";
//ICONS//
import HomeIcon from "../components/icons/HomeIcon";
import UserIcon from "../components/icons/UserIcon";
//FORMS//
import Accordion from "../components/Accordion";
import NewSupplierForm from "../components/forms/NewSupplierForm";
import NewMaterialForm from "../components/forms/NewMaterialForm";
import NewProjectForm from "../components/forms/NewProjectForm";
import NewTaskForm from "../components/forms/NewTaskForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import SideMenuLinks from "../components/SideMenuLinks";
//PAGES//
import HomePage from "./HomePage";
import ProjectPage from "./ProjectsPage";
import ProjectPageDetails from "./ProjectPageDetails";
import SuppliersPage from "./SuppliersPage";
import SuppliersPageDetails from "./SuppliersPageDetails";
import LibraryPage from "./LibraryPage";
import LibraryPageDetails from "./LibraryPageDetails";
import TasksPage from "./TasksPage";
import TasksPageDetails from "./TaskPageDetails";
import LogOutIcon from "../components/icons/LogOutIcon";

const StartPage = (props) => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currTarget, setTarget] = useState("");

  const accordionActivationHandler = (target) => {
    if (target === "tasks") {
      setTarget(target);
    }
    if (target === "projects") {
      setTarget(target);
    }
    if (target === "suppliers") {
      setTarget(target);
    }
    if (target === "library") {
      setTarget(target);
    }
  };

  const stateDataTransferHandler = (slice) => {
    setData(slice);
  };

  const newItemHandler = () => {
    setIsFormVisible(true);
  };

  const addNewTaskHandler = () => {
    setIsFormVisible(true);
  };

  const closeNewTaskForm = () => {
    setIsFormVisible(false);
  };

  const componentNames = {
    tasks: TasksPage,
    projects: ProjectPage,
    suppliers: SuppliersPage,
    library: LibraryPage,
  };

  let category = currTarget;
  let DynamicComponent = componentNames[category];

  const componentNamesDetails = {
    tasks: TasksPageDetails,
    projects: ProjectPageDetails,
    suppliers: SuppliersPageDetails,
    library: LibraryPageDetails,
  };

  let DynamicComponentDetails = componentNamesDetails[category];

  const reactRoutesMain = data.map(({ name, path, fireZone, dk, project }) => (
    <Route key={path} path={`/${currTarget}/${path}`}>
      {path.includes("t") ? (
        <DynamicComponentDetails
          name={name}
          fz={fireZone}
          deck={dk}
          project={project}
          createItem={newItemHandler}
          path={path}
        />
      ) : (
        <DynamicComponentDetails name={name} createItem={newItemHandler} />
      )}
    </Route>
  ));

  const reactRoutesMainStarter = data.map(({ _, path }) => (
    <Route key={path} path={`/${currTarget}`} exact>
      {currTarget === "tasks" ? (
        <DynamicComponent data={data} createItem={newItemHandler} />
      ) : (
        <DynamicComponent createItem={newItemHandler} />
      )}
    </Route>
  ));

  const routerLinks = data.map(({ name, path }) => (
    <Link key={path} to={`/${currTarget}/${path}`}>
      <li className={classes.item}>{name}</li>
    </Link>
  ));

  const componentNamesKeys = Object.keys(componentNames);

  const reactRoutesSidebar = componentNamesKeys.map((key) => (
    <Route key={key} path={`/${key}`}>
      <SideMenuLinks links={routerLinks} />
    </Route>
  ));

  let TargetForm;

  if (currTarget === "tasks") {
    TargetForm = (
      <NewTaskForm onClick={addNewTaskHandler} onExit={closeNewTaskForm} />
    );
  }
  if (currTarget === "projects") {
    TargetForm = (
      <NewProjectForm onClick={addNewTaskHandler} onExit={closeNewTaskForm} />
    );
  }
  if (currTarget === "suppliers") {
    TargetForm = (
      <NewSupplierForm onClick={addNewTaskHandler} onExit={closeNewTaskForm} />
    );
  }
  if (currTarget === "library") {
    TargetForm = (
      <NewMaterialForm onClick={addNewTaskHandler} onExit={closeNewTaskForm} />
    );
  }

  return (
    <Fragment>
      <Router>
        {isFormVisible ? TargetForm : ""}
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <div className={classes.user}>
              <UserIcon className={classes.icon} size="12rem" />
              <LogOutIcon size="2.5rem" />
            </div>
            <div className={classes.accordionContainer}>
              <div
                className={classes.accordionItem}
                data-accordion={props.data}
              >
                <Link to={"/"}>
                  <div className={classes.itemDescription}>
                    <HomeIcon unit="2rem" />
                    <span className={classes.mLeft}>Home</span>
                  </div>
                </Link>
              </div>
              <Accordion
                name="Tasks"
                data="Tasks"
                stateTransfer={stateDataTransferHandler}
                accordionActivation={accordionActivationHandler}
              />
              <Accordion
                name="Projects"
                data="Projects"
                stateTransfer={stateDataTransferHandler}
                accordionActivation={accordionActivationHandler}
              />
              <Accordion
                name="Suppliers"
                data="Suppliers"
                stateTransfer={stateDataTransferHandler}
                accordionActivation={accordionActivationHandler}
              />
              <Accordion
                name="Library"
                data="Library"
                stateTransfer={stateDataTransferHandler}
                accordionActivation={accordionActivationHandler}
              />
            </div>
          </div>

          <Switch>{reactRoutesSidebar}</Switch>

          <div className={classes.mainContent}>
            <Switch>
              <Route key="home" path="/" exact>
                <HomePage />
              </Route>
              {reactRoutesMainStarter}
              {reactRoutesMain}
            </Switch>
          </div>
        </div>
      </Router>
    </Fragment>
  );
};

export default StartPage;

//taski beda generowane z statusu z databazy za pomoca mapy z arr pamietaj zeby dodawac key!!!!!
