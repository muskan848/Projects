import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ padding: "1px 50px 5px 50px " }}>
            <h2 className=" mt-4 text-center fw-bold mb-2 text-uppercase">Add a note</h2>
            <form className=" my-3">
                <div className="form-group mb-2 fw-bold  ">
                    <label htmlFor="title"><h4>Title:</h4></label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} />
                </div>
                <div className="form-group mb-2 fw-bold">
                    <label htmlFor="description"><h4>Description:</h4></label>
                    <textarea rows="3" cols="50" type="text" className="form-control" id="description" value={note.description} name="description" placeholder="Enter description" onChange={onChange} ></textarea>
                </div>
                <div className="form-group mb-3 mb-2 fw-bold">
                    <label htmlFor="tag"><h4>Tag:</h4></label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Enter tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-outline-dark btn-lg px-5 my-3" style={{ width: "100%" }} onClick={handleClick}>Add Note</button>
            </form>

        </div>

    )
}

export default AddNote
