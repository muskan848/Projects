import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className="col-md-3 p-4">
            <div id="bg" className="card my-3 p-4" >
                <div className="card-body ">
                    <h5 className="card-title text-center">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can " onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }} ></i>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={() => { updateNote(note); }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
