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
  sendPasswordResetEmail,
} from "firebase/auth";
//STATE//
import { usersActions } from "../../store/users-slice";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const NewUserForm = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRefConf = useRef();
  const emailInputRefConf = useRef();
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userCridentialPersist, setUserCridentialPersist] = useState({});
  const [showReVerificationBtn, setShowReVerificationBtn] = useState(false);

  const emailCheckHanlder = (event) => {
    setEmailCheck(event.target.value);
  };

  const passwordCheckHanlder = (event) => {
    setPasswordCheck(event.target.value);
  };

  const emailHandlder = (event) => {
    setEmail(event.target.value);
  };

  const passwordHanlder = (event) => {
    setPassword(event.target.value);
  };

  const verificationText =
    "A verification email was sent! Please check your mail and follow the link to verify your account.";

  const reVerificationHandler = async (event) => {
    event.preventDefault();
    await sendEmailVerification(userCridentialPersist.user);
    swal(`${verificationText}`, {
      icon: "success",
    });
  };

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

    let userCredential;

    try {
      // if (users.find((el) => el.email === enteredEmail)) {
      //   console.log(
      //     "User with this email already exist! If you forgot you password please change it. If you accout is not varified please click resend button"
      //   );
      // }

      if (
        enteredEmail !== enteredEmailConfirmation ||
        enteredPassword !== enteredPasswordConfirmation
      ) {
        setIsLoading(false);
        return;
      }
      // console.log(firebaseAuth.currentUser);
      // firebaseAuth.currentUser.sendEmailVerification().then(()=>console.log("emsil send"));
      // console.log(users.find((el) => el.email === enteredEmail));

      userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        enteredEmail,
        enteredPassword
      );

      setUserCridentialPersist(userCredential);

      await sendEmailVerification(userCredential.user);
      if (users.find((el) => el.email !== enteredEmail)) {
        swal(`${verificationText}`, {
          buttons: false,
          icon: "success",
          timer: 2000,
        });
        setIsLoading(false);
        setShowReVerificationBtn(true);
        dispatch(
          usersActions.addUser({
            name: enteredName,
            surname: enteredSurname,
            initials: `${enteredNameFirstLtr}${enteredSurnameFirstLtr}`,
            email: enteredEmail,
            isLoggedIn: false,
          })
        );
      }
    } catch (error) {
      //const errorMessage = error.message;
      swal({
        title: `User with privided email adress already exists!`,
        text:
          "In case you didn't receive your verification email please click on the 'Verify email' button.",
        icon: "warning",
        // buttons: ["Email verification", "Reset password"],
      });
      setShowReVerificationBtn(true);
      // .then((reValidate) => {
      //   if (reValidate) {
      //     swal(`${passwordResetText}`, {
      //       icon: "success",
      //     });
      //   } else {
      //     sendEmailVerification(userCridentialPersist.user);
      //     swal(`${verificationText}`, {
      //       icon: "success",
      //     });
      //   }
      // });
      setIsLoading(false);
    }
  };

  const warnEmailClass =
    email !== emailCheck && emailCheck !== "" ? `${classes.warning}` : "";
  const warnPasswordClass =
    password !== passwordCheck && passwordCheck !== ""
      ? `${classes.warning}`
      : "";

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
            onChange={emailHandlder}
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
            onChange={passwordHanlder}
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
            onChange={emailCheckHanlder}
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
            onChange={passwordCheckHanlder}
          ></input>
          <p className={classes.description}>confirm password</p>
        </div>
        <div className={classes.buttons}>
          {showReVerificationBtn && (
            <button onClick={reVerificationHandler}>Verify email</button>
          )}
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
