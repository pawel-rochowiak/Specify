import classes from "./ProjectPageDetails.module.css";
import classesLibrary from "./LibraryPage.module.css";
import LibraryItem from "../components/LibraryItem";
import PlusIcon from "../components/icons/PlusIcon";
import Note from "../components/Note";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const LibraryPageDetails = (props) => {
  function findCategory(el) {
    return el.path === props.path;
  }

  const stateMaterials = useSelector((state) => state.library);

  const materialArrayByCategory = stateMaterials.find(findCategory).materials;

  console.log(materialArrayByCategory);

  return (
    <Fragment>
      <div className={classes.mainContent}>
        <div className={classes.tasks}>
          <div className={classes.name}>{props.name}</div>
          {materialArrayByCategory ? (
            <div className={classesLibrary.categoriesTask}>
              <div>No.</div>
              <div>Name</div>
              <div>Collection</div>
              <div>Supplier</div>
              <div>Certificates</div>
              <div>Description</div>
              <div>Image</div>
            </div>
          ) : (
            ""
          )}
          <div className={classes.taskList}>
            {materialArrayByCategory?.map((el, index) => (
              <LibraryItem
                key={index}
                number={index + 1}
                name={el.name}
                collection={el.collection}
                supplier={el.supplier}
                certificate={el.certificates}
                category={el.category}
                info={el.info}
                imageUrl={el.imageUrl}
                link={el.link}
                dataset={index}
                edit={props.createItem}
              />
            ))}
            {!materialArrayByCategory ? (
              <div className={classes.info_message}>
                This category has no materials. Please press
                <span className={classes.highlight}> "Create item" </span>{" "}
                button to create new material.
              </div>
            ) : (
              ""
            )}
            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
        <div className={classes.tasks}>
          <div className={classes.name}>Notes</div>
          <div className={classes.categoriesNotes}>
            <div>Date</div>
            <div>Note</div>
          </div>
          <div className={classes.taskList}>
            <Note date="29/10/2022" note="trololololo" />
            <Note
              date="07/09/2022"
              note="Signage specification needed. Please contact our subcontractor and request NCS code chart."
            />
            <div
              className={`${classes.item} ${classes.action}`}
              onClick={props.createItem}
            >
              Create note
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LibraryPageDetails;
