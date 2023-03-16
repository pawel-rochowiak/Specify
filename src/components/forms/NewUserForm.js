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
import { uCharHexNumber } from "docx";

const NewUserForm = (props) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredNameFirstLtr = nameInputRef.current.value[0];
    const enteredSurnameFirstLtr = surnameInputRef.current.value[0];

    setIsLoading(true);

    try {
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

    // createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    //   .then((userCredential) => {
    //     //   // Signed in
    //     //   console.log(userCredential);
    //     const user = userCredential.user;
    //     setIsLoading(false);
    //     dispatch(
    //       usersActions.addUser({
    //         name: enteredName,
    //         surname: enteredSurname,
    //         initials: `${enteredNameFirstLtr}${enteredSurnameFirstLtr}`,
    //         email: user.email,
    //         isLoggedIn: false,
    //       })
    //     );
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     alert(errorMessage);
    //     // ..
    //   });
  };

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
          <input required type="text" id="mail"></input>
          <p className={classes.description}>E-mail (to be used as login)</p>
        </div>
        <div className={classes.formGroup}>
          <PasswordIcon className={classes.icon} />
          <input required type="text" id="password"></input>
          <p className={classes.description}>password</p>
        </div>
        <div className={classes.formGroup}>
          <EmailIcon className={classes.icon} />
          <input ref={emailInputRef} type="text" id="confirmMail"></input>
          <p className={classes.description}>confirm e-mail</p>
        </div>
        <div className={classes.formGroup}>
          <CheckIcon className={classes.icon} />
          <input
            ref={passwordInputRef}
            type="text"
            id="confirmPassword"
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
