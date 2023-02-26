import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { tasksActions } from "../../store/tasks-slice";
import { projectActions } from "../../store/projects-slice";
import { useDispatch, useSelector } from "react-redux";

const NewTaskForm = (props) => {
  const dispatch = useDispatch();
  const currentTasks = useSelector((state) => state.tasks);

  const [enteredName, setEnteredName] = useState("");
  const [enteredAreaName, setEnteredAreaName] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTaskName, setEnteredTaskName] = useState("");
  const [enteredDeck, setEnteredDeck] = useState("");
  const [enteredFz, setEnteredFz] = useState("");

  //User risponsible for the task

  const userInitials = localStorage.getItem("currentUser");

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

  const deckInputChangeHandler = (event) => {
    setEnteredDeck(event.target.value);
  };
  const fzInputChangeHandler = (event) => {
    setEnteredFz(event.target.value);
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
      enteredDeck.trim() === "" ||
      enteredFz.trim() === "" ||
      enteredAreaName.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    const taskIndex = props.itemToEdit;

    const payload = {
      task: enteredTaskName,
      name: enteredName,
      area: enteredAreaName,
      date: enteredDate,
      resPerson: userInitials,
      dk: enteredDeck,
      fz: enteredFz,
      number: enteredNumber,
      path: `t${currentTasks.length}`,
    };

    if (props.editing === true) {
      dispatch(
        tasksActions.editTask({
          ...payload,
          taskIndex,
        })
      );
    } else {
      dispatch(
        tasksActions.addTasks({
          ...payload,
        })
      );

      dispatch(
        projectActions.addAreaTasks({
          ...payload,
        })
      );
    }

    setEnteredName("");
    setEnteredAreaName("");
    setEnteredNumber("");
    setEnteredDate("");
    setEnteredDeck("");
    setEnteredFz("");

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
            type="number"
            id="deck"
            onChange={deckInputChangeHandler}
            value={enteredDeck}
          ></input>
          <p className={classes.description}>Deck</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="number"
            id="fire zone"
            onChange={fzInputChangeHandler}
            value={enteredFz}
          ></input>
          <p className={classes.description}>Fire zone</p>
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
            type="date"
            id="date"
            onChange={dateInputChangeHandler}
            value={enteredDate}
          ></input>
          <p className={classes.description}>Delivery date</p>
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
