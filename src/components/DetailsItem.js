import classes from "./DetailsItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";

const DetailsItem = (props) => {
  let gridClass;

  console.log(props);

  const itemsArr = Object.entries(props.items).slice(0, 5);

  const elArray = itemsArr.map((el, index) => {
    return (
      <div key={index + 1} className={classes.itemLabel}>
        {el[1]}
      </div>
    );
  });

  console.log(elArray);

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

  return (
    <div className={`${classes.item} ${gridClass}`}>
      <div className={classes.edit}>
        <EditIcon />
      </div>
      {elArray}
      <div className={classes.delete}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default DetailsItem;
