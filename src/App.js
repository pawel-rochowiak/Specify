import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import TasksPage from "./pages/TasksPage";
import TasksPageDetails from "./pages/TaskPageDetails";
import ProjectPage from "./pages/ProjectsPage";
import ProjectPageDetails from "./pages/ProjectPageDetails";
import SuppliersPage from "./pages/SuppliersPage";
import SuppliersPageDetails from "./pages/SuppliersPageDetails";
import LibraryPage from "./pages/LibraryPage";
import LibraryPageDetails from "./pages/LibraryPageDetails";

import Footer from "./components/Footer";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStateData } from "./store/all-actions";
import { usersActions } from "./store/users-slice";
import HomePage from "./pages/HomePage";
import swal from "sweetalert";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const userEmail = localStorage?.getItem("login");

  let store = useSelector((state) => state);
  let tasksData = store.tasks;

  const router = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    {
      path: "/home",
      element: <StartPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/home/tasks",
          element: <TasksPage data={tasksData} />,
        },
        {
          path: "/home/tasks/:taskId",
          element: <TasksPageDetails data={tasksData} />,
        },
        {
          path: "/home/projects",
          element: <ProjectPage />,
        },
        {
          path: "/home/projects/:projectId",
          element: <ProjectPageDetails />,
        },
        { path: "/home/suppliers", element: <SuppliersPage /> },
        {
          path: "/home/suppliers/:supplierId",
          element: <SuppliersPageDetails />,
        },
        { path: "/home/library", element: <LibraryPage /> },
        { path: "/home/library/:libraryId", element: <LibraryPageDetails /> },
      ],
    },
  ]);

  console.log(store);

  useEffect(() => {
    dispatch(fetchStateData());
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("store", JSON.stringify(store));
  // }, [store]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json",
          { method: "PUT", body: JSON.stringify(store) }
        );
        if (!response.ok) {
          throw new Error("Sending data failed!");
        }

        if (isInitial) {
          isInitial = false;
          return;
        }
      } catch (error) {
        swal("Sending data failed!", {
          buttons: false,
          icon: "warning",
          timer: 3000,
        });
      }
    };
    fetchStatus();
  }, [store, dispatch]);

  return (
    <Fragment>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
