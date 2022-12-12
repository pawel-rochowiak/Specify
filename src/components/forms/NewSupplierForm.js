import React, { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "./NewTaskForm.module.css";
import { suppliersActions } from "../../store/suppliers-slice";
import { useDispatch } from "react-redux";

const NewSupplierForm = (props) => {
  const dispatch = useDispatch();
  const [enteredName, setEnteredName] = useState("");
  const [enteredField, setEnteredField] = useState("");
  const [enteredCountry, setEnteredCountry] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredFullName, setEnteredFullName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredTelephoneNumber, setEnteredTelephoneNumber] = useState("");

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const fieldInputChangeHandler = (event) => {
    setEnteredField(event.target.value);
  };
  const countryInputChangeHandler = (event) => {
    setEnteredCountry(event.target.value);
  };
  const cityInputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };
  const streetInputChangeHandler = (event) => {
    setEnteredStreet(event.target.value);
  };
  const numberInputChangeHandler = (event) => {
    setEnteredNumber(event.target.value);
  };
  const fullNameInputChangeHandler = (event) => {
    setEnteredFullName(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const telephoneInputChangeHandler = (event) => {
    setEnteredTelephoneNumber(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredField.trim() === "" ||
      enteredCountry.trim() === "" ||
      enteredCity.trim() === "" ||
      enteredStreet.trim() === "" ||
      enteredNumber.trim() === "" ||
      enteredFullName.trim() === "" ||
      enteredEmail.trim() === "" ||
      enteredTelephoneNumber.trim() === ""
    ) {
      console.log("empty");
      return;
    }

    const supplierIndex = props.itemToEdit;

    if (props.editing === true) {
      dispatch(
        suppliersActions.editSupplier({
          name: enteredName,
          field: enteredField,
          country: enteredCountry,
          city: enteredCity,
          street: enteredStreet,
          number: enteredNumber,
          fullName: enteredFullName,
          email: enteredEmail,
          tel: enteredTelephoneNumber,
          supplierIndex,
        })
      );
    } else {
      dispatch(
        suppliersActions.addSuppliers({
          name: enteredName,
          field: enteredField,
          country: enteredCountry,
          city: enteredCity,
          street: enteredStreet,
          number: enteredNumber,
          fullName: enteredFullName,
          email: enteredEmail,
          tel: enteredTelephoneNumber,
        })
      );
    }

    setEnteredName("");
    setEnteredField("");
    setEnteredCountry("");
    setEnteredCity("");
    setEnteredStreet("");
    setEnteredNumber("");
    setEnteredFullName("");
    setEnteredEmail("");
    setEnteredTelephoneNumber("");

    props.onExit();
  };

  const mainContent = (
    <div className={classes.container}>
      <p className={classes.header}>New supplier</p>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            value={enteredName}
          ></input>
          <p className={classes.description}>Supplier name</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="field"
            onChange={fieldInputChangeHandler}
            value={enteredField}
          ></input>
          <p className={classes.description}>Specialisation</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="country"
            onChange={countryInputChangeHandler}
            value={enteredCountry}
          ></input>
          <p className={classes.description}>Country</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="city"
            onChange={cityInputChangeHandler}
            value={enteredCity}
          ></input>
          <p className={classes.description}>City</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="street"
            onChange={streetInputChangeHandler}
            value={enteredStreet}
          ></input>
          <p className={classes.description}>Street</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="number"
            onChange={numberInputChangeHandler}
            value={enteredNumber}
          ></input>
          <p className={classes.description}>Number</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="fullname"
            onChange={fullNameInputChangeHandler}
            value={enteredFullName}
          ></input>
          <p className={classes.description}>Full name</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="email"
            onChange={emailInputChangeHandler}
            value={enteredEmail}
          ></input>
          <p className={classes.description}>Email</p>
        </div>
        <div className={classes.formGroup}>
          <input
            type="text"
            id="email"
            onChange={telephoneInputChangeHandler}
            value={enteredTelephoneNumber}
          ></input>
          <p className={classes.description}>Tel. number</p>
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

export default NewSupplierForm;
