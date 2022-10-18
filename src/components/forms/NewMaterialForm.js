import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewMaterialForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredCollection, setEnteredCollection] = useState("");
  const [enteredCertificates, setEnteredCertificates] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredLink, setEnteredLink] = useState("");

  const enteredCat = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const supplierInputChangeHandler = (event) => {
    setEnteredSupplier(event.target.value);
  };
  const collectionInputChangeHandler = (event) => {
    setEnteredCollection(event.target.value);
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
      enteredCollection.trim() === "" ||
      enteredImage.trim() === "" ||
      enteredLink.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    function findCategory(el) {
      return el.name === enteredCat.current.value;
    }

    SLICE.library.find(findCategory).materials.push({
      name: enteredName,
      supplier: enteredSupplier,
      collection: enteredCollection,
      certificates: enteredCertificates,
      info: enteredDescription,
      image: enteredImage,
      link: enteredLink,
      path: `cat${SLICE.library.length + 1}`,
    });

    console.log(SLICE);

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
            id="collection"
            onChange={collectionInputChangeHandler}
            value={enteredCollection}
          ></input>
          <p className={classes.description}>Collection</p>
        </div>
        <div className={`${classes.formGroup} ${classes.custom_select}`}>
          <select ref={enteredCat}>
            <option>Wood</option>
            <option>Tiles</option>
            <option>Curtain</option>
            <option>Upholstery</option>
          </select>
          <p className={classes.description}>Category</p>
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
