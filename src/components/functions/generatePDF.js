import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = async (
  projectName,
  areaName,
  yardNumber,
  projectNumber,
  fireZone,
  deck,
  specType,
  year,
  month,
  day,
  resPerson,
  revDate,
  revPerson,
  revId
) => {
  const data = JSON.parse(localStorage.getItem(`${projectName}-${areaName}`));

  const items = { ...localStorage };
  const itemsArr = Object.entries(items)
    .filter(([key, value]) => key.includes("IMAGES-"))
    .map((el) => el[1]);

  const urlsBlobs = await Promise.all(
    itemsArr.map(async (url) => {
      const urlTrim = url.replace(/['"]+/g, "");
      const resp = await fetch(urlTrim);
      const respBlob = await resp.blob();
      return respBlob;
    })
  );

  const docDef = {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 0, 40, 0],

    info: {
      title: `${areaName.toUpperCase()}-${specType}`,
    },
    footer: {
      style: "footerMargin",
      text:
        "GENERAL REGULATIONS AND REQUIREMENTS: Manufacturer to provide Interior Designer with finish samples for review prior to production. Manufacturer to provide Interior Designer with shop drawings for review prior to production. Items must be suitable for contract quality and commercial use in the location that it will be used in. Fixed material must meet all IMO standards and regulations in accordance with classification societies. Final quantity calculation is on Manufacturers/Owners responsibility. Manufacturers guarantee will be maintained as per contract with the Owner. TD has provided the Yard with a specification of the products and designs, which the Manufacturer is obligated to follow and execute. The Manufacturer assumes product liability for such product.",
      alignment: "justify",
      fontSize: 7,
    },

    content: [
      {
        text: `PROJECT:${projectName}`,
        style: "header",
        alignment: "left",
      },
      {
        alignment: "justify",
        style: "column",
        columns: [
          { width: "auto", text: `PROJECT:${projectName}` },
          { width: "auto", text: `Yard Proj.# ${yardNumber}` },
          { width: "auto", text: `TD Proj.#${projectNumber}` },
          { width: "auto", text: `Issue Date:${year}-${month}-${day} ` },
          { width: "auto", text: `By: ${resPerson}` },
          { width: "auto", text: `Rev.Date: ${revDate}` },
          { width: "auto", text: `By: ${revPerson}` },
          { width: "auto", text: `Rev: ${revId}` },
        ],
      },
      {
        style: "column",
        table: {
          widths: ["*"],
          body: [[{ border: [false, true, false, false], text: "" }]],
        },
      },
      {
        text: `${specType.toUpperCase()}`,
        style: "header",
        alignment: "left",
      },
      {
        text: `DK 0${deck} FZ 0${fireZone} ${areaName}`,
        style: "headerSM",
        alignment: "left",
      },
      {
        style: "column",
        table: {
          widths: ["16,6%", "16,6%", "16,6%", "16,6%", "16,6%", "16,6%"],
          body: [
            [
              { border: [false, false, false, false], text: "CODE" },
              { border: [false, false, false, false], text: "ITEM" },
              { border: [false, false, false, false], text: "DESCRIPTION" },
              { border: [false, false, false, false], text: "SUPPLIER" },
              { border: [false, false, false, false], text: "DATE" },
              { border: [false, false, false, false], text: "PICTURE" },
            ],
          ],
        },
      },
      {
        style: "tableExample",
        table: {
          widths: ["16,6%", "16,6%", "16,6%", "16,6%", "16,6%", "16,6%"],
          body: [
            [
              {
                border: [false, true, true, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                border: [true, true, true, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                border: [true, true, true, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                border: [true, true, true, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                border: [true, true, true, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
              {
                border: [true, true, false, true],
                text: "nothing interesting here",
                italics: true,
                color: "gray",
              },
            ],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        color: "#808080",
      },
      headerSM: {
        fontSize: 12,
      },
      column: {
        fontSize: 9,
        columnGap: 20,
        italics: false,
      },

      footerMargin: {
        margin: [40, 0, 40, 0],
        fontSize: 7,
      },
    },
  };

  (async function () {
    const pdfGen = pdfMake.createPdf(docDef);
    pdfGen.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  })();

  // (async function () {
  //   let blob = await fetch(
  //     "https://firebasestorage.googleapis.com/v0/b/specify-ec0ca.appspot.com/o/images%2FAzamara%2FRESTAURANT%2F1%2F1-1.png?alt=media&token=d58ed6be-ee15-4be4-af0e-a7872f104266"
  //   ).then((r) => r.blob());
  //   let dataUrl = await new Promise((resolve) => {
  //     let reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  //   console.log(dataUrl);
  // })();
};

export default generatePDF;
