import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { projectActions } from "../../store/projects-slice";
import { useDispatch, useSelector } from "react-redux";

const NewProjectForm = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const [enteredName, setEnteredName] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const projectsStateEditProject = useSelector(
    (state) => state.projects[props.itemToEdit]
  );

  const enteredType = useRef();
  const enteredScope = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const dateInputChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // if (enteredName.trim() === "" || enteredDate.trim() === "") {
    //   console.log("empty");
    //   return;
    // }

    const projectIndex = props.itemToEdit;

    if (props.editing === true) {
      dispatch(
        projectActions.editProject({
          name: enteredName,
          type: enteredType.current.value,
          scope: enteredScope.current.value,
          date: enteredDate,
          // team: enteredTeam,
          projectIndex,
        })
      );
    } else {
      dispatch(
        projectActions.addProjects({
          name: enteredName,
          type: enteredType.current.value,
          scope: enteredScope.current.value,
          date: enteredDate,
          // team: enteredTeam,
        })
      );
    }

    setEnteredName("");
    setEnteredDate("");
    // setEnteredTeam("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>
        {props.editing ? "Editing project" : "New project"}
      </p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="project"
            onChange={nameInputChangeHandler}
            // value={props.editing ? projectsStateEditProject.name : enteredName}
            value={enteredName}
          ></input>
          <p className={classes.description}>Project name</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="date"
            id="date"
            onChange={dateInputChangeHandler}
            value={enteredDate}
          ></input>

          <p className={classes.description}>Delivery date</p>
        </div>
        <div className={`${classes.formGroup} ${classes.custom_select}`}>
          <select ref={enteredType}>
            <option>New build</option>
            <option>Refit</option>
            <option>Ga</option>
            <option>Coordination</option>
            <option>"Sister" ship</option>
          </select>
          <p className={classes.description}>Type (f.ex.: New biuld, refit)</p>
        </div>
        <div className={`${classes.formGroup} ${classes.custom_select}`}>
          <select ref={enteredScope} className={classes.custom_select}>
            <option>Public, PAX</option>
            <option>Public areas</option>
            <option>Cabins, suites</option>
            <option>PAX cabins</option>
            <option>Crew cabins</option>
            <option>Suites</option>
            <option>Exterior</option>
          </select>
          <p className={classes.description}>Scope</p>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );

  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      {mainContent}
    </Modal>
  );
};

export default NewProjectForm;
