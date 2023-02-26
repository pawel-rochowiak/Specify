import { usersActions } from "../store/users-slice";
import classes from "./ProjectPageDetails.module.css";
import NewMaterial from "../components/spec-forms/NewMaterial";
import PlusIcon from "../components/icons/PlusIcon";
import MinusIcon from "../components/icons/MinusIcon";
import WordIcon from "../components/icons/WordIcon";
import SaveIcon from "../components/icons/SaveIcon";
import ArrowDown from "../components/icons/DownArrow";
import { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../store/tasks-slice.js";
import generateDOC from "../components/functions/generateDOC";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const TaskPageDetails = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const path = params.taskId;

  const userEmail = localStorage.getItem("login");

  let stateTasks = useSelector((state) => state.tasks);

  let userError = useSelector(
    (state) => state.users.find((el) => el.email === userEmail).error
  );

  console.log(userError);

  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [specMatArr, setSpecMatArr] = useState([]);
  const [formChecked, setFormChecked] = useState(false);
  const [materialsArr, setMaterialArr] = useState([]);

  //Picking right task using params to match the task path

  let element = stateTasks.find((el) => el.path === path);
  let dataBaseMaterials = element.materials;

  //Condition to set data source, is it from DataBase or LocalStorage

  useEffect(() => {
    if (dataBaseMaterials?.length >= 0) {
      setSpecMatArr(dataBaseMaterials);
      setMaterialArr(
        dataBaseMaterials.map((el, index) => (
          <NewMaterial
            key={index}
            data={index}
            getData={getDataHanlder}
            replaceData={replaceDataHandler}
            getChecked={getCheckedHandler}
            getMatChecked={getMatCheckedHandler}
            checkProps={true}
            project={projectName}
            area={areaName}
            dataObj={el}
          />
        ))
      );
    }
    setCounter(dataBaseMaterials?.length);
  }, [path]);

  //Using retreived element to get project data

  const taskIndex = element.path.split("")[1];
  const projectNumber = element.number;
  const projectName = element.project;
  const deck = element.dk;
  const fireZone = element.fireZone;
  const areaName = element.area.toUpperCase();
  const specType = element.name.split("-")[0];

  //Set reference for the required inputs

  const resPerson = useRef();
  const revDate = useRef();
  const revPerson = useRef();
  const revId = useRef();
  const yardNumber = useRef();

  const propsArrLength1 = [
    ["project", projectName],
    ["venue", areaName],
    ["dk", deck],
    ["fz", fireZone],
  ];

  //Getting current date to compare it to the deadline for each task, helps to render outdated tasks

  const date = new Date();
  const [day, month, year] = [
    date.getDay(),
    date.getMonth(),
    date.getFullYear(),
  ];

  //Pushing & removing data into material arrays. This array contains material objects with data

  const getDataHanlder = (data) => {
    setSpecMatArr((prevState) => {
      return [...prevState, data];
    });
  };

  const replaceDataHandler = (data, arrIndex) => {
    setSpecMatArr((prevState) => {
      const prevStateCopy = [...prevState];
      prevStateCopy[arrIndex] = data;
      return [...prevStateCopy];
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
      yardNumber.current.value,
      projectNumber,
      fireZone,
      deck,
      specType,
      year,
      month,
      day,
      resPerson.current.value,
      revDate.current.value,
      revPerson.current.value,
      revId.current.value
    );
  };

  const addCheckedMaterialToArrays = () => {
    localStorage.setItem(
      `${projectName}-${areaName}`,
      JSON.stringify(specMatArr)
    );
  };

  const materialCancelHandler = (event) => {
    event.preventDefault();
    setMaterialArr((prevState) => {
      setFormChecked(false);
      return [...prevState.slice(0, -1)];
    });
  };

  useEffect(() => {
    addCheckedMaterialToArrays();
  }, [specMatArr, addCheckedMaterialToArrays]);

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
      setCounter(counter + 1);
      return [
        ...prevState,
        <NewMaterial
          key={counter}
          data={counter}
          getData={getDataHanlder}
          replaceData={replaceDataHandler}
          removeMatForm={materialCancelHandler}
          getChecked={getCheckedHandler}
          getMatChecked={getMatCheckedHandler}
          checkProps={true}
          project={projectName}
          area={areaName}
        />,
      ];
    });

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
  };

  const sendingDataPromise = () => {
    const materials = JSON.parse(
      localStorage.getItem(`${projectName}-${areaName}`)
    );
    return new Promise((resolve, reject) => {
      if (materials.length > 0) {
        resolve(
          dispatch(
            tasksActions.addMaterials({
              index: taskIndex,
              materials,
            })
          )
        );
      } else if (materials.length === 0) {
        reject(new Error("No data to be send to the server!"));
      }
    });
  };

  const sendSpecificationDataHandler = () => {
    sendingDataPromise()
      .then((result) => {
        const currentProjectTasks = stateTasks.filter(
          (el) => el.project === projectName
        );
        if (
          currentProjectTasks[0].materials.length ===
          result.payload.materials.length
        ) {
          return true;
        } else {
          dispatch(
            usersActions.addUserError({ email: userEmail, error: "Error" })
          );
        }
      })
      .then(() => {
        if (!userError) {
          swal("Data was sent to the server!", {
            buttons: false,
            icon: "success",
            timer: 1500,
          });
        }
        if (userError) {
          throw new Error(
            "Problem with sending data! Please check your internet connection and try again."
          );
        }
      })
      .catch((err) => {
        swal(`${err}`, {
          buttons: false,
          icon: "warning",
          timer: 3000,
        });
      });
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
                    <input ref={yardNumber} type="number" />
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
                    <input type="text" ref={resPerson} />
                  </div>
                  <div>
                    <span>Date:</span>
                    <input type="date" ref={revDate} />
                  </div>
                  <div>
                    <span>By:</span>
                    <input type="text" ref={revPerson} />
                  </div>
                  <div>
                    <span>Rev:</span>
                    <input type="text" ref={revId} />
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
          <button
            className={btnClass}
            onClick={sendSpecificationDataHandler}
            disabled={formChecked}
          >
            <SaveIcon />
          </button>
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
