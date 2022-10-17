import classes from "./Label.module.css";

const Label = (props) => {
  return <div className={classes.label}>{props.name}</div>;
};

export default Label;
