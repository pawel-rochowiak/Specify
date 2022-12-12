import classes from "./LibraryItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useSelector, useDispatch } from "react-redux";
import { libraryActions } from "../store/library-slice";

const LibraryItem = (props) => {
  const dispatch = useDispatch();

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    props.edit(true, targetStart);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    dispatch(
      libraryActions.deleteMaterial({
        index: targetStart,
        supplier: props.supplier,
        collection: props.collection,
        category: props.category,
      })
    );
  };
  return (
    <div className={classes.item} data-order={props.dataset}>
      {!props.disabled ? (
        <div className={classes.edit} onClick={targetEditHandler}>
          <EditIcon className={classes.edit} />
        </div>
      ) : (
        ""
      )}
      <div className={classes.materialNumber}>{props.number}</div>
      <div className={classes.materialName}>{props.name}</div>
      <div className={classes.materialName}>{props.collection}</div>
      <div className={classes.materialSupplier}>{props.supplier}</div>
      <div className={classes.materialCertificate}>{props.certificate}</div>
      <div className={classes.materialInfo}>{props.info}</div>
      <img className={classes.materialImage} src={props.imageUrl} />
      <a className={classes.materialLink} href={props.link} target="_blank">
        Link
      </a>
      {!props.disabled ? (
        <div className={classes.delete} onClick={targetDeleteHandler}>
          <CloseIcon />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LibraryItem;
