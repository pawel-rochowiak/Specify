import React, { Fragment } from "react";
import Card from "../UI/Card";
import { useState, useRef } from "react";
import PasswordIcon from "../components/icons/PasswordIcon";
import UserIcon from "../components/icons/UserIcon";
import Logo from "../Assets/specify_logo.png";
import classes from "./Welcome.module.css";
import NewUserForm from "../components/forms/NewUserForm";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvhJIuwY1ms610WG-tDggIcuKbGrSEd5o",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Autenthication failed!";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addNewUserHandler = () => {
    setIsVisible(true);
  };

  const closeNewUserForm = () => {
    setIsVisible(false);
  };

  const mainContent = (
    <Card>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={Logo}></img>
        </div>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <UserIcon className={classes.icon} size="3rem" />
            <input ref={emailInputRef} type="text" id="user"></input>
            <p className={classes.description}>user name</p>
          </div>
          <div className={classes.formGroup}>
            <PasswordIcon className={classes.icon} />
            <input ref={passwordInputRef} type="text" id="password"></input>
            <p className={classes.description}>password</p>
          </div>
        </form>
        <div className={classes.buttons}>
          <button type="button" onClick={addNewUserHandler}>
            New user
          </button>
          <button type="button" onClick={submitHandler}>
            Login
          </button>
        </div>
      </div>
    </Card>
  );

  return (
    <Fragment>
      {isVisible ? (
        <NewUserForm onClick={addNewUserHandler} onExit={closeNewUserForm} />
      ) : (
        ""
      )}
      {mainContent}
    </Fragment>
  );
};

export default Welcome;
