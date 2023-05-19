import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import pdfMake from "pdfmake/build/pdfmake";
//CSS module//

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
      const listResult = await listAll(storageRef);
      if (listResult.items.length !== 0) {
        const pdfUrls = await Promise.all(
          listResult.items.map(async (item) => {
            const pdfFile = await getDownloadURL(item);
            return pdfFile;
          })
        );
        const names = listResult.items.map(
          (item) =>
            item._location.path_
              .toString()
              .split("/")
              .at(-1)
              .split("-")[1]
              .split(".")[0]
        );
        setPdfUrlArr(pdfUrls);
        setSpecNames(names);
      }
    } catch (error) {
      console.error("Error downloading PDFs:", error);
    }
  };

  return (
    <Modal
      className={classes.modal}
      onClose={props.onClick}
      onExit={props.onExit}
    >
      {specNames.length !== 0 && (
        <div id="buttonContainer">
          {specNames.map((name, index) => (
            <button key={index}>{name}</button>
          ))}
        </div>
      )}

      {specNames.length === 0 && (
        <p className={classes.info_message}>
          No PDF was saved to the database yet. In order to create a PDF press
          <span> "PDF" </span> button at the bottom of the specification creator
          page.
        </p>
      )}

      {pdfUrlArr.length !== 0 && (
        <iframe
          src={pdfUrlArr[0]}
          frameBorder="0"
          width="100%"
          height="600"
        ></iframe>
      )}
    </Modal>
  );
};

export default PreviewPDF;
