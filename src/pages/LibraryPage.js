import classes from "./LibraryPage.module.css";
import { Fragment } from "react";
import LibraryItem from "../components/LibraryItem";
import DetailsItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const LibraryPage = (props) => {
  const stateMaterials = useSelector((state) => state.library);
  const createItem = useOutletContext();

  const materialArray = stateMaterials.flatMap((el) =>
    el.materials ? el.materials : []
  );

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Material Library</div>
        <p className={classes.info}>
          <span>Please note:</span> Materials can be edited or deleted from
          within a specific category.
        </p>
        <div className={classes.categoriesTask}>
          <div>No.</div>
          <div>Name</div>
          <div>Collection</div>
          <div>Supplier</div>
          <div>Certificates</div>
          <div>Description</div>
          <div>Image</div>
        </div>
        <div className={classes.taskList}>
          {materialArray.map((el, index) => (
            <LibraryItem
              key={index + 1}
              number={index + 1}
              name={el.name}
              collection={el.collection}
              supplier={el.supplier}
              certificate={el.certificates}
              info={el.info}
              imageUrl={el.imageUrl}
              link={el.link}
              dataset={index}
              edit={createItem}
              disabled={true}
            />
          ))}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
          >
            Create Item
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LibraryPage;
