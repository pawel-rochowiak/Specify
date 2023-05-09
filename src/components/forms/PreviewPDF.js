import React, { useState, useRef } from "react";
import Modal from "../../UI/Modal";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import pdfMake from "pdfmake/build/pdfmake";
import classes from "./PreviewPDF.module.css";

const PreviewPDF = (props) => {
  const [pdfUrlArr, setPdfUrlArr] = useState([]);
  const pdfPreviewHandler = async () => {
    const storageRef = ref(storage, `specifications/${props.project}`);
    try {
      setPdfUrlArr([]);
      const listResult = await listAll(storageRef);
      listResult.items.map(async (item) => {
        const pdfFile = await getDownloadURL(item);
        setPdfUrlArr((prev) => [...prev, pdfFile]);
      });
    } catch (error) {
      console.error("Error downloading PDFs:", error);
    }
  };
  console.log(pdfUrlArr);
  return (
    <Modal onClose={props.onClick} onExit={props.onExit}>
      <button onClick={pdfPreviewHandler}>PreviewPDF</button>
      <iframe
        src={pdfUrlArr[0]}
        frameBorder="0"
        width="100%"
        height="700"
      ></iframe>
    </Modal>
  );
};

export default PreviewPDF;
