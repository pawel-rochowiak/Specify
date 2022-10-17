import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={classes.task}>
      <div className={classes.date}>{props.date}</div>
      <div className={classes.projectName}>{props.name}</div>
      <div className={classes.sender}>{props.sender}</div>
      <div className={classes.message}>{props.message}</div>
    </div>
  );
};

export default Message;
