import classes from "./LibraryItem.module.css";

const LibraryItem = (props) => {
  return (
    <div className={classes.item}>
      <div className={classes.materialNumber}>{props.number}</div>
      <div className={classes.materialName}>{props.name}</div>
      <div className={classes.materialSupplier}>{props.supplier}</div>
      <div className={classes.materialCertificate}>{props.certificate}</div>
      <div className={classes.materialInfo}>{props.info}</div>
      <img className={classes.materialImage} src={props.imageUrl} />
      <a className={classes.materialLink} href={props.link} target="_blank">
        Link
      </a>
    </div>
  );
};

export default LibraryItem;
