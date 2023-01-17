import classes from "./NewMaterial.module.css";
import CheckIcon from "../icons/SingleCheckIcon";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import { Fragment, useState } from "react";

const NewMaterial = (props) => {
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredTaskDate, setEnteredTaskDate] = useState("");
  const [enteredTaskPicture, setEnteredTaskPicture] = useState("");
  const [checked, setChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [materialInputType, setMaterialInputType] = useState(false);

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
  };

  const materialTypeHandler = (event) => {
    event.preventDefault();
    setMaterialInputType(true);
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
    props.getMatChecked(checkedMat, arrIndex);

    if (currentIndex !== arrIndex) props.getData(data);
    if (currentIndex === arrIndex) props.replaceData(data, arrIndex);

    setCurrentIndex(arrIndex);

    setChecked(!checked);
    props.getChecked(!checked);
  };

  const formInputClasses = !setMaterialInputType
    ? `${classes.info_materials}`
    : `${classes.info_materials__type}`;

  const formClasses = !checked
    ? `${classes.info_materials}`
    : `${classes.info_materials} ${classes.checked}`;

  const inputFormMarkup = (
    <Fragment>
      <button className={classes.button}>
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
          />
        </div>
        <div className={classes.description}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={descriptionInputChangeHandler}
          />
        </div>
        <div className={classes.supplier}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={supplierInputChangeHandler}
          />
        </div>
        <div className={classes.date}>
          <input
            type="date"
            disabled={!checked ? false : true}
            onChange={dateInputChangeHandler}
          />
        </div>
        <div className={classes.picture}>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={pictureInputChangeHandler}
          />
        </div>
      </div>
    </Fragment>
  );

  const inputTypeCheckMarkup = (
    <div className={classes.materialInput_choose}>
      <span>Do You want to add material from the library?</span>
      <div className={classes.materialInput_choose__btns}>
        <button className={classes.button} onClick={materialTypeHandler}>
          <CheckIcon size="2.5rem" />
        </button>
        <button className={classes.button} onClick={materialTypeHandler}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );

  return (
    <form
      className={!materialInputType ? formInputClasses : formClasses}
      onSubmit={formSubmissionHandler}
      data-order={props.data}
      data-checked={checked}
    >
      {materialInputType === true ? "" : inputTypeCheckMarkup}
      {materialInputType === false ? "" : inputFormMarkup}
    </form>
  );
};

export default NewMaterial;
