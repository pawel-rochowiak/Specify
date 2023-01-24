import classes from "./SuppliersPage.module.css";
import SupplierItem from "../components/SupplierItem";
import DetailsItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const SuppliersPage = (props) => {
  const stateSuppliers = useSelector((state) => state.suppliers);
  const createItem = useOutletContext();

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
          {stateSuppliers.map((el, index) => (
            <SupplierItem
              key={el.path}
              name={el.name}
              field={el.field}
              adress={el.adress}
              contact={el.contactPerson}
              dataset={index}
              edit={createItem}
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
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
