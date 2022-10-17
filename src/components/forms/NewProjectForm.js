import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewProjectForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTeam, setEnteredTeam] = useState("");

  const enteredType = useRef();
  const enteredScope = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const dateInputChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const teamInputChangeHandler = (event) => {
    setEnteredTeam(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredDate.trim() === "" ||
      enteredTeam.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    SLICE.projects.push({
      name: enteredName,
      type: enteredType.current.value,
      scope: enteredScope.current.value,
      date: enteredDate,
      team: enteredTeam,
      path: `p${SLICE.projects.length + 1}`,
      area: [],
      projectTasks: [],
    });

    setEnteredName("");
    setEnteredDate("");
    setEnteredTeam("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New project</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="project"
            onChange={nameInputChangeHandler}
            value={enteredName}
          ></input>
          <p className={classes.description}>Project name</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
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
        <div className={classes.formGroup}>
          <input
            type="text"
            id="team"
            onChange={teamInputChangeHandler}
            value={enteredTeam}
          ></input>
          <p className={classes.description}>Team</p>
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
