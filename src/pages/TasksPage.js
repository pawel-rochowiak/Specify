import classes from "./StartPage.module.css";
import classesTaskPage from "./TaskPage.module.css";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const TasksPage = (props) => {
  const stateTasks = useSelector((state) => state.tasks);
  const [createItem] = useOutletContext();

  return (
    <Fragment>
      <div className={classesTaskPage.tasks}>
        <div className={classes.name}>Current tasks</div>
        <div className={classes.categoriesTask}>
          <div>Project</div>
          <div>Venue</div>
          <div>Type</div>
          <div>Date</div>
          <div>Assigned User</div>
        </div>
        <div className={classes.taskList}>
          {stateTasks.map((el, index) => (
            <Task
              key={el.path}
              name={el.project}
              venue={el.area}
              number={el.number}
              person={el.resPerson}
              task={el.specification}
              date={el.date}
              status={el.status}
              dataset={index}
              edit={createItem}
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
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
