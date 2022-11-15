import "./App.css";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import Footer from "./components/Footer";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSLiceActions } from "./store/index";

let isInitial = true;

//trzeba stworzyc akcje action creatorem dla zmiany initial state z servera
//jak sie dodaje state mitoda post nie moge dodawac calego state. tylko poszczegolne czesci state chyba bo naspisuja caly state
//dzis 3 filmy z action creatora

function App() {
  const dispatch = useDispatch();
  let store = useSelector((state) => state);

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

    const fetchStatus1 = async () => {
      const response = await fetch(
        "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app/state.json"
      );
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error("sending cart date failed");
      }
    };

    if (isInitial) {
      fetchStatus1().catch((error) => console.log(error));
      isInitial = false;
      return;
    }

    console.log("asda");
    fetchStatus().catch((error) => console.log(error));
  }, [store, dispatch]);

  return (
    <Fragment>
      <div className="App">
        {/* <Welcome /> */}
        <StartPage />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
