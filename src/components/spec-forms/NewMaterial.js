import classes from "./NewMaterial.module.css";
import CheckIcon from "../icons/SingleCheckIcon";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import { Fragment, useState, useRef } from "react";
import { useSelector } from "react-redux";

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
  const [materialInputType, setMaterialInputType] = useState(props.checkProps);
  const [formInputType, setFormInputType] = useState("default");
  const [selectedMaterial, setSelectedMaterial] = useState(false);
  const materialState = useSelector((state) => state.library);
  const pickedMaterial = useRef();

  console.log(materialState);

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

  const materialTypeConfirmHandler = (event) => {
    event.preventDefault();
    // setMaterialInputType(true);
    setFormInputType("picked");
  };

  const materialTypeDenyHandler = (event) => {
    event.preventDefault();
    // setMaterialInputType(false);
    setFormInputType("entered");
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

    console.log("clicked");

    const arrIndex = +event.target.dataset.order;
    const checkedMat = event.target.dataset.checked === "true" ? false : true;
    props.getMatChecked(checkedMat, arrIndex, props.checkProps);

    if (currentIndex !== arrIndex) props.getData(data);
    if (currentIndex === arrIndex) props.replaceData(data, arrIndex);

    setCurrentIndex(arrIndex);

    setChecked(!checked);

    props.getChecked(!checked);
  };

  const formInputClasses = !setMaterialInputType
    ? `${classes.info_materials}`
    : `${classes.info_materials__type}`;

  let formInputClasses2;

  const formClasses = !checked
    ? `${classes.info_materials}`
    : `${classes.info_materials} ${classes.checked}`;

  if (formInputType === "default")
    formInputClasses2 = `${classes.info_materials__type}`;

  if (formInputType === "entered" || formInputType === "picked")
    formInputClasses2 = `${classes.info_materials}`;

  const inputFormMarkup = (
    <Fragment>
      <button className={`${classes.button} btnMatForm`}>
        {!checked ? <CheckIcon size="2.5rem" /> : <EditIcon size="2.5rem" />}
      </button>
      <div className={classes.info_materials__detail}>
        <div className={classes.code}>
          <input
            type="number"
            disabled={!checked ? false : true}
            onChange={codeInputChangeHandler}
            value={selectedMaterial ? 100 : enteredCode}
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
            disabled={!checked ? false : true}
            onChange={pictureInputChangeHandler}
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

  const testHandler = () => {
    const [categoryIndex, materialIndex] = pickedMaterial.current.value.split(
      ","
    );
    console.log(+categoryIndex, +materialIndex);
    console.log(materialState[+categoryIndex].materials[+materialIndex]);
    setSelectedMaterial(true);
    setFormInputType("entered");
  };

  const materialDropdownJSX = (
    <div>
      <select ref={pickedMaterial} onChange={testHandler}>
        <option disabled selected value>
          {" "}
          Select{" "}
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
        formInputType === "entered" || formInputType === "picked"
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
