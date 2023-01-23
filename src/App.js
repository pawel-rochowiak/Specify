import "./App.css";
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
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
import SideMenuLinks from "./components/SideMenuLinks";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStateData } from "./store/all-actions";
import HomePage from "./pages/HomePage";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  let store = useSelector((state) => state);

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
          element: <TasksPage />,
        },
        { path: "/home/projects", element: <ProjectPage /> },
        { path: "/home/suppliers", element: <SuppliersPage /> },
        { path: "/home/library", element: <LibraryPage /> },
      ],
    },
  ]);

  console.log(store);

  useEffect(() => {
    dispatch(fetchStateData());
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch(
        "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json",
        { method: "PUT", body: JSON.stringify(store) }
      );
      if (!response.ok) {
        throw new Error("sending cart date failed");
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    fetchStatus().catch((error) => console.log(error));
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
