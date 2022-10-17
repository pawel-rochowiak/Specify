import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import CloseIcon from "../components/icons/CloseIcon";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <button onClick={props.onClose} className={classes.closeBtn}>
        <CloseIcon />
      </button>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onExit} />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onExit}>{props.children}</ModalOverlay>,
        portalEl
      )}
    </React.Fragment>
  );
};

export default Modal;
