import classes from "./NewMaterial.module.css";
import CheckIcon from "../icons/SingleCheckIcon";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import Modal from "../../UI/Modal";
import { Fragment, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

//setMaterialInputType(false); this needs to be changed by the add material btn from TaskDetail page

const NewMaterial = (props) => {
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredTaskDate, setEnteredTaskDate] = useState("");
  const [enteredTaskPicture, setEnteredTaskPicture] = useState("");
  const [checked, setChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  // const [materialInputType, setMaterialInputType] = useState(props.checkProps);
  const [formInputType, setFormInputType] = useState("default");
  const [selectedMaterial, setSelectedMaterial] = useState(false);
  //State for keeping the image
  const [imageUpload, setImageUpload] = useState(null);
  //Other
  const materialState = useSelector((state) => state.library);
  const pickedMaterial = useRef();

  const codeInputChangeHandler = (event) => {
    setEnteredCode(event.target.value);
  };

  const itemInputChangeHandler = (event) => {
    setEnteredItem(event.target.value);
  };

  const descriptionInputChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const supplierInputChangeHandler = (event) => {
    setEnteredSupplier(event.target.value);
  };

  const dateInputChangeHandler = (event) => {
    setEnteredTaskDate(event.target.value);
  };

  const pictureInputChangeHandler = (event) => {
    setEnteredTaskPicture(event.target.value);
    setImageUpload(event.target.files[0]);
  };

  const materialTypeConfirmHandler = (event) => {
    event.preventDefault();
    setFormInputType("picked");
  };

  const materialTypeDenyHandler = (event) => {
    event.preventDefault();
    setFormInputType("entered");
  };

  //Fn for uploading image to Firebase
  //add code material for better image identification
  const uploadImage = (event) => {
    if (imageUpload === null) return;
    const imgRef = ref(
      storage,
      `images/${enteredCode}-${imageUpload.name + v4()}`
    );
    uploadBytes(imgRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const data = {
      number: enteredCode,
      item: enteredItem,
      description: enteredDescription,
      supplier: enteredSupplier,
      date: enteredTaskDate,
      picture: enteredTaskPicture,
    };

    const arrIndex = +event.target.dataset.order;
    const checkedMat = event.target.dataset.checked === "true" ? false : true;
    props.getMatChecked(checkedMat, arrIndex, props.checkProps);

    if (currentIndex !== arrIndex) props.getData(data);
    if (currentIndex === arrIndex) props.replaceData(data, arrIndex);

    setCurrentIndex(arrIndex);

    const messageInput = (
      <div>
        All input fields needs to be filled in order to proceed with next
        material.
      </div>
    );

    if (
      enteredCode !== "" &&
      enteredItem !== "" &&
      enteredDescription !== "" &&
      enteredSupplier !== "" &&
      enteredTaskDate !== "" &&
      enteredTaskPicture !== ""
    ) {
      setChecked(!checked);
      props.getChecked(!checked);
    } else {
      // <Modal message={messageInput} />;
      // console.log(props);
      // props.modalOpen();
      console.log("empty");
    }

    uploadImage();
  };

  const testHandler = () => {
    const [categoryIndex, materialIndex] = pickedMaterial.current.value.split(
      ","
    );
    const selectedMat = materialState[+categoryIndex].materials[+materialIndex];
    setSelectedMaterial(true);
    setEnteredDescription(selectedMat.info);
    setFormInputType("entered");
  };

  let formInputClasses2;

  const formClasses = !checked
    ? `${classes.info_materials}`
    : `${classes.info_materials} ${classes.checked}`;

  if (formInputType === "default")
    formInputClasses2 = `${classes.info_materials__type}`;

  if (formInputType === "entered" || formInputType === "picked")
    formInputClasses2 = `${classes.info_materials}`;

  if (formInputType === "picked")
    formInputClasses2 = `${classes.info_materials__type}`;

  // const materialAddHandler = (props) => {
  //   console.log(props);
  //   //add a pointer to the material arrays so they could be filled as the form is accepted instead of adding new material
  // };

  const inputFormMarkup = (
    <Fragment>
      <button
        className={`${classes.button} btnMatForm`}
        // onClick={materialAddHandler}
      >
        {!checked ? <CheckIcon size="2.5rem" /> : <EditIcon size="2.5rem" />}
      </button>
      <div className={classes.info_materials__detail}>
        <div className={classes.code}>
          <input
            type="number"
            disabled={!checked ? false : true}
            onChange={codeInputChangeHandler}
          />
        </div>
        <div className={classes.item}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={itemInputChangeHandler}
            value={enteredItem}
          />
        </div>
        <div className={classes.description}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={descriptionInputChangeHandler}
            value={enteredDescription}
          />
        </div>
        <div className={classes.supplier}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={supplierInputChangeHandler}
            value={enteredSupplier}
          />
        </div>
        <div className={classes.date}>
          <input
            type="date"
            disabled={!checked ? false : true}
            onChange={dateInputChangeHandler}
            value={enteredTaskDate}
          />
        </div>
        <div className={classes.picture}>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            disabled={!checked ? false : true}
            onChange={pictureInputChangeHandler}
            value={enteredTaskPicture}
          />
        </div>
      </div>
    </Fragment>
  );

  const inputTypeCheckMarkup = (
    <div className={classes.materialInput_choose}>
      <span>Do you want to add material from the library?</span>
      <div className={classes.materialInput_choose__btns}>
        <button className={classes.button} onClick={materialTypeConfirmHandler}>
          <CheckIcon size="2.5rem" />
        </button>
        <button className={classes.button} onClick={materialTypeDenyHandler}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );

  const materialDropdownJSX = (
    <div className={classes.materialInput_dropdown}>
      <select ref={pickedMaterial} onChange={testHandler}>
        <option disabled selected value>
          {" "}
          Select material
        </option>
        {materialState.map((el, indexCat) => {
          return (
            <optgroup label={el.name} key={el.name}>
              {el.materials?.map((el, indexMat) => {
                return (
                  <option value={`${indexCat}, ${indexMat}`} key={el.name}>
                    {`${el.name}-${el.supplier}`}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );

  const formJSX = (type) => {
    if (type === "default") {
      return inputTypeCheckMarkup;
    }
    if (type === "entered") {
      return inputFormMarkup;
    }
    if (type === "picked") {
      return materialDropdownJSX;
    }
  };

  return (
    <form
      className={`${
        formInputType === "entered" ||
        formInputType === "picked" ||
        formInputType === "default"
          ? formInputClasses2
          : formClasses
      } matForm`}
      onSubmit={formSubmissionHandler}
      data-order={props.data}
      data-checked={checked}
    >
      {formJSX(formInputType)}
    </form>
  );
};

export default NewMaterial;
