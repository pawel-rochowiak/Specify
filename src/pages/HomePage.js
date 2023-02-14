import classes from "./StartPage.module.css";
import Task from "../components/Task";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const HomePage = (props) => {
  const stateTasks = useSelector((state) => state.tasks);

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Current tasks</div>
        {stateTasks.length > 0 ? (
          <div className={classes.categoriesTask}>
            <div>Project</div>
            <div>Venue</div>
            <div>Type</div>
            <div>Date</div>
            <div>Assigned User</div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.taskList}>
          {stateTasks.length > 0 ? (
            stateTasks.map((el, index) => {
              return (
                <Task
                  key={el.path}
                  venue={el.area}
                  name={el.project}
                  person={el.resPerson}
                  task={el.specification}
                  date={el.date}
                  disabled={true}
                />
              );
            })
          ) : (
            <div className={classes.info_message}>
              No task has been added. Please go to{" "}
              <span className={classes.highlight}>"Tasks"</span> press
              <span className={classes.highlight}>"Create item"</span> button to
              add new supplier.
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
