import classes from "./StartPage.module.css";
import classesTaskPage from "./TaskPage.module.css";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const TasksPage = (props) => {
  const stateTasks = useSelector((state) => state.tasks);

  return (
    <Fragment>
      <div className={classesTaskPage.tasks}>
        <div className={classes.name}>Current tasks</div>
        <div className={classes.categoriesTask}>
          <div>Project</div>
          <div>Subject</div>
          <div>Team</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className={classes.taskList}>
          {stateTasks.map((el, index) => (
            <Task
              key={el.path}
              name={el.project}
              area={el.area}
              team={el.team}
              task={el.specification}
              date={el.date}
              status={el.status}
              dataset={index}
              edit={props.createItem}
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={props.createItem}
          >
            Create task
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TasksPage;
