import { useState, useEffect } from "react";
import classes from "./Task.module.css";
import WarningIcon from "../components/icons/WarningIcon";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useDispatch } from "react-redux";
import { tasksActions } from "../store/tasks-slice.js";

const Task = (props) => {
  console.log(props);
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();
  //Current Date
  const date = new Date().getTime();
  const projectDate = new Date(props.date).getTime();

  useEffect(() => {
    if (date > projectDate) setIsFinished(true);
  }, [date, projectDate]);

  const dateClasses = isFinished
    ? `${classes.projectDate} ${classes.overdue}`
    : `${classes.projectDate}`;

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='Task_task']").dataset
      .order;

    props.edit(true, targetStart, props);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='Task_task']").dataset
      .order;

    dispatch(tasksActions.deleteTask(targetStart));
  };

  return (
    <div className={classes.task} data-order={props.dataset}>
      {!props.disabled ? (
        <div className={classes.edit} onClick={targetEditHandler}>
          <EditIcon className={classes.edit} />
        </div>
      ) : (
        ""
      )}
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
      {!props.disabled ? (
        <div className={classes.delete} onClick={targetDeleteHandler}>
          <CloseIcon />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Task;
