import React, { Fragment, useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Welcome.module.css";
import Card from "../UI/Card";
import PasswordIcon from "../components/icons/PasswordIcon";
import UserIcon from "../components/icons/UserIcon";
import Logo from "../Assets/specify_logo.png";
import NewUserForm from "../components/forms/NewUserForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import { firebaseAuth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import swal from "sweetalert";

//STATE//
import { usersActions } from "../store/users-slice";
import { useDispatch } from "react-redux";

const Welcome = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        enteredEmail,
        enteredPassword
      );
      const user = result.user;

      if (user.emailVerified) {
        navigate("/home");
        localStorage.setItem("login", enteredEmail);
        dispatch(usersActions.login(enteredEmail));
      } else {
        await sendEmailVerification(user);
        swal(
          `The user is not verified! A new verification email was sent. Please check your email and SPAM folder!`,
          {
            buttons: false,
            timer: 3500,
          }
        );
      }
    } catch (error) {
      swal(`Invalid email or password. Please try again`, {
        buttons: false,
        timer: 2000,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document
      .getElementById("password")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("loginBtn").click();
        }
      });
  }, []);

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
        <form id="loginForm" className={classes.form}>
          <div className={classes.formGroup}>
            <UserIcon className={classes.icon} size="3rem" />
            <input required ref={emailInputRef} type="text" id="user"></input>
            <p className={classes.description}>user name</p>
          </div>
          <div className={classes.formGroup}>
            <PasswordIcon className={classes.icon} />
            <input
              required
              ref={passwordInputRef}
              type="password"
              id="password"
            ></input>
            <p className={classes.description}>password</p>
          </div>
        </form>
        <div className={classes.buttons}>
          <button type="button" onClick={addNewUserHandler}>
            New user
          </button>

          <button type="button" id="loginBtn" onClick={submitHandler}>
            {!isLoading && "Login"}
            {isLoading && <LoadingSpinner />}
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
