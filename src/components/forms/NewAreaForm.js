import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewAreaForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredDeck, setEnteredDeck] = useState("");
  const [enteredFz, setEnteredFz] = useState("");
  const [enteredStatus, setEnteredStatus] = useState("");
  const [enteredTeam, setEnteredTeam] = useState("");

  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNumberIsValid, setEnteredNumberIsValid] = useState(false);
  // const [enteredDateIsValid, setEnteredDateIsValid] = useState(false);
  // const [enteredTeamIsValid, setEnteredTeamIsValid] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const deckInputChangeHandler = (event) => {
    setEnteredDeck(event.target.value);
  };

  const fzInputChangeHandler = (event) => {
    setEnteredFz(event.target.value);
  };

  const teamInputChangeHandler = (event) => {
    setEnteredTeam(event.target.value);
  };

  const statusInputChangeHandler = (event) => {
    setEnteredStatus(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredDeck.trim() === "" ||
      enteredFz.trim() === "" ||
      enteredTeam.trim() === "" ||
      enteredStatus.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    ///Logic for getting project name and adding areas

    // const selectedProject = SLICE.projects.find(
    //   (el) => el.name === "Princess Cruises"
    // );

    // console.log(selectedProject);

    // selectedProject.area.push({
    //   name: "Toilet",
    //   deck: "9",
    //   fz: "3-4",
    //   team: "Adam,Gadam",
    //   status: "0%",
    // });

    setEnteredName("");
    setEnteredDeck("");
    setEnteredFz("");
    setEnteredStatus("");
    setEnteredTeam("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New venue</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="area"
            onChange={nameInputChangeHandler}
            value={enteredName}
          ></input>
          <p className={classes.description}>Name</p>
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
            id="fz"
            onChange={fzInputChangeHandler}
            value={enteredFz}
          ></input>
          <p className={classes.description}>Fire zone</p>
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
        <div className={classes.formGroup}>
          <input
            type="text"
            id="status"
            onChange={statusInputChangeHandler}
            value={enteredStatus}
          ></input>
          <p className={classes.description}>Status</p>
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

export default NewAreaForm;
