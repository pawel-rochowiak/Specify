import React from "react";
import Modal from "../../UI/Modal";
import PasswordIcon from "../icons/PasswordIcon";
import CheckIcon from "../icons/CheckIcon";
import EmailIcon from "../icons/EmailIcon";
import Logo from "../../Assets/specify_logo.png";
import classes from "./NewUserForm.module.css";

const NewUserForm = (props) => {
  const mainContent = (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={Logo}></img>
      </div>
      <form className={classes.form}>
        <div className={classes.formGroup}>
          <EmailIcon className={classes.icon} />
          <input required type="text" id="name"></input>
          <p className={classes.description}>Name</p>
        </div>
        <div className={classes.formGroup}>
          <EmailIcon className={classes.icon} />
          <input required type="text" id="surname"></input>
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
          <input required type="text" id="confirmMail"></input>
          <p className={classes.description}>confirm e-mail</p>
        </div>
        <div className={classes.formGroup}>
          <CheckIcon className={classes.icon} />
          <input required type="text" id="confirmPassword"></input>
          <p className={classes.description}>confirm password</p>
        </div>
      </form>
      <div className={classes.buttons}>
        <button type="submit">submit</button>
      </div>
    </div>
  );

  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      {mainContent}
    </Modal>
  );
};

export default NewUserForm;
