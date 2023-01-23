import classes from "./StartPage.module.css";
import Task from "../components/Task";
import { useSelector } from "react-redux";
// import Message from "../components/Message";
import { Fragment } from "react";

const HomePage = (props) => {
  const stateTasks = useSelector((state) => state.tasks);

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Current tasks</div>
        <div className={classes.categoriesTask}>
          <div>Project</div>
          <div>Subject</div>
          <div>Team</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className={classes.taskList}>
          {stateTasks.map((el, index) => {
            return (
              <Task
                key={el.path}
                name={el.project}
                team={el.team}
                task={el.name}
                date={el.date}
                status={el.status}
                disabled={true}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
