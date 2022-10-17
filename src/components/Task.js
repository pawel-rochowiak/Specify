import { useState, useEffect } from "react";
import classes from "./Task.module.css";
import WarningIcon from "../components/icons/WarningIcon";

const Task = (props) => {
  const [isFinished, setIsFinished] = useState(false);
  //Current Date
  useEffect(() => {
    if (date > projectDate) setIsFinished(true);
  }, []);

  const date = new Date().getTime();
  const projectDate = new Date(props.date).getTime();

  const dateClasses = isFinished
    ? `${classes.projectDate} ${classes.overdue}`
    : `${classes.projectDate}`;

  return (
    <div className={classes.task}>
      <div className={classes.projectName}>{props.name}</div>
      <div className={classes.projectTask}>{props.task}</div>
      <div className={classes.projectTeam}>{props.team}</div>
      <div className={dateClasses}>
        {props.date}
        {isFinished ? (
          <div className={classes.warning}>
            <WarningIcon />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={classes.projectStatus}>{props.status}</div>
    </div>
  );
};

export default Task;
