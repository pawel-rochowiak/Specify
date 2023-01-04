import classes from "./NewMaterial.module.css";
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

  //props.getData(data);
  console.log(data);

  return (
    <div className={classes.info_materials}>
      <div className={classes.code}>
        <input type="number" onChange={codeInputChangeHandler} />
      </div>
      <div className={classes.item}>
        <input type="text" onChange={itemInputChangeHandler} />
      </div>
      <div className={classes.description}>
        <input type="text" onChange={descriptionInputChangeHandler} />
      </div>
      <div className={classes.supplier}>
        <input type="text" onChange={supplierInputChangeHandler} />
      </div>
      <div className={classes.date}>
        <input type="date" onChange={dateInputChangeHandler} />
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
  );
};

export default NewMaterial;
