import React, { useState } from "react";

import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { projectActions } from "../../store/projects-slice";
import { useSelector, useDispatch } from "react-redux";

const NewAreaForm = (props) => {
  const stateProjects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [enteredName, setEnteredName] = useState("");
  const [enteredDeck, setEnteredDeck] = useState("");
  const [enteredFz, setEnteredFz] = useState("");
  const [enteredSubcontractor, setEnteredSubcontractor] = useState("");

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const deckInputChangeHandler = (event) => {
    setEnteredDeck(event.target.value);
  };

  const fzInputChangeHandler = (event) => {
    setEnteredFz(event.target.value);
  };

  const subcontractorInputChangeHandler = (event) => {
    setEnteredSubcontractor(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredDeck.trim() === "" ||
      enteredFz.trim() === "" ||
      enteredSubcontractor.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    ///Logic for getting project name and adding areas

    const selectedProject = stateProjects.find(
      (el) => el.path === props.project
    );

    const projectIndex = stateProjects.indexOf(selectedProject);

    const areaIndex = props.itemToEdit;

    ///Logic for editing areas

    if (props.editing === true) {
      dispatch(
        projectActions.editProjectArea({
          name: enteredName,
          deck: enteredDeck,
          fz: enteredFz,
          subcontractor: enteredSubcontractor,
          project: projectIndex,
          areaToEdit: areaIndex,
        })
      );
    } else {
      dispatch(
        projectActions.addAreas({
          name: enteredName,
          deck: enteredDeck,
          fz: enteredFz,
          subcontractor: enteredSubcontractor,
          project: projectIndex,
        })
      );
    }

    setEnteredName("");
    setEnteredDeck("");
    setEnteredFz("");
    setEnteredSubcontractor("");

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
            onChange={subcontractorInputChangeHandler}
            value={enteredSubcontractor}
          ></input>
          <p className={classes.description}>Subcontractor</p>
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
