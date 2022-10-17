import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewMaterialCategoryForm = (props) => {
  const [enteredCategory, setEnteredCategory] = useState("");

  const categoryInputChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "") {
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

    setEnteredCategory("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New category</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="task"
            onChange={categoryInputChangeHandler}
            value={enteredCategory}
          ></input>
          <p className={classes.description}>Material category name</p>
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
