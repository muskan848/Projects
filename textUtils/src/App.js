// import React from "react";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import About from "./components/About";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [button, setbtn] = useState("Enable DarkMode");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setbtn("Enable LightMode");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enables", "success");

      //to attract viewers attention
      // setInterval(() => {
      //   document.title = "TextUtils is amazing";
      // }, 2000);
      // setInterval(() => {
      //   document.title = "Install TextUtils";
      // }, 1500);

    } else {
      setMode("light");
      setbtn("Enable DarkMode");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enables", "success");
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="MyTextUtils"
          about="About Us"
          mode={mode}
          toggleMode={toggleMode}
          button={button}
        />
        <Alert alert={alert} />

        <div className="container my-3">
          <Switch>
            <Route exact path="/about"> <About mode={mode} /></Route>
            <Route exact path="/">
              <Textform
                showAlert={showAlert}
                heading="Enter Your Text Below :)"
                mode={mode}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
