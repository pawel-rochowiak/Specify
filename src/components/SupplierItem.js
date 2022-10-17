import classes from "./SupplierItem.module.css";

const SupplierItem = (props) => {
  return (
    <div className={classes.item}>
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
          {props.contact.name}
        </div>
        <div>
          <span className={classes.detailInfo}>Mail:</span>
          {props.contact.mail}
        </div>
        <div>
          <span className={classes.detailInfo}>Tel.:</span>
          {props.contact.tel}
        </div>
      </div>
    </div>
  );
};

export default SupplierItem;
