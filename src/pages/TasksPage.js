import classes from "./StartPage.module.css";
import classesTaskPage from "./TaskPage.module.css";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";

const TasksPage = (props) => {
  const tasksArr = props.data;
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
          {tasksArr.map((el) => (
            <Task
              key={el.path}
              name={el.project}
              team={el.team}
              task={el.specification}
              date={el.date}
              status={el.status}
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
