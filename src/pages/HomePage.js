import classes from "./StartPage.module.css";
import Task from "../components/Task";
import Message from "../components/Message";
import DUMMY_STATE_SLICE from "../store/DUMMY_STATE_SLICE";
import { Fragment } from "react";

const HomePage = () => {
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
          {DUMMY_STATE_SLICE.tasks.map((el, index) => {
            return (
              <Task
                key={el.path}
                name={el.project}
                team={el.team}
                task={el.name}
                date={el.date}
                status={el.status}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.messages}>
        <div className={classes.name}>Notes</div>
        <div className={classes.categoriesMessage}>
          <div>Date</div>
          <div>Project</div>
          <div>Sender</div>
          <div>Message</div>
        </div>
        <div className={classes.taskList}>
          <Message
            date="09/09/2022"
            name="Princess"
            sender="Rafał"
            message="trololololo"
          />
          <Message
            date="19/09/2022"
            name="Disney"
            sender="Carl"
            message="Signage specification needed. Please contact our subcontractor and request NCS code chart."
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
