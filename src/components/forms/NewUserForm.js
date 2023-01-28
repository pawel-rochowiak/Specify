import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import PasswordIcon from "../icons/PasswordIcon";
import CheckIcon from "../icons/CheckIcon";
import EmailIcon from "../icons/EmailIcon";
import UserIcon from "../icons/UserIcon";
import Logo from "../../Assets/specify_logo.png";
import classes from "./NewUserForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";

//STATE//
import { usersActions } from "../../store/users-slice";
import { useDispatch } from "react-redux";

const NewUserForm = (props) => {
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredNameFirstLtr = nameInputRef.current.value[0];
    const enteredSurnameFirstLtr = surnameInputRef.current.value[0];

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvhJIuwY1ms610WG-tDggIcuKbGrSEd5o",
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
        dispatch(
          usersActions.addUser({
            name: enteredName,
            surname: enteredSurname,
            initials: `${enteredNameFirstLtr}${enteredSurnameFirstLtr}`,
            token: "",
            email: data.email,
            isLoggedIn: false,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
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
