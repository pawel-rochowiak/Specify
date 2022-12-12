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
import { usersActions } from "../store/users-slice";
import { useDispatch, useSelector } from "react-redux";

const StartPage = (props) => {
  const dispatch = useDispatch();

  const stateTarget = useSelector((state) => state.global.target);
  //State slices//
  const stateTasks = useSelector((state) => state.tasks);
  const stateProjects = useSelector((state) => state.projects);
  const stateSuppliers = useSelector((state) => state.suppliers);
  const stateLibrary = useSelector((state) => state.library);
  ////////////////
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [detailTarget, setDetailTarget] = useState("");

  const newItemHandler = (edit, index = "") => {
    setIsEditing(edit);
    setEditIndex(index);
    setIsFormVisible(true);
  };
  const addNewTaskHandler = () => {
    setIsFormVisible(true);
  };
  const closeNewTaskForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    if (stateTarget === "tasks") {
      setDetailTarget("");
      setData(stateTasks);
    }
    if (stateTarget === "projects") {
      setDetailTarget("");
      setData(stateProjects);
    }
    if (stateTarget === "suppliers") {
      setDetailTarget("");
      setData(stateSuppliers);
    }
    if (stateTarget === "library") {
      setDetailTarget("");
      setData(stateLibrary);
    }
  }, [stateTarget, stateTasks, stateProjects, stateSuppliers, stateLibrary]);

  const targetActivationHandler = (target) => {
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

  let category = stateTarget;
  let DynamicComponent = componentNames[category];

  const componentNamesDetails = {
    tasks: TasksPageDetails,
    projects: ProjectPageDetails,
    suppliers: SuppliersPageDetails,
    library: LibraryPageDetails,
  };

  let DynamicComponentDetails = componentNamesDetails[category];

  //Creating Routes for main information display.Right part of the container (mainContent).

  const reactRoutesMain = data.map(({ name, path }) => (
    <Route key={path} path={`/${stateTarget}/${path}`}>
      <DynamicComponentDetails
        name={name}
        path={path}
        createItem={newItemHandler}
      />
    </Route>
  ));

  const reactRoutesMainStarter = data.map(({ _, path }) => (
    <Route key={path} path={`/${stateTarget}`} exact>
      {stateTarget === "tasks" ? (
        <DynamicComponent data={data} createItem={newItemHandler} />
      ) : (
        <DynamicComponent createItem={newItemHandler} />
      )}
    </Route>
  ));

  //Creating Router Links to be used inside the sidebar items by SideMenuLinks component

  const routerLinks = data.map(({ name, path }) => (
    <Link key={path} to={`/${stateTarget}/${path}`}>
      <li className={classes.item}>{name}</li>
    </Link>
  ));

  //Creating Routes for sidebar

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

  //Logic for displaying proper form for creating new items

  if (stateTarget === "tasks") {
    TargetForm = (
      <NewTaskForm onClick={addNewTaskHandler} onExit={closeNewTaskForm} />
    );
  }
  if (stateTarget === "projects") {
    TargetForm = (
      <NewProjectForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }
  if (stateTarget === "suppliers") {
    TargetForm = (
      <NewSupplierForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }
  if (stateTarget === "library") {
    TargetForm = (
      <NewMaterialForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
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
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }

  const logoutHandler = () => {
    const user = localStorage.getItem("login");
    dispatch(usersActions.logout(user));
  };

  return (
    <Fragment>
      {isFormVisible ? TargetForm : ""}
      <Router>
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <div className={classes.user}>
              <UserIcon className={classes.icon} size="12rem" />
              <Link to="/" onClick={logoutHandler}>
                <LogOutIcon size="2.5rem" />
              </Link>
            </div>
            <div className={classes.accordionContainer}>
              <div
                className={classes.accordionItem}
                data-accordion={props.data}
              >
                <Link to="/home">
                  <div className={classes.itemDescription}>
                    <HomeIcon unit="2rem" />
                    <span className={classes.mLeft}>Home</span>
                  </div>
                </Link>
              </div>
              <Accordion name="Tasks" data="Tasks" />
              <Accordion name="Projects" data="Projects" />
              <Accordion name="Suppliers" data="Suppliers" />
              <Accordion name="Library" data="Library" />
            </div>
          </div>

          <Switch>{reactRoutesSidebar}</Switch>

          <div className={classes.mainContent}>
            <Switch>
              <Route key="home" path="/home">
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
