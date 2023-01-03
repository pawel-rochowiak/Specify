import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { tasksActions } from "../../store/tasks-slice";
import { useDispatch } from "react-redux";

const NewTaskForm = (props) => {
  const dispatch = useDispatch();

  const [enteredName, setEnteredName] = useState("");
  const [enteredAreaName, setEnteredAreaName] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTeam, setEnteredTeam] = useState("");
  const [enteredTaskName, setEnteredTaskName] = useState("");

  console.log(props);

  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNumberIsValid, setEnteredNumberIsValid] = useState(false);
  // const [enteredDateIsValid, setEnteredDateIsValid] = useState(false);
  // const [enteredTeamIsValid, setEnteredTeamIsValid] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const areaInputChangeHandler = (event) => {
    setEnteredAreaName(event.target.value);
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
      enteredTeam.trim() === "" ||
      enteredAreaName.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    const taskIndex = props.itemToEdit;

    if (props.editing === true) {
      dispatch(
        tasksActions.editTask({
          task: enteredTaskName,
          name: enteredName,
          area: enteredAreaName,
          date: enteredDate,
          team: enteredTeam,
          number: enteredNumber,
          taskIndex,
        })
      );
    } else {
      dispatch(
        tasksActions.addTasks({
          task: enteredTaskName,
          name: enteredName,
          area: enteredAreaName,
          date: enteredDate,
          team: enteredTeam,
          number: enteredNumber,
        })
      );
    }

    setEnteredName("");
    setEnteredAreaName("");
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
            id="area"
            onChange={areaInputChangeHandler}
            value={enteredAreaName}
          ></input>
          <p className={classes.description}>Venue name</p>
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
