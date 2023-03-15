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

  const imageBase64 = await Promise.all(
    itemsArr.map(async (url) => {
      const urlTrim = url.replace(/['"]+/g, "");
      const resp = await fetch(urlTrim);
      const respBlob = await resp.blob();
      let dataUrl = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(respBlob);
      });
      return dataUrl;
    })
  );

  const materials = data.map((el, index) => {
    return [
      {
        border: [false, true, true, true],
        text: `${el.number}`,
        alignment: "center",
        color: "gray",
      },
      {
        border: [true, true, true, true],
        text: `${el.item}`,
        alignment: "center",
        color: "gray",
      },
      {
        border: [true, true, true, true],
        text: `${el.description}`,
        alignment: "center",
        color: "gray",
      },
      {
        border: [true, true, true, true],
        text: `${el.supplier}`,
        alignment: "center",
        color: "gray",
      },
      {
        border: [true, true, true, true],
        text: `${el.date}`,
        alignment: "center",
        color: "gray",
      },
      {
        border: [true, true, false, true],
        image: imageBase64[index],
        width: 90,
        height: 90,
        alignment: "center",
        color: "gray",
      },
    ];
  });

  const docDef = {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 40, 40, 100],

    info: {
      title: `${areaName.toUpperCase()}-${specType}`,
    },

    footer: function (currentPage, pageCount) {
      return {
        table: {
          widths: ["*"],
          body: [
            [
              {
                margin: [40, 10, 40, 0],
                color: "#808080",
                text:
                  "GENERAL REGULATIONS AND REQUIREMENTS: Manufacturer to provide Interior Designer with finish samples for review prior to production. Manufacturer to provide Interior Designer with shop drawings for review prior to production. Items must be suitable for contract quality and commercial use in the location that it will be used in. Fixed material must meet all IMO standards and regulations in accordance with classification societies. Final quantity calculation is on Manufacturers/Owners responsibility. Manufacturers guarantee will be maintained as per contract with the Owner. TD has provided the Yard with a specification of the products and designs, which the Manufacturer is obligated to follow and execute. The Manufacturer assumes product liability for such product.",
                alignment: "justify",
                style: "footer",
              },
            ],
            [
              {
                style: "columnSM",
                margin: [40, 0, 40, 0],
                table: {
                  widths: ["*"],
                  body: [[{ border: [false, true, false, false], text: "" }]],
                },
              },
            ],

            [
              {
                margin: [40, 0, 40, 0],
                color: "#000000",
                style: "footerColumn",
                columns: [
                  {
                    width: "auto",
                    text: "TILLBERG DESIGN",
                    alignment: "center",
                  },
                  { width: "auto", text: "•", alignment: "center" },
                  {
                    width: "auto",
                    text: "Småbåtshamnen 24",
                    alignment: "center",
                  },
                  { width: "auto", text: "•", alignment: "center" },
                  {
                    width: "auto",
                    text: "263 39 Höganäs",
                    alignment: "center",
                  },
                  { width: "auto", text: "•", alignment: "center" },
                  { width: "auto", text: "SWEDEN", alignment: "center" },
                  { width: "auto", text: "•", alignment: "center" },
                  {
                    width: "auto",
                    text: "+46 42 23 80 90",
                    alignment: "center",
                  },
                  { width: "auto", text: "•", alignment: "center" },
                  {
                    width: "auto",
                    text: "td@tillbergdesign.com",
                    alignment: "center",
                  },
                  { width: "auto", text: "•", alignment: "center" },
                  {
                    width: "auto",
                    text: "tillbergdesign.com",
                    link: "https://tillbergdesign.com/",
                    alignment: "center",
                  },
                  {
                    width: "auto",
                    text: `Page ${currentPage}/${pageCount}`,
                    alignment: "center",
                  },
                ],
              },
            ],
          ],
        },

        layout: "noBorders",
      };
    },

    content: [
      {
        columns: [
          { width: "auto", text: `PROJECT:`, style: "headerGray" },
          {
            width: "auto",
            text: ` ${projectName.toUpperCase()}`,
            style: "headerBlack",
          },
        ],
        alignment: "left",
      },
      {
        alignment: "justify",
        margin: [0, 10, 0, 0],
        style: "columnMD",
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
        style: "columnSM",
        table: {
          widths: ["*"],
          body: [[{ border: [false, true, false, false], text: "" }]],
        },
      },
      {
        margin: [0, 10, 0, 0],
        text: `${specType.toUpperCase()}`,
        style: "headerGray",
        alignment: "left",
      },
      {
        text: `DK 0${deck} FZ 0${fireZone} ${areaName}`,
        style: "headerSM",
        alignment: "left",
      },
      {
        style: "columnSM",
        margin: [0, 20, 0, 5],
        table: {
          widths: ["5%", "10%", "27,5%", "20%", "12,5%", "25%"],
          body: [
            [
              {
                border: [false, false, false, false],
                text: "CODE",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "ITEM",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "DESCRIPTION",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "SUPPLIER",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "DATE",
                alignment: "center",
              },
              {
                border: [false, false, false, false],
                text: "PICTURE",
                alignment: "center",
              },
            ],
          ],
        },
      },

      {
        style: "tableExample",
        table: {
          widths: ["5%", "10%", "27,5%", "20%", "12,5%", "25%"],
          body: [...materials],
        },
      },
    ],
    styles: {
      headerGray: {
        fontSize: 14,
        bold: true,
        color: "#808080",
      },

      headerBlack: {
        fontSize: 14,
        bold: false,
        color: "#000000",
      },
      headerSM: {
        fontSize: 12,
      },
      columnSM: {
        fontSize: 7,
        columnGap: 20,
        italics: false,
      },
      columnMD: {
        fontSize: 9,
        columnGap: 20,
        italics: false,
      },
      footerColumn: {
        fontSize: 7,
        columnGap: 7,
        italics: false,
      },
      footer: {
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
};

export default generatePDF;
