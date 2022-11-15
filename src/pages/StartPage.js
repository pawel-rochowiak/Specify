import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//CSS module//
import classes from "./StartPage.module.css";
//ICONS//
import HomeIcon from "../components/icons/HomeIcon";
import UserIcon from "../components/icons/UserIcon";
//FORMS//
import Accordion from "../components/Accordion";
import NewAreaForm from "../components/forms/NewAreaForm";
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
//STATE//

import { useSelector, useDispatch } from "react-redux";

const StartPage = (props) => {
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const response = await fetch(
  //   //     "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json"
  //   //   );
  //   //   const responseData = await response.json();
  //   //   console.log(responseData);
  //   // };
  //   // fetchData();

  //   fetch(
  //     "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json",
  //     {
  //       method: "PUT",
  //       body: JSON.stringify(state),
  //     }
  //   );
  // }, []);
  //State slices//
  const state = useSelector((state) => state.all);
  const stateTasks = useSelector((state) => state.tasks);
  const stateProjects = useSelector((state) => state.projects);
  const stateSuppliers = useSelector((state) => state.suppliers);
  const stateLibrary = useSelector((state) => state.library);
  ////////////////
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currTarget, setTarget] = useState("");
  const [detailTarget, setDetailTarget] = useState("");

  const newItemHandler = () => {
    setIsFormVisible(true);
  };
  const addNewTaskHandler = () => {
    setIsFormVisible(true);
  };
  const closeNewTaskForm = () => {
    setIsFormVisible(false);
  };

  const targetActivationHandler = (target) => {
    if (target === "tasks") {
      setDetailTarget("");
      setTarget(target);
      setData(stateTasks);
    }
    if (target === "projects") {
      setDetailTarget("");
      setTarget(target);
      setData(stateProjects);
    }
    if (target === "suppliers") {
      setDetailTarget("");
      setTarget(target);
      setData(stateSuppliers);
    }
    if (target === "library") {
      setDetailTarget("");
      setTarget(target);
      setData(stateLibrary);
    }
    if (target.includes("/suppliers/s")) {
      setDetailTarget(["detailSupplier", target.split("/").at(-1)]);
    }
    if (target.includes("/projects/p")) {
      setDetailTarget(["detailProject", target.split("/").at(-1)]);
    }
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

  const reactRoutesMain = data.map(({ name, path }) => (
    <Route key={path} path={`/${currTarget}/${path}`}>
      <DynamicComponentDetails
        name={name}
        path={path}
        createItem={newItemHandler}
      />
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
      <SideMenuLinks
        targetActivation={targetActivationHandler}
        links={routerLinks}
      />
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
  if (detailTarget[0] === "detailSupplier") {
    TargetForm = (
      <NewMaterialForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        supplier={detailTarget[1]}
      />
    );
  }
  if (detailTarget[0] === "detailProject") {
    TargetForm = (
      <NewAreaForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        project={detailTarget[1]}
      />
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
                accordionActivation={targetActivationHandler}
              />
              <Accordion
                name="Projects"
                data="Projects"
                accordionActivation={targetActivationHandler}
              />
              <Accordion
                name="Suppliers"
                data="Suppliers"
                accordionActivation={targetActivationHandler}
              />
              <Accordion
                name="Library"
                data="Library"
                accordionActivation={targetActivationHandler}
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
