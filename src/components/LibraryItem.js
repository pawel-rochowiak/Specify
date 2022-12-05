import classes from "./LibraryItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useSelector, useDispatch } from "react-redux";
import { libraryActions } from "../store/library-slice";

const LibraryItem = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(props);
  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    props.edit(true, targetStart);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();
    ///rember to chenge the path & key when deleting!!!

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    dispatch(libraryActions.deleteMaterial({ index: targetStart }));
  };
  return (
    <div className={classes.item} data-order={props.dataset}>
      <div className={classes.edit} onClick={targetEditHandler}>
        <EditIcon className={classes.edit} />
      </div>
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
      <div className={classes.delete} onClick={targetDeleteHandler}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default LibraryItem;
