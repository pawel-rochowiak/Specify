import "./App.css";
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import TasksPage from "./pages/TasksPage";
import ProjectPage from "./pages/ProjectsPage";
import SuppliersPage from "./pages/SuppliersPage";
import LibraryPage from "./pages/LibraryPage";
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
  let tasks = useSelector((state) => state.tasks);

  const router = createBrowserRouter([
    { path: "/welcome", element: <Welcome /> },
    {
      path: "/",
      element: <StartPage />,
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
