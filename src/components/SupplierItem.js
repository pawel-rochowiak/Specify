import classes from "./SupplierItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { suppliersActions } from "../store/suppliers-slice";

const SupplierItem = (props) => {
  const supplerName = props.name;

  const dispatch = useDispatch();

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='SupplierItem_item']")
      .dataset.order;

    props.edit(true, targetStart);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='SupplierItem_item']")
      .dataset.order;

    swal({
      title: `You are about to delete supplier named ${supplerName}.`,
      text: "Once deleted, supplier informations will be lost!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`${supplerName} detailed page was deleted!`, {
          icon: "success",
        });
        dispatch(suppliersActions.deleteSupplier({ index: targetStart }));
      } else {
        swal("Your supplier details are safe!");
      }
    });
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
