import { saveAs } from "file-saver";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  AlignmentType,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeightRule,
  Header,
  Footer,
  ExternalHyperlink,
  PageBreak,
  NumberFormat,
  PageNumber,
} from "docx";

const generateDOC = (
  projectName,
  areaName,
  projectNumber,
  fireZone,
  deck,
  specType,
  year,
  month,
  day
) => {
  const data = JSON.parse(localStorage.getItem(`${projectName}-${areaName}`));

  const document = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "main",
          name: "Main",

          run: {
            color: "#808080",
          },
        },
        {
          id: "second",
          name: "Second",

          run: {
            color: "#000000",
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.DECIMAL,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `PROJECT: `,
                    font: "Encode Sans",
                    size: 28,
                    allCaps: true,
                    bold: true,
                    color: "#808080",
                  }),
                  new TextRun({
                    text: `${projectName}`,
                    font: "Encode Sans",
                    size: 28,
                    allCaps: true,
                    color: "#000000",
                  }),
                ],
              }),
              new Paragraph({
                text: "",
              }),
              new Paragraph({
                style: "second",
                alignment: AlignmentType.LEFT,
                thematicBreak: true,
                keepLines: true,
                children: [
                  new TextRun({
                    text: `Yard Proj.# 6310	TD Proj.#${projectNumber}	Issue Date:${year}-${month}-${day}	By: DT   Rev. Date:	 By:	 Rev:`,
                    font: "Encode Sans",
                    size: 18,
                    allCaps: true,
                    break: 0,
                  }),
                ],
              }),
              new Paragraph({
                style: "main",
                children: [
                  new TextRun({
                    text: `MATERIAL SPECIFICATION`,
                    font: "Encode Sans",
                    size: 28,
                    allCaps: true,
                    bold: true,
                    thematicBreak: true,
                  }),
                ],
              }),
              new Paragraph({
                style: "second",
                children: [
                  new TextRun({
                    text: `DK 0${deck} FZ 0${fireZone} ${areaName}`,
                    font: "Encode Sans",
                    size: 24,
                    allCaps: true,
                  }),
                ],
              }),
              new Paragraph({
                text: "",
              }),
              new Paragraph({
                text: "",
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                style: "main",
                alignment: AlignmentType.JUSTIFIED,
                thematicBreak: true,
                keepLines: true,
                children: [
                  new TextRun({
                    text:
                      "GENERAL REGULATIONS AND REQUIREMENTS: Manufacturer to provide Interior Designer with finish samples for review prior to production. Manufacturer to provide Interior Designer with shop drawings for review prior to production. Items must be suitable for contract quality and commercial use in the location that it will be used in. Fixed material must meet all IMO standards and regulations in accordance with classification societies. Final quantity calculation is on Manufacturers/Owners responsibility. Manufacturers guarantee will be maintained as per contract with the Owner. TD has provided the Yard with a specification of the products and designs, which the Manufacturer is obligated to follow and execute. The Manufacturer assumes product liability for such product.",
                    font: "Encode Sans",
                    size: 13,
                    break: 0,
                  }),
                ],
              }),
              new Paragraph({
                style: "second",
                alignment: AlignmentType.LEFT,

                children: [
                  new TextRun({
                    text: `TILLBERG DESIGN   •   Småbåtshamnen 24   •   263 39 Höganäs   •   SWEDEN   •   +46 42 23 80 90   •   td@tillbergdesign.com   •   `,
                    font: "Encode Sans",
                    size: 13,
                    break: 0,
                  }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: "tillbergdesign.com",
                        style: "Hyperlink",
                        font: "Encode Sans",
                        size: 13,
                        break: 0,
                      }),
                    ],
                    link: "https://tillbergdesign.com/",
                  }),
                  new TextRun({
                    children: ["  Page: ", PageNumber.CURRENT],
                    font: "Encode Sans",
                    size: 13,
                    break: 0,
                  }),
                  new TextRun({
                    children: ["/", PageNumber.TOTAL_PAGES],
                    font: "Encode Sans",
                    size: 13,
                    break: 0,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  ...[
                    "CODE",
                    "ITEM",
                    "DESCRIPTION",
                    "SUPPLIER",
                    "DATE",
                    "PICTURE",
                  ].map((el) => {
                    return new TableCell({
                      borders: {
                        top: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                        bottom: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                        left: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                        right: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                      },

                      width: { size: 100 / 6, type: WidthType.AUTO },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${el}`,
                              font: "Encode Sans",
                              size: 14,
                              allCaps: true,
                              bold: true,
                            }),
                          ],
                        }),
                        new Paragraph({
                          text: "",
                        }),
                      ],
                    });
                  }),
                ],
              }),
              //
              ...data.map((el) => {
                return new TableRow({
                  height: { value: 1900, rule: HeightRule.EXACT },
                  children: [
                    new TableCell({
                      borders: {
                        left: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                        right: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                      },
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph(`${el.number}`)],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph(`${el.item}`)],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${el.description}`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph(`${el.supplier}`)],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph(`${el.data}`)],
                    }),
                    new TableCell({
                      borders: {
                        right: {
                          style: BorderStyle.NONE,
                          size: 0,
                          color: "FFFFFF",
                        },
                      },
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph("IMAGE")],
                    }),
                  ],
                });
              }),
              //
            ],
          }),
          new Paragraph({
            children: [new TextRun("sda"), new PageBreak()],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(document).then((blob) => {
    console.log(blob);
    saveAs(blob, `${areaName}-${specType}.docx`);
    console.log("Document created successfully");
  });
};

export default generateDOC;
