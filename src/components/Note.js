import classes from "./Note.module.css";

const Note = (props) => {
  return (
    <div className={classes.task}>
      <div className={classes.date}>{props.date}</div>
      <div className={classes.message}>{props.note}</div>
    </div>
  );
};

export default Note;
