import { Fragment, useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

//CSS module//
import classes from "./StartPage.module.css";
//ICONS//
import HomeIcon from "../components/icons/HomeIcon";
//FORMS//
import Accordion from "../components/Accordion";
import NewAreaForm from "../components/forms/NewAreaForm";
import NewSupplierForm from "../components/forms/NewSupplierForm";
import NewMaterialForm from "../components/forms/NewMaterialForm";
import NewProjectForm from "../components/forms/NewProjectForm";
import NewTaskForm from "../components/forms/NewTaskForm";
import SideMenuLinks from "../components/SideMenuLinks";
import LogOutIcon from "../components/icons/LogOutIcon";
//STATE//
import { usersActions } from "../store/users-slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StartPage = (props) => {
  const dispatch = useDispatch();

  const params = useParams();
  const url = window.location.href.split("/").at(-1);

  //State slices//
  const stateUsers = useSelector((state) => state.users);
  const stateTasks = useSelector((state) => state.tasks);
  const stateProjects = useSelector((state) => state.projects);
  const stateSuppliers = useSelector((state) => state.suppliers);
  const stateLibrary = useSelector((state) => state.library);
  ////////////////
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [editItem, setEditItem] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [stateTarget, setStateTarget] = useState("");
  const [detailTarget, setDetailTarget] = useState("");

  const userEmail = localStorage.getItem("login");

  const { email, isLoggedIn, name, surname } = stateUsers?.find(
    (el) => el.email === userEmail
  );

  const userInitials = `${name[0]}${surname[0]}`;

  localStorage.setItem("currentUser", userInitials);

  const newItemHandler = (edit, index = "", itemProps = "") => {
    setIsEditing(edit);
    setEditIndex(index);
    setIsFormVisible(true);
    setEditItem(itemProps);
  };

  const addNewTaskHandler = () => {
    setIsFormVisible(true);
  };

  const closeNewTaskForm = () => {
    setIsFormVisible(false);
  };

  //Getting date string for edited specifications

  const versionControlHandler = () => {
    const date = new Date();
    const day = date.toLocaleString();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return { text: `on ${day} ${month} ${year} at ${hour}:${minutes}` };
  };

  useEffect(() => {
    if (stateTarget === "tasks" || url === "tasks") {
      setDetailTarget("");
      setData(stateTasks);
    }
    if (stateTarget === "projects" || url === "projects") {
      setDetailTarget("");
      setData(stateProjects);
    }
    if (stateTarget === "suppliers" || url === "suppliers") {
      setDetailTarget("");
      setData(stateSuppliers);
    }
    if (stateTarget === "library" || url === "library") {
      setDetailTarget("");
      setData(stateLibrary);
    }
    if (params.projectId?.includes("p")) {
      setData(stateProjects);
      setDetailTarget(["detailProject", params.projectId]);
    }
    if (params.supplierId?.includes("s")) {
      setData(stateSuppliers);
      setDetailTarget(["detailSupplier", params.supplierId]);
    }
  }, [
    stateTarget,
    stateTasks,
    stateProjects,
    stateSuppliers,
    stateLibrary,
    params,
    url,
  ]);
  const getTargetHandler = (target) => {
    setStateTarget(target);
    console.log(target);
    localStorage.setItem("target", target);
  };

  const targetFromLS = localStorage.getItem("target");
  //Creating Router Links to be used inside the sidebar items by SideMenuLinks component

  const routerLinks = data.map(({ name, path }) => (
    <Link
      key={path}
      to={`/home/${stateTarget !== "" ? stateTarget : targetFromLS}/${path}`}
    >
      <li className={classes.item}>{name}</li>
    </Link>
  ));

  let TargetForm;

  //Logic for displaying proper form for creating new items

  if (stateTarget === "tasks" || url === "tasks") {
    TargetForm = (
      <NewTaskForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }
  if (stateTarget === "projects" || url === "projects") {
    TargetForm = (
      <NewProjectForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }
  if (stateTarget === "suppliers" || url === "suppliers") {
    TargetForm = (
      <NewSupplierForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
      />
    );
  }
  if (stateTarget === "library" || url === "library") {
    TargetForm = (
      <NewMaterialForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
        item={isEditing === true ? editItem : ""}
      />
    );
  }
  if (detailTarget[0] === "detailSupplier") {
    TargetForm = (
      <NewMaterialForm
        onClick={addNewTaskHandler}
        onExit={closeNewTaskForm}
        supplier={detailTarget[1]}
        editing={isEditing === true ? isEditing : false}
        itemToEdit={isEditing === true ? editIndex : ""}
        item={isEditing === true ? editItem : ""}
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
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <div className={classes.user}>
            <div className={classes.user_initials}>
              <p>{userInitials}</p>
              <Link to="/" onClick={logoutHandler} className={classes.absolute}>
                <LogOutIcon className={classes.logout} size="2.5rem" />
              </Link>
            </div>
          </div>
          <div className={classes.accordionContainer}>
            <NavLink
              to="/home"
              getTarget={getTargetHandler}
              className={({ isActive }) =>
                isActive ? classes.active : classes.accordionItem
              }
              end
            >
              <div data-accordion="home">
                <div className={classes.itemDescription}>
                  <HomeIcon unit="2rem" />
                  {/* <span className={classes.accordionItemLabel}>Home</span> */}
                </div>
              </div>
            </NavLink>

            <Accordion name="Tasks" data="Tasks" getTarget={getTargetHandler} />
            <Accordion
              name="Projects"
              data="Projects"
              getTarget={getTargetHandler}
            />
            <Accordion
              name="Suppliers"
              data="Suppliers"
              getTarget={getTargetHandler}
            />
            <Accordion
              name="Library"
              data="Library"
              getTarget={getTargetHandler}
            />
          </div>
        </div>
        {url !== "home" ? <SideMenuLinks links={routerLinks} /> : ""}

        <div className={classes.mainContent}>
          <Outlet
            context={[
              newItemHandler,
              addNewTaskHandler,
              closeNewTaskForm,
              versionControlHandler,
            ]}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default StartPage;
