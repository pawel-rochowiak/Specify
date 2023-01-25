import classes from "./ProjectPageDetails.module.css";
import NewMaterial from "../components/spec-forms/NewMaterial";
import PlusIcon from "../components/icons/PlusIcon";
import MinusIcon from "../components/icons/MinusIcon";
import WordIcon from "../components/icons/WordIcon";
import SaveIcon from "../components/icons/SaveIcon";
import ArrowDown from "../components/icons/DownArrow";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../store/tasks-slice.js";
import generateDOC from "../components/functions/generateDOC";
import { useOutletContext, useParams } from "react-router-dom";

const TaskPageDetails = (props) => {
  const dispatch = useDispatch();

  const params = useParams();
  const path = params.taskId;

  let stateTasks = useSelector((state) => state.tasks);

  const element = stateTasks.find((el) => el.path === path);

  const taskIndex = element.path.split("")[1];
  const projectNumber = element.number;
  const projectName = element.project;
  const deck = element.dk;
  const fireZone = element.fireZone;
  const areaName = element.area.toUpperCase();
  const specType = element.name.split("-")[0];

  const [_, addNewTaskHandler, closeNewTaskForm] = useOutletContext();

  //add new modal only for this detail page

  // setIsFormVisible(true);
  // const addNewTaskHandler = () => {
  //    setIsFormVisible(true);
  //  };
  //  const closeNewTaskForm = () => {
  //    setIsFormVisible(false);
  //  };
  // if (stateTarget === "tasks") {
  //    TargetForm = (
  //      <NewTaskForm
  //        onClick={addNewTaskHandler}
  //        onExit={closeNewTaskForm}
  //        editing={isEditing === true ? isEditing : false}
  //        itemToEdit={isEditing === true ? editIndex : ""}
  //      />
  //    );
  //  }
  // {isFormVisible ? TargetForm : ""}

  console.log(props);

  const propsArrLength1 = [
    ["project", projectName],
    ["venue", areaName],
    ["dk", deck],
    ["fz", fireZone],
  ];

  const date = new Date();
  const [day, month, year] = [
    date.getDay(),
    date.getMonth(),
    date.getFullYear(),
  ];

  const [index, setIndex] = useState(0);
  const [specMatArr, setSpecMatArr] = useState([]);
  const [formChecked, setFormChecked] = useState(false);

  const getDataHanlder = (data) => {
    setSpecMatArr((prevState) => {
      return [...prevState, data];
    });
  };

  const replaceDataHandler = (data, arrIndex) => {
    setSpecMatArr((prevState) => {
      prevState[arrIndex] = data;
      return [...prevState];
    });
  };

  ///after adding material to choice form should block other materials for being editied

  const getMatCheckedHandler = (checked, arrIndex) => {
    const btnArr = document.querySelectorAll(".btnMatForm");

    if (checked === true) {
      Array.from(btnArr).map((el) => (el.disabled = false));
    } else if (checked !== true) {
      Array.from(btnArr).map((el, index) => {
        el.disabled = true;
        if (index === arrIndex) el.disabled = false;
      });
    }
  };

  const getCheckedHandler = (checked) => {
    setFormChecked(!checked);
  };

  const saveToWord = () => {
    generateDOC(
      projectName,
      areaName,
      projectNumber,
      fireZone,
      deck,
      specType,
      year,
      month,
      day
    );
  };

  const [materialsArr, setMaterialArr] = useState([]);

  //Dane z newMaterial potem do nowego ARR -> do bazy przy tasku & do local storage-> przy ladowaniu pobranie z local czy bazy? local szybciej

  const addNewMaterialHandler = () => {
    const btnArr = document.querySelectorAll(".btnMatForm");
    const matForms = document.querySelectorAll(".matForm");

    matForms.forEach((el) => {
      if (el.dataset.checked === "true") {
        btnArr.forEach((el) => (el.disabled = true));
      } else {
        btnArr.forEach((el) => (el.disabled = false));
      }
    });

    setMaterialArr((prevState) => {
      setFormChecked(true);
      return [
        ...prevState,
        <NewMaterial
          key={index}
          data={index}
          getData={getDataHanlder}
          replaceData={replaceDataHandler}
          getChecked={getCheckedHandler}
          getMatChecked={getMatCheckedHandler}
          checkProps={true}
          modalOpen={addNewTaskHandler}
          modalClose={closeNewTaskForm}
        />,
      ];
    });
    localStorage.setItem(
      `${projectName}-${areaName}`,
      JSON.stringify(specMatArr)
    );
    setIndex(index + 1);
  };

  const deleteMaterialHandler = () => {
    if (materialsArr.length === 1) setFormChecked(false);
    if (materialsArr.length === 0) return;

    setMaterialArr(materialsArr.slice(0, -1));
    setSpecMatArr(specMatArr.slice(0, -1));

    localStorage.setItem(
      `${projectName}-${areaName}`,
      JSON.stringify(specMatArr)
    );

    // to be deleted

    //const data = JSON.parse(localStorage.getItem(`${projectName}-${areaName}`));
    // console.log(data);
  };

  const sendSpecificationDataHandler = () => {
    const materials = JSON.parse(
      localStorage.getItem(`${projectName}-${areaName}`)
    );
    dispatch(
      tasksActions.addMaterials({
        index: taskIndex,
        materials,
      })
    );
  };

  const btnClass = !formChecked
    ? `${classes.item} ${classes.action} ${classes.enabled}`
    : `${classes.item} ${classes.action} ${classes.disabled}`;

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
            <div className={classes.table}>
              <div>
                <p className={classes.heading}>Project Name: {projectName}</p>
                <div className={classes.info_row}>
                  <div>
                    <span>Yard. Proj:</span>
                    <input type="number" />
                  </div>
                  <div>
                    <span>TD Proj:</span>
                    <input type="number" />
                  </div>
                  <div>
                    <span>Issue date:</span>
                    <input type="date" />
                  </div>
                  <div>
                    <span>By:</span>
                    <input type="text" />
                  </div>
                  <div>
                    <span>Date:</span>
                    <input type="date" />
                  </div>
                  <div>
                    <span>By:</span>
                    <input type="text" />
                  </div>
                  <div>
                    <span>Rev:</span>
                    <input type="text" />
                  </div>
                </div>
                <p className={classes.heading}>Material specification</p>
                <div className={classes.header_labels}>
                  <div>Venue:{areaName}</div>
                  <div>Deck:{deck}</div>
                  <div>Fz:{fireZone}</div>
                </div>
              </div>
            </div>
            <div>
              <div id="formContainer">
                {materialsArr.length === 0 ? (
                  <div className={classes.info_message}>
                    This specification has no materials. Please press{" "}
                    <span className={classes.highlight}> "Add material" </span>
                    button to create new material.
                  </div>
                ) : (
                  <div className={classes.materialLabel_container}>
                    <div></div>
                    <div className={classes.label_row__material}>
                      <div>code</div>
                      <div>item</div>
                      <div>desctiption</div>
                      <div>supplier</div>
                      <div>date</div>
                      <div>picture</div>
                    </div>
                  </div>
                )}

                {materialsArr.map((el) => {
                  return el;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <div className={classes.btnMaterials}>
          <button
            type="button"
            className={btnClass}
            onClick={addNewMaterialHandler}
            disabled={formChecked}
          >
            Add material
            <PlusIcon size="1.6rem" />
          </button>
          <button
            className={`${classes.item} ${classes.action}`}
            onClick={deleteMaterialHandler}
          >
            Delete material
            <MinusIcon size="1.6rem" />
          </button>
        </div>
        <div className={classes.btnMaterials}>
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={sendSpecificationDataHandler}
          >
            <SaveIcon />
          </div>
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={saveToWord}
          >
            <ArrowDown size="1.6rem"></ArrowDown>
            <WordIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskPageDetails;
