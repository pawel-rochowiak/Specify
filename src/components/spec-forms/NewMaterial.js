import classes from "./NewMaterial.module.css";
import CheckIcon from "../icons/SingleCheckIcon";
import EditIcon from "../icons/EditIcon";
import { useRef, useState } from "react";

const NewMaterial = (props) => {
  // const enteredNumber = useRef();
  // const enteredItem = useRef();
  // const enteredDescription = useRef();
  // const enteredSupplier = useRef();
  // const enteredDate = useRef();
  // const enteredPicure = useRef();

  const [enteredCode, setEnteredCode] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredTaskDate, setEnteredTaskDate] = useState("");
  const [enteredTaskPicture, setEnteredTaskPicture] = useState("");
  const [checked, setChecked] = useState(false);

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

  const data = {
    number: enteredCode,
    item: enteredItem,
    description: enteredDescription,
    supplier: enteredSupplier,
    date: enteredTaskDate,
    picture: enteredTaskPicture,
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    props.getData(data);
    setChecked(!checked);
  };

  const formClasses = !checked
    ? `${classes.info_materials}`
    : `${classes.info_materials} ${classes.checked}`;

  return (
    <form className={formClasses} onSubmit={formSubmissionHandler}>
      <button className={classes.button}>
        {!checked ? <CheckIcon size="2.5rem" /> : <EditIcon size="2.5rem" />}
      </button>

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
    </form>
  );
};

export default NewMaterial;
