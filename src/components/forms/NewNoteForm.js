import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewMaterialCategoryForm = (props) => {
  const [enteredNote, setEnteredNote] = useState("");

  const date = new Date().getTime();

  const noteInputChangeHandler = (event) => {
    setEnteredNote(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredNote.trim() === "") {
      console.log("empty");
      return;
    }

    setEnteredNote("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New note</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <textarea
            type="text"
            id="note"
            onChange={noteInputChangeHandler}
            value={enteredNote}
          ></textarea>
          <p className={classes.description}>Please add text</p>
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

export default NewMaterialCategoryForm;
