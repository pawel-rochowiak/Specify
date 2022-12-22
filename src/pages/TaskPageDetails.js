import classes from "./ProjectPageDetails.module.css";
import NewMaterial from "../components/spec-forms/NewMaterial";
import PlusIcon from "../components/icons/PlusIcon";
import { Fragment, useState } from "react";
import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph } from "docx";

const TaskPageDetails = (props) => {
  const specificationType = props.name;
  const projectName = props.project;
  const deck = props.dk;
  const fireZone = props.fz;

  console.log(props);

  const propsArrLength1 = [
    ["name", specificationType],
    ["project", projectName],
    ["dk", deck],
    ["fz", fireZone],
  ];

  const [index, setIndex] = useState(1);

  const [materialsArr, setMaterialArr] = useState([<NewMaterial key="0" />]);

  const addNewMaterialHandler = () => {
    setMaterialArr((prevState) => {
      return [...prevState, <NewMaterial key={index} />];
    });
    setIndex(index + 1);
  };

  const deleteMaterialHandler = () => {
    if (materialsArr.length === 1) return;
    setMaterialArr(materialsArr.slice(0, -1));
  };

  const generateDOC = () => {
    console.log("doc will be generated");
  };

  return (
    <Fragment>
      <div className={classes.mainContent} id="exportContent">
        <div className={classes.tasks}>
          <div className={classes.tasks_labels}>
            {propsArrLength1.map((el, index) => {
              return (
                <div
                  key={index + 1}
                  className={classes.name}
                >{`${el[0]}: ${el[1]}`}</div>
              );
            })}
          </div>

          <div className={classes.taskList}>
            <table className={classes.table}>
              <thead>
                <th>Project Name: {props.project}</th>
                <tr className={classes.info_row}>
                  <td>
                    <span>Yard. Proj:</span>
                    <input type="number" />
                  </td>
                  <td>
                    <span>TD Proj:</span>
                    <input type="number" />
                  </td>
                  <td>
                    <span>Issue date:</span>
                    <input type="date" />
                  </td>
                  <td>
                    <span>By:</span>
                    <input type="text" />
                  </td>
                  <td>
                    <span>Date:</span>
                    <input type="date" />
                  </td>
                  <td>
                    <span>By:</span>
                    <input type="text" />
                  </td>
                  <td>
                    <span>Rev:</span>
                    <input type="text" />
                  </td>
                </tr>
                <th>Material specification</th>
                <tr className={classes.header_labels}>
                  <td>Venue:{props.name}</td>
                  <td>Deck:{deck}</td>
                  <td>Fz:{props.fz}</td>
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                <tr className={classes.label_row}>
                  <th>code</th>
                  <th>item</th>
                  <th>desctiption</th>
                  <th>supplier</th>
                  <th>date</th>
                  <th>picture</th>
                </tr>
                {materialsArr.map((el) => {
                  return el;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={`${classes.item} ${classes.action}`}
        onClick={addNewMaterialHandler}
      >
        Add material
        <PlusIcon size="1.6rem" />
      </div>
      <div
        className={`${classes.item} ${classes.action}`}
        onClick={deleteMaterialHandler}
      >
        Delete material
        <PlusIcon size="1.6rem" />
      </div>

      <button onClick={generateDOC}>Export to WORD</button>
    </Fragment>
  );
};

export default TaskPageDetails;
