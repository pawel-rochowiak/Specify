import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewMaterialForm.module.css";
import { libraryActions } from "../../store/library-slice";
import { suppliersActions } from "../../store/suppliers-slice";
import { useSelector, useDispatch } from "react-redux";

const NewMaterialForm = (props) => {
  const suppliersState = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();
  const materialState = useSelector((state) => state.library);

  const [enteredName, setEnteredName] = useState("");
  const [enteredCollection, setEnteredCollection] = useState("");
  const [enteredCertificates, setEnteredCertificates] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredLink, setEnteredLink] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const enteredExistingCollection = useRef();
  const enteredCat = useRef();
  const pickedSupplier = useRef();

  const pushInto = (el, arr) => {
    arr.push(el);
    return arr;
  };

  let ss,
    specificSupplier,
    specificSupplierOptions,
    allCollectionsOption,
    allCollectionsOption2;

  if (props.supplier) {
    //Specific supplier case
    ss = suppliersState.find((el) => el.path === props.supplier);

    specificSupplier = pushInto(
      suppliersState.find((el) => el.path === props.supplier).name,
      []
    );

    specificSupplierOptions = [pushInto(ss.matCollections, specificSupplier)];

    allCollectionsOption2 = specificSupplierOptions.map((el) => (
      <optgroup label={el[0]} key={el[0]}>
        {el[1].map((el) => (
          <option value={el.name} key={el.name}>
            {el.name}
          </option>
        ))}
      </optgroup>
    ));

    console.log(allCollectionsOption2);
  }

  if (!props.supplier) {
    //All suppliers case
    const supplierList = suppliersState.map((el) => [el.name]);

    console.log(supplierList);

    const allCollections = suppliersState.map((el) => el.matCollections);

    const selectOptionsArr = supplierList.map((el, index) => {
      el.push(allCollections[index]);
      return el;
    });

    console.log(selectOptionsArr);

    allCollectionsOption = selectOptionsArr.map((el) => (
      <optgroup label={el[0]} key={el[0]}>
        {el[1]?.map((el) => (
          <option value={el.name} key={el.name}>
            {el.name}
          </option>
        ))}
      </optgroup>
    ));

    console.log(allCollectionsOption);
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
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
      pickedSupplier.current.value === ""
    ) {
      console.log("empty");
      return;
    }

    ///Utility functions///

    function findCategory(el) {
      if (el.name && enteredCategory === "") {
        return el.name === enteredCat.current.value;
      }
      if (!el.name && enteredCategory !== "") {
        return el.name === enteredCategory;
      }
    }

    function findSupplier(el) {
      return el.name === pickedSupplier.current.value;
    }

    function findCollection(el) {
      if (el.name && enteredCollection === "") {
        return el.name === enteredExistingCollection.current.value;
      }
      if (!el.name && enteredCollection !== "") {
        return el.name === enteredCollection;
      }
    }

    ///////////////////////

    if (materialState.find(findCategory) || !materialState.find(findCategory)) {
      dispatch(
        libraryActions.addMaterials({
          name: enteredName,
          supplier: pickedSupplier.current.value,
          collection: enteredCollection,
          existingCollection: enteredExistingCollection.current.value,
          category: enteredCategory,
          existingCategory: enteredCat.current.value,
          certificates: enteredCertificates,
          info: enteredDescription,
          image: enteredImage,
          link: enteredLink,
          findCategory: findCategory,
          pushInto: pushInto,
        })
      );
    }

    const materialCollection = suppliersState
      .find(findSupplier)
      .matCollections.find(findCollection);

    if (materialCollection || !materialCollection) {
      dispatch(
        suppliersActions.addCollection({
          name: enteredName,
          supplier: pickedSupplier.current.value,
          collection: enteredCollection,
          existingCollection: enteredExistingCollection.current.value,
          category: enteredCategory,
          existingCategory: enteredCat.current.value,
          certificates: enteredCertificates,
          info: enteredDescription,
          image: enteredImage,
          link: enteredLink,
          findSupplier: findSupplier,
          findCollection: findCollection,
          pushInto: pushInto,
        })
      );
    }

    ///Setting all input walues back to empty string///

    setEnteredName("");
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
                {props.supplier ? allCollectionsOption2 : allCollectionsOption}
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
                {materialState.map((el) => {
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
                {!props.supplier ? (
                  suppliersState.map((el) => {
                    return <option key={el.name}>{el.name}</option>;
                  })
                ) : (
                  <option key={specificSupplier[0]}>
                    {specificSupplier[0]}
                  </option>
                )}
              </select>
              <p className={classes.description}>Pick existing supplier</p>
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
