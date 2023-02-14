import classes from "./SuppliersPage.module.css";
import SupplierItem from "../components/SupplierItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const SuppliersPage = (props) => {
  const stateSuppliers = useSelector((state) => state.suppliers);
  const [createItem] = useOutletContext();

  const supplierList = stateSuppliers.length === 0 ? [] : stateSuppliers;

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Suppliers List</div>
        {supplierList.length > 0 ? (
          <div className={classes.categoriesTask}>
            <div>Name</div>
            <div>Field</div>
            <div>Adress</div>
            <div>Contact</div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.taskList}>
          {supplierList.length > 0 ? (
            stateSuppliers.map((el, index) => (
              <SupplierItem
                key={el.path}
                name={el.name}
                field={el.field}
                adress={el.adress}
                contact={el.contactPerson}
                dataset={index}
                edit={createItem}
              />
            ))
          ) : (
            <div className={classes.info_message}>
              No supplier has been added. Please press
              <span className={classes.highlight}>"Create item"</span> button to
              add new supplier.
            </div>
          )}
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
