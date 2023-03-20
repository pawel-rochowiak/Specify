import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import PasswordIcon from "../icons/PasswordIcon";
import CheckIcon from "../icons/CheckIcon";
import EmailIcon from "../icons/EmailIcon";
import UserIcon from "../icons/UserIcon";
import Logo from "../../Assets/specify_logo.png";
import classes from "./NewUserForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { firebaseAuth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
//STATE//
import { usersActions } from "../../store/users-slice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const NewUserForm = (props) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRefConf = useRef();
  const emailInputRefConf = useRef();
  const [warningPassword, setWarningPassword] = useState(false);
  const [warningEmail, setWarningEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmailConfirmation = emailInputRefConf.current.value;
    const enteredPasswordConfirmation = passwordInputRefConf.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredNameFirstLtr = nameInputRef.current.value[0];
    const enteredSurnameFirstLtr = surnameInputRef.current.value[0];

    setIsLoading(true);

    try {
      if (enteredEmail !== enteredEmailConfirmation) {
        console.log("1");
        setWarningEmail(true);
      }

      if (enteredPassword !== enteredPasswordConfirmation) {
        console.log("2");
        setWarningPassword(true);
      }

      if (
        enteredEmail !== enteredEmailConfirmation ||
        enteredPassword !== enteredPasswordConfirmation
      ) {
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        enteredEmail,
        enteredPassword
      );

      await sendEmailVerification(userCredential.user);
      swal(
        `A verification email was sent! Please check your mail and follow the link to verify your account.`,
        {
          buttons: false,
          icon: "success",
          timer: 2000,
        }
      );
      setIsLoading(false);
      dispatch(
        usersActions.addUser({
          name: enteredName,
          surname: enteredSurname,
          initials: `${enteredNameFirstLtr}${enteredSurnameFirstLtr}`,
          email: enteredEmail,
          isLoggedIn: false,
        })
      );
    } catch (error) {
      const errorMessage = error.message;
      swal(`${errorMessage}`, {
        buttons: false,
        icon: "warning",
        timer: 2000,
      });
      setIsLoading(false);
    }
  };

  const warnEmailClass = warningEmail === true ? `${classes.warning}` : "";
  const warnPasswordClass =
    warningPassword === true ? `${classes.warning}` : "";

  const mainContent = (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={Logo}></img>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.formGroup}>
          <UserIcon className={classes.icon} size="3rem" />
          <input required ref={nameInputRef} type="text" id="name"></input>
          <p className={classes.description}>Name</p>
        </div>
        <div className={classes.formGroup}>
          <UserIcon className={classes.icon} size="3rem" />
          <input
            required
            ref={surnameInputRef}
            type="text"
            id="surname"
          ></input>
          <p className={classes.description}>Surname</p>
        </div>
        <div className={classes.formGroup}>
          <EmailIcon className={classes.icon} />
          <input
            required
            className={warnEmailClass}
            ref={emailInputRef}
            type="text"
            id="mail"
          ></input>
          <p className={classes.description}>E-mail (to be used as login)</p>
        </div>
        <div className={classes.formGroup}>
          <PasswordIcon className={classes.icon} />
          <input
            required
            className={warnPasswordClass}
            ref={passwordInputRef}
            type="text"
            id="password"
          ></input>
          <p className={classes.description}>password</p>
        </div>
        <div className={classes.formGroup}>
          <EmailIcon className={classes.icon} />
          <input
            type="text"
            ref={emailInputRefConf}
            id="confirmMail"
            className={warnEmailClass}
          ></input>
          <p className={classes.description}>confirm e-mail</p>
        </div>
        <div className={classes.formGroup}>
          <CheckIcon className={classes.icon} />
          <input
            ref={passwordInputRefConf}
            type="text"
            id="confirmPassword"
            className={warnPasswordClass}
          ></input>
          <p className={classes.description}>confirm password</p>
        </div>
        <div className={classes.buttons}>
          {!isLoading && <button>submit</button>}
          {isLoading && <LoadingSpinner />}
        </div>
      </form>
    </div>
  );

  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      {mainContent}
    </Modal>
  );
};

export default NewUserForm;
