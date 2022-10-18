import "./App.css";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import Footer from "./components/Footer";
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
