import classes from "./LibraryPage.module.css";
import { Fragment } from "react";
import LibraryItem from "../components/LibraryItem";
import PlusIcon from "../components/icons/PlusIcon";
import SLICE from "../store/DUMMY_STATE_SLICE";

const LibraryPage = (props) => {
  const materialArr = [
    {
      name: "Draught White Lucido",
      collection: "Col1234",
      supplier: "Alimonti Milano",
      certificates: "IMHO",
      info: "Anti-slip polished surface treatment.",
      imageUrl: "../Assets/test_stone.png",
      link: "www.alimontimilano.eu",
    },
    {
      name: "Colosseum travertine stone",
      collection: "Col1234",
      supplier: "Marmi Vrech",
      certificates: "IMHO",
      info: "Anti-slip polished surface treatment.",
      imageUrl: "../Assets/test_stone.png",
      link: "www.marmivrech.it",
    },
    {
      name: "Fragmenta Full Body Collection, Bianco Greco",
      collection: "Col1234",
      supplier: "Ariostea",
      certificates: "IMHO",
      info: "Soft finish, Slip resistance: R10",
      imageUrl: "../Assets/test_stone.png",
      link: "www.ariostea-hightech.com",
    },
  ];

  const materialArray = SLICE.library.flatMap((el) => el.materials);
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
