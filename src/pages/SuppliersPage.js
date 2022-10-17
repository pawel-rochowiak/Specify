import classes from "./SuppliersPage.module.css";
import SupplierItem from "../components/SupplierItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";

const SuppliersPage = (props) => {
  const suppliersArr = [
    {
      name: "Preciosa",
      field: "decorative lighting",
      adress: {
        country: "Czech Republic",
        city: "Pepiczkowo",
        street: "Pampuchowa",
        number: "123/45",
      },
      contact: {
        name: "Pan Pepiczek",
        mail: "pepiczek@praga.cz",
        tel: "555-5555",
      },
    },
    {
      name: "Pan Wiesio i synowie",
      field: "Carpentry",
      adress: {
        country: "Polska",
        city: "Mietków",
        street: "Sękowa",
        number: "1/2",
      },
      contact: {
        name: "Pan Wiesiek",
        mail: "jestem_wiesio@gógle.pl",
        tel: "444-5555",
      },
    },
  ];

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
          {suppliersArr.map((el) => (
            <SupplierItem
              name={el.name}
              field={el.field}
              adress={el.adress}
              contact={el.contact}
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
