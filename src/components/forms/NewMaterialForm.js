// NAME
// SUPPLIER
// CERTIFICATES
// DESCRIPTION
// IMAGE

import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewMaterialForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredCertificates, setEnteredCertificates] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredLink, setEnteredLink] = useState("");

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const supplierInputChangeHandler = (event) => {
    setEnteredSupplier(event.target.value);
  };
  const certificatesInputChangeHandler = (event) => {
    setEnteredCertificates(event.target.value);
  };
  const descriptionInputChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const imageInputChangeHandler = (event) => {
    setEnteredImage(event.target.value);
  };
  const linkInputChangeHandler = (event) => {
    setEnteredLink(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredSupplier.trim() === "" ||
      enteredCertificates.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredImage.trim() === "" ||
      enteredLink.trim() === ""
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

    setEnteredName("");
    setEnteredSupplier("");
    setEnteredCertificates("");
    setEnteredDescription("");
    setEnteredImage("");
    setEnteredLink("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New material</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            value={enteredName}
          ></input>
          <p className={classes.description}>Material name</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="supplier"
            onChange={supplierInputChangeHandler}
            value={enteredSupplier}
          ></input>
          <p className={classes.description}>Supplier</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="certificates"
            onChange={certificatesInputChangeHandler}
            value={enteredCertificates}
          ></input>
          <p className={classes.description}>Certificates</p>
        </div>
        <div className={classes.formGroup}>
          <textarea
            type="text"
            id="description"
            onChange={descriptionInputChangeHandler}
            value={enteredDescription}
          ></textarea>
          <p className={classes.description}>Description</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            id="image"
            onChange={imageInputChangeHandler}
            value={enteredImage}
          ></input>
          <p className={classes.description}>Image</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="link"
            onChange={linkInputChangeHandler}
            value={enteredLink}
          ></input>
          <p className={classes.description}>Link</p>
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

export default NewMaterialForm;
