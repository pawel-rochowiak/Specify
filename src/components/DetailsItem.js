import classes from "./DetailsItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";
import CheckIcon from "../components/icons/CheckIcon";
import { projectActions } from "../store/projects-slice";
import { useSelector, useDispatch } from "react-redux";

const DetailsItem = (props) => {
  let gridClass, itemsArr, elArray;

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  if (props.type === "projectsState") {
    itemsArr = Object.entries(props.items).slice(0, 5);
  }
  if (props.type === "libraryState") {
    itemsArr = Object.entries(props).slice(0, 8);
  }
  if (props.type === "tasksState") {
  }
  if (props.type === "suppliersState") {
  }

  elArray = itemsArr.map((el, index) => {
    return (
      <div key={index + 1} className={classes.itemLabel}>
        {el[1]}
      </div>
    );
  });

  if (props.grid === "4") {
    gridClass = `DetailsItem_col_${props.grid}__qscj9`;
  }

  if (props.grid === "4bis") {
    gridClass = `DetailsItem_col_${props.grid}_bis__J14wb`;
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
  if (props.grid === "8") {
    gridClass = `DetailsItem_col_${props.grid}__JQtaJ`;
  }

  const targetEditHandler = (ev) => {
    ev.preventDefault();

    const targetStart = ev.target.closest("div[class*='DetailsItem_item']")
      .dataset.order;

    props.edit(true, targetStart);
  };

  const targetDeleteHandler = (ev) => {
    ev.preventDefault();
    ///rember to chenge the path & key when deleting!!!

    const targetStart = ev.target.closest("div[class*='DetailsItem_item']")
      .dataset.order;

    if (props.section) {
      const item = window.location.href.split("/").at(-1);

      const currentMainSectionItem = state[props.section].findIndex(
        (el) => el.path === item
      );

      dispatch(
        projectActions.deleteProjectArea({
          sectionMainItemIndex: +currentMainSectionItem,
          index: +targetStart,
        })
      );
    }

    if (!props.section) {
      dispatch(projectActions.deleteProject({ index: targetStart }));
    }
  };

  return (
    <div className={`${classes.item} ${gridClass}`} data-order={props.dataset}>
      <div className={classes.edit} onClick={targetEditHandler}>
        <EditIcon className={classes.edit} />
      </div>

      {elArray}

      <div className={classes.delete} onClick={targetDeleteHandler}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default DetailsItem;
