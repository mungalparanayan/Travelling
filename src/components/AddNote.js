import React, { useContext, useState } from 'react'
import notecontext from '../context/FormContext';
import '../styles/AddNote.css'
import { toast } from 'react-toastify';

const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addNote} = context; 

    const [note, setNote] = useState({title : "", description : "", tag : ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title : "", description : "", tag : ""})
    }
        
    const onchange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div className="contai my-3">
            <h2 className='conh2'>Add a Dream Note.</h2> 
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onchange} minLength={5} required/>
                </div>  
                <div className='mmm3'>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="bttn" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
