import classes from "./DetailsItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import CheckIcon from "../components/icons/CheckIcon";
import SLICE from "../store/DUMMY_STATE_SLICE";
import { useState } from "react";

const DetailsItem = (props) => {
  let gridClass, editClass;

  const [isEditing, setIsEditing] = useState(false);
  const [toDelete, setToDeleted] = useState(false);

  const itemsArr = Object.entries(props.items).slice(0, 5);

  const elArray = itemsArr.map((el, index) => {
    return (
      <div key={index + 1} className={classes.itemLabel}>
        {el[1]}
      </div>
    );
  });

  if (props.grid === "4") {
    gridClass = `DetailsItem_col_${props.grid}__qscj9`;
  }
  if (props.grid === "5") {
    gridClass = `DetailsItem_col_${props.grid}__B1dQP`;
  }
  if (props.grid === "6") {
    gridClass = `DetailsItem_col_${props.grid}__LxKOJ`;
  }
  if (props.grid === "7") {
    gridClass = `DetailsItem_col_${props.grid}__nuq8J`;
  }

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const item = window.location.href.split("/").at(-1);

    const section = window.location.href.split("/").at(-2);

    const targetStart = ev.target.closest("div[class*='DetailsItem_item']")
      .dataset.order;

    const selectedItem = SLICE[section].find((el) => el.path === item);

    console.log(selectedItem.area[targetStart]);
  };

  return (
    <div className={`${classes.item} ${gridClass}`} data-order={props.dataset}>
      <div className={classes.edit} onClick={props.edit}>
        <EditIcon className={classes.edit} />
      </div>

      {elArray}

      <div className={classes.delete} onClick={targetEditHandler}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default DetailsItem;
