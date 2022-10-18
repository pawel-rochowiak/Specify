import classes from "./SuppliersPage.module.css";
import SupplierItem from "../components/SupplierItem";
import PlusIcon from "../components/icons/PlusIcon";
import SLICE from "../store/DUMMY_STATE_SLICE";
import { Fragment } from "react";

const SuppliersPage = (props) => {
  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Suppliers List</div>
        <div className={classes.categoriesTask}>
          <div>Name</div>
          <div>Field</div>
          <div>Adress</div>
          <div>Contact</div>
        </div>
        <div className={classes.taskList}>
          {SLICE.suppliers.map((el) => (
            <SupplierItem
              name={el.name}
              field={el.field}
              adress={el.adress}
              contact={el.contactPerson}
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={props.createItem}
          >
            Create Item
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SuppliersPage;
