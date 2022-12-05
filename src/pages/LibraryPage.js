import classes from "./LibraryPage.module.css";
import { Fragment } from "react";
import LibraryItem from "../components/LibraryItem";
import DetailsItem from "../components/DetailsItem";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";

const LibraryPage = (props) => {
  const stateMaterials = useSelector((state) => state.library);

  console.log(stateMaterials);

  const materialArray = stateMaterials.flatMap((el) =>
    el.materials ? el.materials : []
  );
  console.log(materialArray);
  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Material Library</div>
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
            />
          ))}
          {/* {materialArray?.map((el, index) => (
            <DetailsItem
              key={`project${index + 1}`}
              number={index + 1}
              name={el.name}
              collection={el.collection}
              supplier={el.supplier}
              certificate={el.certificates}
              info={el.info}
              url={el.imageUrl}
              link={el.link}
              dataset={index}
              grid="8"
              edit={props.createItem}
              type="libraryState"
            />
          ))} */}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={props.createItem}
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
