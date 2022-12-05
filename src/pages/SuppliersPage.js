import classes from "./SuppliersPage.module.css";
import SupplierItem from "../components/SupplierItem";
import DetailsItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const SuppliersPage = (props) => {
  const stateSuppliers = useSelector((state) => state.suppliers);
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
              edit={props.createItem}
              // section="suppliers"
            />
          ))}
          {/* {stateSuppliers.map((el) => (
            <DetailsItem
              key={el.path}
              name={el.name}
              field={el.field}
              adress={el.adress}
              contact={el.contactPerson}
              grid="4bis"
              edit={props.createItem}
              type="suppliersState"
            />
          ))} */}
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
