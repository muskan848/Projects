import React, { useState } from "react";

function Textform(props) {
  const [text, setText] = useState("");

  const clickupHandler = () => {
    const newText = text.toUpperCase();
    setText(newText);
    props.showAlert("convert to uppercase", "success");
  };

  const clickclearHandler = () => {
    setText("");
    props.showAlert("text cleared", "success");
  };

  const clickloHandler = () => {
    const newText = text.toLowerCase();
    setText(newText);
    props.showAlert("convert to lowercase", "success");
  };

  const clickcopyHandler = () => {

    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    props.showAlert("copy to clipboard", "success");
  };

  const handlespace = () => {
    const newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("removed extra space", "success");
  };

  const handleOnChange = (event) => {
    console.log("onchange");
    setText(event.target.value);
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h3>{props.heading}</h3>
        <div className="mb-3">
          <textarea
            id="mybox"
            className="form-control"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
          ></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-dark btn-sm my-1" onClick={clickupHandler}>
          Convert to uppercase
        </button>
        <button disabled={text.length === 0} className="btn btn-dark mx-2 my-1 btn-sm" onClick={clickloHandler}>
          Convert to lowercase
        </button>
        <button disabled={text.length === 0} className="btn btn-dark mx-2 my-1 btn-sm" onClick={clickcopyHandler}>
          Copy
        </button>
        <button disabled={text.length === 0} className="btn btn-dark mx-2 my-1 btn-sm" onClick={handlespace}>
          Remove extra space
        </button>
        <button disabled={text.length === 0} className="btn btn-dark mx-2 btn-sm" onClick={clickclearHandler}>
          Clear text
        </button>
      </div>

      <div
        className="container my-4"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h3>Your Text Summary :</h3>
        <p>
          {text.split(/[\s+]/).filter((element) => { return element.length !== 0; }).length} words , {text.length} characters;
        </p>
        <p>{0.008 * text.split(" ").filter((element) => { return element.length !== 0 }).length} Minutes to read</p>
        <h4>Preview :</h4>
        <p>
          {text.length > 0
            ? text
            : "Nothing to preview!"}
        </p>
      </div>
    </>
  );
}

export default Textform;
