import classes from "./ProjectPageDetails.module.css";
import PlusIcon from "../components/icons/PlusIcon";
import SLICE from "../store/DUMMY_STATE_SLICE";
import { Fragment } from "react";

const SuppliersPageDetails = (props) => {
  function findSupplier(el) {
    return el.name === props.name;
  }

  const correctSupplier = SLICE.suppliers.find(findSupplier);

  console.log(correctSupplier);
  return (
    <Fragment>
      <div className={classes.mainContent}>
        <div className={classes.tasks}>
          <div className={classes.name}>{props.name}</div>
          <div className={classes.taskList}>
            <div className={classes.details}>
              <h3>Supplier details</h3>
              <div className={classes.details_title}>
                <div>
                  <h4>Adress</h4>
                </div>
                <div>
                  <h4>Contact person</h4>
                </div>
              </div>
              <div className={classes.detail_container}>
                <div className={classes.detail_data}>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Country:</span>
                    {correctSupplier.adress.country}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>City:</span>
                    {correctSupplier.adress.city}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Street:</span>
                    {correctSupplier.adress.street}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Number:</span>
                    {correctSupplier.adress.number}
                  </div>
                </div>
                <div className={classes.detail_data}>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>
                      Contact person:
                    </span>
                    {correctSupplier.contactPerson.fullName}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Email:</span>
                    {correctSupplier.contactPerson.email}
                  </div>
                  <div className={classes.detail_info}>
                    <span className={classes.detail_label}>Tel:</span>
                    {correctSupplier.contactPerson.tel}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SuppliersPageDetails;
