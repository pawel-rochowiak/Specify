import classes from "./SupplierItem.module.css";
import classesEdit from "./DetailsItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useSelector, useDispatch } from "react-redux";
import { suppliersActions } from "../store/suppliers-slice";

const SupplierItem = (props) => {
  const state = useSelector((state) => state.suppliers);

  const dispatch = useDispatch();

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='SupplierItem_item']")
      .dataset.order;

    props.edit(true, targetStart);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();
    ///rember to chenge the path & key when deleting!!!

    const targetStart = ev.target.closest("div[class*='SupplierItem_item']")
      .dataset.order;

    dispatch(suppliersActions.deleteSupplier({ index: targetStart }));
  };
  return (
    <div className={classes.item} data-order={props.dataset}>
      <div className={classes.edit} onClick={targetEditHandler}>
        <EditIcon className={classes.edit} />
      </div>
      <div className={classes.supplierName}>{props.name}</div>
      <div className={classes.supplierField}>{props.field}</div>
      <div className={classes.supplierAdress}>
        <div>
          <span className={classes.detailInfo}>Country:</span>
          {props.adress.country}
        </div>
        <div>
          <span className={classes.detailInfo}>City:</span>
          {props.adress.city}
        </div>
        <div>
          <span className={classes.detailInfo}>Street:</span>
          {props.adress.street}
        </div>
        <div>
          <span className={classes.detailInfo}>Number:</span>
          {props.adress.number}
        </div>
      </div>
      <div className={classes.supplierContact}>
        <div>
          <span className={classes.detailInfo}>Name:</span>
          {props.contact.fullName}
        </div>
        <div>
          <span className={classes.detailInfo}>Mail:</span>
          {props.contact.email}
        </div>
        <div>
          <span className={classes.detailInfo}>Tel.:</span>
          {props.contact.tel}
        </div>
      </div>
      <div className={classes.delete} onClick={targetDeleteHandler}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default SupplierItem;
