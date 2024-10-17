import React, { useContext } from 'react';
import notecontext from '../context/FormContext';
import '../styles/Noteitem.css'; 

const Noteitem = (props) => {
    const context = useContext(notecontext);
    const { deleteNote } = context;
    const {note, updateNote} = props;

    return (
        <div className="note-card-container">
            <div className="note-card">
                <div className="note-card-body">
                    <div className="note-card-header">
                        <h5 className="note-title">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash icon" onClick={() => { deleteNote(note._id); }}></i>
                            <i className="fa-regular fa-pen-to-square icon" onClick={() => { updateNote(note); }}></i>
                        </div>
                    </div>
                    <p className="note-description">{note.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;
