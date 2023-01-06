import classes from "./ProjectPageDetails.module.css";
import NewMaterial from "../components/spec-forms/NewMaterial";
import PlusIcon from "../components/icons/PlusIcon";
import MinusIcon from "../components/icons/MinusIcon";
import WordIcon from "../components/icons/WordIcon";
import ArrowDown from "../components/icons/DownArrow";
import { Fragment, useState, useRef } from "react";
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
} from "docx";

const TaskPageDetails = (props) => {
  const projectNumber = props.number;
  const projectName = props.project;
  const deck = props.dk;
  const fireZone = props.fz;
  const areaName = props.area.toUpperCase();
  const specType = props.name.split("-")[0];

  const propsArrLength1 = [
    ["project", projectName],
    ["venue", areaName],
    ["dk", deck],
    ["fz", fireZone],
  ];

  const date = new Date();
  const [day, month, year] = [
    date.getDay(),
    date.getMonth(),
    date.getFullYear(),
  ];

  const [index, setIndex] = useState(1);
  const [specMatArr, setSpecMatArr] = useState([]);
  const [formChecked, setFormChecked] = useState();

  const getDataHanlder = (data, arrIndex) => {
    setSpecMatArr((prevState) => {
      return [...prevState, data];
    });
  };

  // const getCheckedHandler = (checked) => {
  //   setFormChecked(!checked);
  //   console.log(checked);
  // };

  const [materialsArr, setMaterialArr] = useState([
    <NewMaterial
      key="0"
      getData={getDataHanlder}
      data="0"
      // getChecked={getCheckedHandler}
    />,
  ]);

  //Dane z newMaterial potem do nowego ARR -> do bazy przy tasku & do local storage-> przy ladowaniu pobranie z local czy bazy? local szybciej

  const addNewMaterialHandler = () => {
    setMaterialArr((prevState) => {
      return [
        ...prevState,
        <NewMaterial
          key={index}
          data={materialsArr.length}
          getData={getDataHanlder}
          // getChecked={getCheckedHandler}
        />,
      ];
    });
    console.log(specMatArr);
    localStorage.setItem("materials", JSON.stringify(specMatArr));
    setIndex(index + 1);
  };

  const deleteMaterialHandler = () => {
    if (materialsArr.length === 1) return;
    setMaterialArr(materialsArr.slice(0, -1));

    const data = localStorage.getItem("materials");
    console.log(data);
  };

  const generateDOC = () => {
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
                new TableRow({
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
                      children: [new Paragraph("100")],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph("BOLIDT")],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Nice material fo be used on floor deck",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph("www.bolidt.com")],
                    }),
                    new TableCell({
                      width: { size: 100 / 6, type: WidthType.PERCENTAGE },
                      children: [new Paragraph("2021-02-05")],
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
                }),
              ],
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
                <p className={classes.heading}>Project Name: {props.project}</p>
                <div className={classes.info_row}>
                  <div>
                    <span>Yard. Proj:</span>
                    <input type="number" />
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
                    <input type="text" />
                  </div>
                  <div>
                    <span>Date:</span>
                    <input type="date" />
                  </div>
                  <div>
                    <span>By:</span>
                    <input type="text" />
                  </div>
                  <div>
                    <span>Rev:</span>
                    <input type="text" />
                  </div>
                </div>
                <p className={classes.heading}>Material specification</p>
                <div className={classes.header_labels}>
                  <div>Venue:{props.area}</div>
                  <div>Deck:{deck}</div>
                  <div>Fz:{props.fz}</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className={classes.label_row__material}>
                  <div></div>
                  <div>code</div>
                  <div>item</div>
                  <div>desctiption</div>
                  <div>supplier</div>
                  <div>date</div>
                  <div>picture</div>
                </div>
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
            className={`${classes.item} ${classes.action}`}
            onClick={addNewMaterialHandler}
            disabled={!formChecked ? false : true}
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
        <div
          className={`${classes.item} ${classes.action}`}
          onClick={generateDOC}
        >
          <ArrowDown size="1.6rem"></ArrowDown>
          <WordIcon size="1.6rem" />
        </div>
      </div>
    </Fragment>
  );
};

export default TaskPageDetails;
