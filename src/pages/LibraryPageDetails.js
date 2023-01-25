import classes from "./ProjectPageDetails.module.css";
import classesLibrary from "./LibraryPage.module.css";
import LibraryItem from "../components/LibraryItem";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

const LibraryPageDetails = (props) => {
  const params = useParams();
  const path = params.projectId;

  function findCategory(el) {
    return el.path === props.path;
  }

  const [createItem] = useOutletContext();

  const stateMaterials = useSelector((state) => state.library);

  const element = stateMaterials.find((el) => el.path === path);
  console.log(element);

  const materialArrayByCategory = stateMaterials.find(findCategory).materials;

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
                edit={createItem}
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
              onClick={createItem}
            >
              Create Item
              <PlusIcon size="1.6rem" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LibraryPageDetails;
