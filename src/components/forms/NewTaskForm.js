import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { allSLiceActions } from "../../store/index";
import SLICE from "../../store/DUMMY_STATE_SLICE";
import { tasksActions } from "../../store/tasks-slice";
import { useDispatch } from "react-redux";

const NewTaskForm = (props) => {
  const dispatch = useDispatch();

  const [enteredName, setEnteredName] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTeam, setEnteredTeam] = useState("");
  const [enteredTaskName, setEnteredTaskName] = useState("");

  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNumberIsValid, setEnteredNumberIsValid] = useState(false);
  // const [enteredDateIsValid, setEnteredDateIsValid] = useState(false);
  // const [enteredTeamIsValid, setEnteredTeamIsValid] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const numberInputChangeHandler = (event) => {
    setEnteredNumber(event.target.value);
  };

  const dateInputChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const teamInputChangeHandler = (event) => {
    setEnteredTeam(event.target.value);
  };

  const taskInputChangeHandler = (event) => {
    setEnteredTaskName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredNumber.trim() === "" ||
      enteredDate.trim() === "" ||
      enteredTeam.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    // SLICE.tasks.push({
    //   name: `${enteredTaskName} - ${enteredName}`,
    //   path: `t${SLICE.tasks.length + 1}`,
    //   dk: "5", //deck should be taken from the AREA info
    //   fireZone: "1", //FZ should be taken from the AREA info
    //   project: enteredName,
    //   specification: "Carpet", //to be choosen from dropdown
    //   team: enteredTeam,
    //   date: enteredDate,
    //   status: "0%", //initial as 0%
    // });

    dispatch(
      tasksActions.addTasks({
        task: enteredTaskName,
        name: enteredName,
        date: enteredDate,
        team: enteredTeam,
      })
    );

    setEnteredName("");
    setEnteredNumber("");
    setEnteredDate("");
    setEnteredTeam("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New task</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="task"
            onChange={taskInputChangeHandler}
            value={enteredTaskName}
          ></input>
          <p className={classes.description}>Task name</p>
        </div>
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
            id="number"
            onChange={numberInputChangeHandler}
            value={enteredNumber}
          ></input>
          <p className={classes.description}>Project number</p>
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

export default NewTaskForm;
