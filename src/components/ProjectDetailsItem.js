import classes from "./ProjectDetailsItem.module.css";
import EditIcon from "../components/icons/EditIcon";
import CloseIcon from "../components/icons/CloseIcon";

const ProjectDetailsItem = (props) => {
  return (
    <div className={classes.item}>
      <div className={classes.edit}>
        <EditIcon />
      </div>
      <div className={classes.itemNumber}>{props.number}</div>
      <div className={classes.itemName}>{props.name}</div>
      <div className={classes.itemDeck}>{props.deck}</div>
      <div className={classes.itemFz}>{props.fz}</div>
      <div className={classes.itemTeam}>{props.team}</div>
      <div className={classes.itemStatus}>{props.status}</div>
      <div className={classes.delete}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default ProjectDetailsItem;

//komponenet dla wszystkich musi miec dataset atrybut zeby pomoc w edycji i kasowaniu
//musi miec propsy z arrayem potrzebnych kategorii i klase specjalna zeby zmienialy sie wartosci w csssie
