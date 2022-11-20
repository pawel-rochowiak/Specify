import "./App.css";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import Footer from "./components/Footer";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStateData } from "./store/all-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  let store = useSelector((state) => state);

  console.log(store);

  useEffect(() => {
    dispatch(fetchStateData());
  }, [dispatch]);

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
        <Welcome />
        {/* <StartPage /> */}
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
