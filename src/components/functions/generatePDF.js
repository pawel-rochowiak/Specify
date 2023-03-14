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
    header: "simple text",

    footer: {
      columns: ["Left part", { text: "Right part", alignment: "right" }],
    },

    content: [
      {
        text:
          "This paragraph uses header style and extends the alignment property",
        style: "header",
        alignment: "center",
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
        style: "tableExample",
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
      {
        text: [
          "This paragraph uses header style and overrides bold value setting it back to false.\n",
          "Header style in this example sets alignment to justify, so this paragraph should be rendered \n",
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.",
        ],
        style: "header",
        bold: false,
      },
    ],
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "right",
        margin: [0, 190, 0, 80],
      },
      column: {
        fontSize: 9,
        columnGap: 20,
        italics: false,
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
