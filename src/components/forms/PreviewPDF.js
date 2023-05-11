import React, { useState, useRef, useEffect } from "react";
import Modal from "../../UI/Modal";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import pdfMake from "pdfmake/build/pdfmake";
import classes from "./PreviewPDF.module.css";

const PreviewPDF = (props) => {
  const [pdfUrlArr, setPdfUrlArr] = useState([]);
  const [specNames, setSpecNames] = useState([]);

  useEffect(() => {
    pdfPreviewHandler();
  }, []);

  const pdfPreviewHandler = async () => {
    const storageRef = ref(storage, `specifications/${props.project}`);
    try {
      setSpecNames([]);
      setPdfUrlArr([]);
      const listResult = await listAll(storageRef);
      listResult.items.map(async (item, index) => {
        const pdfFile = await getDownloadURL(item);
        setSpecNames(["Material Specification", "Light Specification"]);
        // setSpecNames((prev) => [
        //   ...prev,
        //   item._location.path_
        //     .toString()
        //     .split("/")
        //     .at(-1)
        //     .split("-")[1]
        //     .split(".")[0],
        // ]);
        setPdfUrlArr((prev) => [...prev, pdfFile]);
      });
    } catch (error) {
      console.error("Error downloading PDFs:", error);
    }
  };

  console.log(specNames);

  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      {/* {specNames.map((e) => {
        const targetElement = document.querySelector("#buttonContainer");
        const button = document.createElement("button");
        button.innerHTML = `${e}`;
        targetElement.appendChild(button);
      })} */}

      <div id="buttonContainer">
        <button onClick={pdfPreviewHandler}>Material Specifiaction</button>
        <button onClick={pdfPreviewHandler}>Light Specifiaction</button>
      </div>

      <iframe
        src={pdfUrlArr[0]}
        frameBorder="0"
        width="100%"
        height="600"
      ></iframe>
    </Modal>
  );
};

export default PreviewPDF;
