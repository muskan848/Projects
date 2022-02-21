import React, { useContext } from 'react'
import Notes from "./Notes.js";

const Home = (props) => {
    const showAlert = props.showAlert;
    return (
        <div id="home" className="container mt-5" style={{ borderRadius: "25px", backgroundColor: "#ebe6e6" }}>
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home;