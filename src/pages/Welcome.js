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
import { signInWithEmailAndPassword } from "firebase/auth";
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
        console.log("User is verified!");
        navigate("/home");
        localStorage.setItem("login", enteredEmail);
        dispatch(usersActions.login(enteredEmail));
      } else {
        swal(`User is not verified!`, {
          buttons: false,
          timer: 2000,
        });
      }
    } catch (error) {
      swal(`Invalid email or password. Please try again`, {
        buttons: false,
        timer: 2000,
      });
    }
    setIsLoading(false);

    // fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvhJIuwY1ms610WG-tDggIcuKbGrSEd5o",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: enteredEmail,
    //       password: enteredPassword,
    //       returnSecureToken: true,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage =
    //           "Autenthication failed! Please check your login and password!";

    //         if (data && data.error && data.error.message) {
    //           errorMessage = data.error.message;
    //         }

    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     navigate("/home");
    //     localStorage.setItem("login", data.email);
    //     dispatch(usersActions.login(data));
    //   })
    //   .catch((err) => {
    //     swal(`${err.message}`, {
    //       buttons: false,
    //       timer: 2000,
    //     });
    //   });
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
