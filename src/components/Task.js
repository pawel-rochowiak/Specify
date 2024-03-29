import { useState, useEffect } from "react";
import classes from "./Task.module.css";
import WarningIcon from "../components/icons/WarningIcon";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../store/tasks-slice.js";
import { projectActions } from "../store/projects-slice.js";
import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

const Task = (props) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const projects = useSelector((state) => state.projects);
  const [isFinished, setIsFinished] = useState(false);
  //Current Date
  const projectName = props.name;
  const venueName = props.venue;
  const taskName = props.task;
  const currentTask = tasks.find(
    (el) =>
      el.area?.toLowerCase() === venueName?.toLowerCase() &&
      el.project?.trim() === projectName?.trim() &&
      taskName?.trim() === el.specification?.trim()
  );
  const date = new Date().getTime();
  const projectDate = new Date(props.date).getTime();
  const editDate = currentTask?.editedOn ? currentTask?.editedOn : "-";

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

  // FN for deleting PDF specification from firebase storage
  const deletePDFSpec = () => {
    const filename = `specifications/${projectName}/${venueName.toUpperCase()}-${taskName.trim()}.pdf`;
    const imgRef = ref(storage, filename);
    deleteObject(imgRef).catch((error) => {
      console.log(error.message);
    });
  };

  // FN for deleting task from the UI and database
  const targetDeleteHandler = (ev) => {
    ev.preventDefault();
    const targetStart = ev.target.closest("div[class*='Task_task']").dataset
      .order;
    const indexOfProject = projects.findIndex((el) => el.name === projectName);
    const indexOfProjectArea = projects
      .find((el) => el.name === projectName)
      .area.findIndex((el) => el.name === venueName);

    swal({
      title: `You are about to delete ${taskName} for ${projectName}-${venueName}.`,
      text: "Once deleted, specification details will be lost!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`${venueName} ${taskName} was deleted!`, {
          icon: "success",
        });
        deletePDFSpec();
        dispatch(tasksActions.deleteTask(targetStart));
        dispatch(
          projectActions.deleteProjectArea({
            sectionMainItemIndex: indexOfProject,
            index: indexOfProjectArea,
          })
        );
      } else {
        swal("Your specification details are safe!");
      }
    });
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
      <div className={classes.projectTeam}>{props.venue}</div>
      <div className={classes.projectTask}>{props.task}</div>
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
      <div className={`${classes.projectTask} ${classes.projectEditDate}`}>
        {editDate}
      </div>
      <div className={classes.projectResponsible}>
        <p className={classes.resPerson}>{props.person}</p>
      </div>
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
