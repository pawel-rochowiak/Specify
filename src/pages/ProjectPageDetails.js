import classes from "./ProjectPageDetails.module.css";
import DetailItem from "../components/DetailsItem";
import Task from "../components/Task";
import PlusIcon from "../components/icons/PlusIcon";
import { useSelector } from "react-redux";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import JSZip from "jszip";
import FileSaver from "file-saver";

const ProjectPageDetails = () => {
  const stateProjects = useSelector((state) => state.projects);
  const stateTasks = useSelector((state) => state.tasks);
  const [createItem, , , , previewPDF] = useOutletContext();
  const params = useParams();
  const path = params.projectId;
  const element = stateProjects.find((el) => el.path === path);
  const projectName = element.name;
  const currentProjectTasks = stateTasks.map((el) => {
    if (el.project === projectName) {
      return el;
    }
  });
  const userInitials = localStorage.getItem("currentUser");

  const handleGeneratePDFButtonClick = async () => {
    const zip = new JSZip();
    const storageRef = ref(storage, `specifications/${projectName}`);
    try {
      const listResult = await listAll(storageRef);
      const downloadPromises = listResult.items.map(async (item) => {
        const pdfFile = await getDownloadURL(item);
        console.log(pdfFile);
        const response = await fetch(pdfFile);
        const pdfBlob = await response.blob();
        zip.file(`${item.name}`, pdfBlob);
      });
      await Promise.all(downloadPromises);
      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, `${projectName}.zip`);
    } catch (error) {
      console.error("Error downloading PDFs:", error);
    }
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.tasks}>
        <div className={classes.name}>{element.name}</div>
        {element.area.length !== 0 ? (
          <div className={classes.categoriesAreas}>
            <div>Name</div>
            <div>Deck</div>
            <div>Fire Zone</div>
            <div>Outfitter</div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.taskList}>
          {element.area.length !== 0 ? (
            element.area.map((el, index) => {
              if (
                currentProjectTasks.find(
                  (el) => el.area === element.area[index].name
                )
              ) {
                return (
                  <div className={classes.area__spec_container}>
                    <DetailItem
                      key={index + 1}
                      dataset={index}
                      section="projects"
                      items={el}
                      grid="4"
                      edit={createItem}
                      type="projectsAreaState"
                    />

                    {currentProjectTasks
                      .filter((el1) => el1.area === el.name)
                      .map((el2) => (
                        <div className={classes.area__specifications}>
                          <Link key={path} to={`/home/tasks/${el2.path}`}>
                            <Task
                              key={path}
                              venue={el2.area}
                              name={element.name}
                              person={userInitials}
                              task={el2.task}
                              date={el2.date}
                              disabled={true}
                            />
                          </Link>
                        </div>
                      ))}
                    <button
                      onClick={previewPDF}
                      data-prev="preview"
                      data-project={projectName}
                    >
                      PREVIEW ALL
                    </button>
                    <button onClick={handleGeneratePDFButtonClick}>
                      DOWNLOAD ALL
                    </button>
                  </div>
                );
              }
            })
          ) : (
            <div className={classes.info_message}>
              No area has been added. Please press
              <span className={classes.highlight}>"Add venue"</span> button to
              add new area.
            </div>
          )}
          <div
            className={`${classes.item} ${classes.action}`}
            onClick={createItem}
          >
            Add venue
            <PlusIcon size="1.6rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDetails;
