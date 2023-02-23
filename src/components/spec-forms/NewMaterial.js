import classes from "./NewMaterial.module.css";
import CheckIcon from "../icons/SingleCheckIcon";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import swal from "sweetalert";
import { Fragment, useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import {
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useParams } from "react-router-dom";

//setMaterialInputType(false); this needs to be changed by the add material btn from TaskDetail page

const NewMaterial = (props) => {
  const params = useParams();

  const [enteredCode, setEnteredCode] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredSupplier, setEnteredSupplier] = useState("");
  const [enteredTaskDate, setEnteredTaskDate] = useState("");
  const [enteredTaskPicture, setEnteredTaskPicture] = useState("");
  const [checked, setChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [formInputType, setFormInputType] = useState("default");
  //State for the image
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  //Other
  const [isProps, setIsProp] = useState(false);
  const materialState = useSelector((state) => state.library);
  const pickedMaterial = useRef();

  useEffect(() => {
    if (props.dataObj) {
      setFormInputType("entered");
      setChecked(true);
      setEnteredCode(props.dataObj.number);
      setEnteredItem(props.dataObj.item);
      setEnteredDescription(props.dataObj.description);
      setEnteredSupplier(props.dataObj.supplier);
      setEnteredTaskDate(props.dataObj.date);
      setIsProp(true);
      downloadAllImgs();
    }
  }, [props.dataObj]);

  const codeInputChangeHandler = (event) => {
    setEnteredCode(event.target.value);
  };

  const itemInputChangeHandler = (event) => {
    setEnteredItem(event.target.value);
  };

  const descriptionInputChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const supplierInputChangeHandler = (event) => {
    setEnteredSupplier(event.target.value);
  };

  const dateInputChangeHandler = (event) => {
    setEnteredTaskDate(event.target.value);
  };

  const pictureInputChangeHandler = (event) => {
    setEnteredTaskPicture(event.target.value);
    setImageUpload(event.target.files[0]);
  };

  const materialTypeConfirmHandler = (event) => {
    event.preventDefault();
    setFormInputType("picked");
  };

  const materialTypeDenyHandler = (event) => {
    event.preventDefault();
    setFormInputType("entered");
    setChecked(false);
  };

  const imageFileName =
    enteredCode && imageUpload
      ? `images/${props.project}/${props.area}/${enteredCode}/${enteredCode}-${imageUpload.name}`
      : "";

  const imageListRef = ref(
    storage,
    `images/${props.project}/${props.area}/${enteredCode}`
  );

  //Fn for uploading image to Firebase
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imgRef = ref(storage, imageFileName);
    uploadBytes(imgRef, imageUpload).then(() => {
      deleteImage(imageFileName);
      downloadImg();
      setImageUpload(null);
    });
  };

  //Fn for downloading image from Firebase
  const downloadImg = () => {
    listAll(imageListRef).then((response) => {
      response.items
        .filter((el) => el._location.path === imageFileName)
        .forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList([url]);
          });
        });
    });
  };

  const downloadAllImgs = useCallback(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList([url]);
        });
      });
    });
  });

  useEffect(() => {
    downloadAllImgs();
  }, [params, downloadAllImgs]);

  //Fn for deleting image from Firebase
  const deleteImage = (image) => {
    if (imageUpload === null) return;

    listAll(imageListRef).then((response) => {
      response.items
        .filter((el) => el._location.path !== image)
        .forEach((item) => {
          const imgRef = ref(storage, item._location.path);
          deleteObject(imgRef)
            .then(() => {
              setImageUpload(null);
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    });
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const data = {
      number: enteredCode,
      item: enteredItem,
      description: enteredDescription,
      supplier: enteredSupplier,
      date: enteredTaskDate,
      picture: enteredTaskPicture,
    };

    const arrIndex = +event.target.dataset.order;
    const checkedMat = event.target.dataset.checked === "true" ? false : true;
    props.getMatChecked(checkedMat, arrIndex, props.checkProps);

    if (
      currentIndex !== arrIndex &&
      enteredCode !== "" &&
      enteredItem !== "" &&
      enteredDescription !== "" &&
      enteredSupplier !== "" &&
      isProps === false
    ) {
      props.getData(data);
    } else {
      setCurrentIndex(arrIndex);
    }

    if (currentIndex === arrIndex || isProps === true) {
      console.log(isProps);
      props.replaceData(data, arrIndex);
    }

    if (
      enteredCode !== "" &&
      enteredItem !== "" &&
      enteredDescription !== "" &&
      enteredSupplier !== ""
    ) {
      setChecked(!checked);
      props.getChecked(!checked);
    } else {
      swal({
        title: "Empty inputs!",
        text: "Please enter all inputs for material. Date can be ommited.",
        icon: "error",
      });
    }
    if (checked === false) uploadImage();
  };

  const testHandler = () => {
    const [categoryIndex, materialIndex] = pickedMaterial.current.value.split(
      ","
    );
    const selectedMat = materialState[+categoryIndex].materials[+materialIndex];
    // setSelectedMaterial(true);
    setEnteredDescription(selectedMat.info);
    setFormInputType("entered");
  };

  //Condicionally picking the classes by the form "version/state" (default,picked,entered)

  let formInputClasses2;

  const formClasses = !checked
    ? `${classes.info_materials}`
    : `${classes.info_materials} ${classes.checked}`;

  if (formInputType === "default")
    formInputClasses2 = `${classes.info_materials__type}`;

  if (formInputType === "entered" || formInputType === "picked")
    formInputClasses2 = `${classes.info_materials}`;

  if (formInputType === "picked")
    formInputClasses2 = `${classes.info_materials__type}`;

  const inputFormMarkup = (
    <Fragment>
      <button
        className={`${classes.button} btnMatForm`}
        onClick={props.checkMaterial}
      >
        {!checked ? <CheckIcon size="2.5rem" /> : <EditIcon size="2.5rem" />}
      </button>
      <div className={classes.info_materials__detail}>
        <div className={classes.code}>
          <input
            type="number"
            disabled={!checked ? false : true}
            onChange={codeInputChangeHandler}
            value={enteredCode}
          />
        </div>
        <div className={classes.item}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={itemInputChangeHandler}
            value={enteredItem}
          />
        </div>
        <div className={classes.description}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={descriptionInputChangeHandler}
            value={enteredDescription}
          />
        </div>
        <div className={classes.supplier}>
          <input
            type="text"
            disabled={!checked ? false : true}
            onChange={supplierInputChangeHandler}
            value={enteredSupplier}
          />
        </div>
        <div className={classes.date}>
          <input
            type="date"
            disabled={!checked ? false : true}
            onChange={dateInputChangeHandler}
            value={enteredTaskDate}
          />
        </div>
        <div className={classes.picture}>
          {imageList.length > 0 && checked === true ? (
            imageList.map((url, index) => {
              return (
                <img key={index} className={classes.task_image} src={url} />
              );
            })
          ) : (
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              disabled={!checked ? false : true}
              onChange={pictureInputChangeHandler}
              // value={enteredTaskPicture ? enteredTaskPicture : ""}
            />
          )}
        </div>
      </div>
    </Fragment>
  );

  const inputTypeCheckMarkup = (
    <div className={classes.materialInput_choose}>
      <span>Do you want to add material from the library?</span>
      <div className={classes.materialInput_choose__btns}>
        <button className={classes.button} onClick={materialTypeConfirmHandler}>
          <span>Yes</span>
        </button>
        <button className={classes.button} onClick={materialTypeDenyHandler}>
          <span>No</span>
        </button>
      </div>

      <button
        className={`${classes.button} ${classes.delete_btn}`}
        onClick={props.removeMatForm}
      >
        <CloseIcon className={`${classes.delete_btn} ${classes.delete_btn}`} />
      </button>
    </div>
  );

  const materialDropdownJSX = (
    <div className={classes.materialInput_dropdown}>
      <select ref={pickedMaterial} onChange={testHandler}>
        <option disabled selected value>
          {" "}
          Select material
        </option>
        {materialState.map((el, indexCat) => {
          return (
            <optgroup label={el.name} key={el.name}>
              {el.materials?.map((el, indexMat) => {
                return (
                  <option value={`${indexCat}, ${indexMat}`} key={el.name}>
                    {`${el.name}-${el.supplier}`}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );

  const formJSX = (type) => {
    if (type === "default") {
      return inputTypeCheckMarkup;
    }
    if (type === "entered") {
      return inputFormMarkup;
    }
    if (type === "picked") {
      return materialDropdownJSX;
    }
  };

  return (
    <form
      className={`${
        formInputType === "entered" ||
        formInputType === "picked" ||
        formInputType === "default"
          ? formInputClasses2
          : formClasses
      } matForm`}
      onSubmit={formSubmissionHandler}
      data-order={props.data}
      data-checked={checked}
    >
      {formJSX(formInputType)}
    </form>
  );
};

export default NewMaterial;
