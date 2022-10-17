import "./App.css";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import Card from "./UI/Card.js";
import Footer from "./components/Footer";
import classes from "./components/Footer.module.css";
import { Fragment } from "react";

function App() {
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
