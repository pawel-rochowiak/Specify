import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import pdfMake from "pdfmake/build/pdfmake";
import classes from "./PreviewPDF.module.css";

const PreviewPDF = (props) => {
  const [pdfUrlArr, setPdfUrlArr] = useState(null);
  const [specNames, setSpecNames] = useState(null);

  useEffect(() => {
    pdfPreviewHandler();
  }, []);

  const pdfPreviewHandler = async () => {
    const storageRef = ref(storage, `specifications/${props.project}`);
    try {
      const listResult = await listAll(storageRef);
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
    } catch (error) {
      console.error("Error downloading PDFs:", error);
    }
  };

  console.log(specNames);

  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      {specNames && (
        <div id="buttonContainer">
          {specNames.map((name, index) => (
            <button key={index}>{name}</button>
          ))}
        </div>
      )}

      {pdfUrlArr && (
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
