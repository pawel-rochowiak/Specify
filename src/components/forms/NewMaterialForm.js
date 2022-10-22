import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewMaterialForm.module.css";
import SLICE from "../../store/DUMMY_STATE_SLICE";

const NewMaterialForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredCollection, setEnteredCollection] = useState("");
  const [enteredCertificates, setEnteredCertificates] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredLink, setEnteredLink] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const enteredExistingCollection = useRef();
  const enteredCat = useRef();
  const pickedSupplier = useRef();

  const supplierList = SLICE.suppliers.map((el) => [el.name]);

  const allCollections = SLICE.suppliers.map((el) => el.matCollections);

  const selectOptionsArr = supplierList.map((el, index) => {
    el.push(allCollections[index]);
    return el;
  });

  const allCollectionsOption = selectOptionsArr.map((el) => (
    <optgroup label={el[0]} key={el[0]}>
      {el[1].map((el) => (
        <option value={el.name} key={el.name}>
          {el.name}
        </option>
      ))}
    </optgroup>
  ));

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const supplierInputChangeHandler = (event) => {
    setEnteredSupplier(event.target.value);
  };
  const collectionInputChangeHandler = (event) => {
    setEnteredCollection(event.target.value);
  };
  const categoryInputChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
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
      (enteredName.trim() === "" ||
        enteredCertificates.trim() === "" ||
        enteredDescription.trim() === "" ||
        enteredImage.trim() === "" ||
        enteredLink.trim() === "") &&
      (enteredCollection.trim() === "" ||
        enteredExistingCollection.current.value === "") &&
      (enteredCategory.trim() === "" || enteredCat.current.value === "") &&
      (enteredSupplier.trim() === "" || pickedSupplier.current.value === "")
    ) {
      console.log("empty");
      return;
    }

    function findCategory(el) {
      return el.name === enteredCat.current.value;
    }

    function findSupplier(el) {
      return el.name === pickedSupplier.current.value;
    }

    function findCollection(el) {
      return el.name === enteredExistingCollection.current.value;
    }

    const newMaterialObjMarkup = {
      name: enteredName,
      supplier: enteredSupplier
        ? enteredSupplier
        : pickedSupplier.current.value,
      collection: enteredCollection
        ? enteredCollection
        : enteredExistingCollection.current.value,
      certificates: enteredCertificates,
      info: enteredDescription,
      image: enteredImage,
      link: enteredLink,
      path: `cat${SLICE.library.length + 1}`,
    };

    if (SLICE.library.find(findCategory)) {
      SLICE.library.find(findCategory).materials.push(newMaterialObjMarkup);
    } else if (!SLICE.library.find(findCategory)) {
      SLICE.library.push({
        name: enteredName,
        path: `cat${SLICE.library.length + 1}`,
        materials: [].push(newMaterialObjMarkup),
      });
    }

    SLICE.suppliers
      .find(findSupplier)
      .matCollections.find(findCollection)
      .materials.push(newMaterialObjMarkup);

    setEnteredName("");
    setEnteredSupplier("");
    setEnteredCategory("");
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
        <div className={classes.flex}>
          <div className={classes.formGroup}>
            <input
              type="text"
              id="name"
              onChange={nameInputChangeHandler}
              value={enteredName}
            ></input>
            <p className={classes.description}>Material name</p>
          </div>
          <div className={classes.typeGroup}>
            <div className={`${classes.custom_select}`}>
              <select ref={enteredExistingCollection}>
                {allCollectionsOption}
              </select>
              <p className={classes.description}>Pick</p>
            </div>
            <span>OR</span>
            <div>
              <input
                type="text"
                id="collection"
                onChange={collectionInputChangeHandler}
                value={enteredCollection}
              ></input>
              <p className={classes.description}>type new</p>
            </div>
            <p>Collection</p>
          </div>
          <div className={classes.typeGroup}>
            <div className={`${classes.custom_select}`}>
              <select ref={enteredCat}>
                {SLICE.library.map((el) => {
                  return <option key={el.name}>{el.name}</option>;
                })}
              </select>
              <p className={classes.description}>Pick existing category</p>
            </div>
            <span>OR</span>
            <div>
              <input
                type="text"
                id="category"
                onChange={categoryInputChangeHandler}
                value={enteredCategory}
              ></input>
              <p className={classes.description}>or type new</p>
            </div>
            <p>Category</p>
          </div>
          <div className={classes.typeGroup}>
            <div className={`${classes.custom_select}`}>
              <select ref={pickedSupplier}>
                {SLICE.suppliers.map((el) => {
                  return <option key={el.name}>{el.name}</option>;
                })}
              </select>
              <p className={classes.description}>Pick existing category</p>
            </div>
            <span>OR</span>
            <div>
              <input
                type="text"
                id="supplier"
                onChange={supplierInputChangeHandler}
                value={enteredSupplier}
              ></input>
              <p className={classes.description}>or type new</p>
            </div>
            <p>Supplier</p>
          </div>
        </div>
        <div className={classes.flex}>
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
              className={classes.custom__text_area}
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
