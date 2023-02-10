import classes from "./LibraryItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useDispatch } from "react-redux";
import { libraryActions } from "../store/library-slice";
import { suppliersActions } from "../store/suppliers-slice";
import swal from "sweetalert";

const LibraryItem = (props) => {
  const materialName = props.name;
  const materialSupplier = props.supplier;

  console.log(`You are about to delete ${materialName} by ${materialSupplier}`);

  const dispatch = useDispatch();

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    props.edit(true, targetStart, props);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='LibraryItem_item']")
      .dataset.order;

    swal({
      title: `You are about to delete ${materialName} by ${materialSupplier}!`,
      text: "Once deleted, material informations will be lost!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`${materialName} was deleted!`, {
          icon: "success",
        });
        dispatch(
          libraryActions.deleteMaterial({
            index: !props.supEdit ? targetStart : "",
            supplier: props.supplier,
            name: props.name,
            collection: props.collection,
            category: props.category,
          })
        );
        dispatch(
          suppliersActions.deleteMaterial({
            index: props.supEdit ? targetStart : "",
            name: props.name,
            supplier: props.supplier,
            collection: props.collection,
          })
        );
      } else {
        swal("Your material informations are safe!");
      }
    });
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
      <img
        className={classes.materialImage}
        alt={`Material name: ${materialName}. Supplier name: ${materialSupplier}`}
        src={props.imageUrl}
      />
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
