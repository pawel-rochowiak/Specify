import classes from "./LibraryPage.module.css";
import { Fragment, useState } from "react";
import LibraryItem from "../components/LibraryItem";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const LibraryPage = (props) => {
  const stateMaterials = useSelector((state) => state.library);
  const [createItem] = useOutletContext();
  const [search, setSearch] = useState("");

  const materialArray = stateMaterials.flatMap((el) =>
    el.materials ? el.materials : []
  );

  const libraryItemsComponentsArr = materialArray.map((el, index) => (
    <LibraryItem
      key={index + 1}
      number={index + 1}
      name={el.name}
      collection={el.collection}
      category={el.category}
      supplier={el.supplier}
      certificate={el.certificates}
      info={el.info}
      imageUrl={el.url}
      link={el.link}
      dataset={index}
      edit={createItem}
      disabled={true}
    />
  ));

  return (
    <Fragment>
      <div className={classes.tasks}>
        <div className={classes.name}>Material Library</div>
        {materialArray.length > 0 ? (
          <Fragment>
            <p className={classes.info}>
              <span>Please note:</span> Materials can be edited or deleted from
              within a specific category.
            </p>

            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
            <div className={classes.categoriesTask}>
              <div>No.</div>
              <div>Name</div>
              <div>Collection</div>
              <div>Supplier</div>
              <div>Certificates</div>
              <div>Description</div>
              <div>Image</div>
            </div>
          </Fragment>
        ) : (
          ""
        )}
        <div className={classes.taskList}>
          {materialArray.length > 0 ? (
            libraryItemsComponentsArr.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.props.name.toLowerCase().includes(search);
            })
          ) : (
            <div className={classes.info_message}>
              No material has been added. Please press
              <span className={classes.highlight}>"Add material"</span> button
              to add new material.
            </div>
          )}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
          >
            Add material
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LibraryPage;
