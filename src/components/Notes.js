import React, { useContext, useEffect, useRef, useState } from 'react';
import notecontext from '../context/FormContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import '../styles/Notes.css'

const Notes = (props) => {
  const context = useContext(notecontext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  
  // State to control the visibility of the Edit modal
  const [isEditing, setIsEditing] = useState(false);
  
  // State to hold the note being edited
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  // References for modal control
  const refClose = useRef(null);
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [navigate]);

  // Function to handle the click on the "Edit" button
  const updateNote = (currentNote) => {
    setIsEditing(true); // Show the edit note modal
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  // Handle Edit submission
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); // Close the modal
    setIsEditing(false); // Hide the modal after saving
  };

  // Handle input changes in the form
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className='baka'>
      <AddNote showAlert={props.showAlert} />
      <div className='editno'>

      {/* Conditionally render the modal only when isEditing is true */}
      {isEditing && (
        <div className="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  ref={refClose}
                  onClick={() => {
                    setIsEditing(false); // Hide modal on close
                  }}></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="bttn btn-secondary"
                  onClick={() => setIsEditing(false)}>
                  Close
                </button>
                <button
                  disabled={note.etitle.length < 5 || note.edescription.length < 5}
                  type="button"
                  className="bttn btn-primary"
                  onClick={handleClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Display Notes */}
      <div className="contain row my-3">
        <h2 className='mm2'>Your Dream Notes</h2>
        <div className="conn">
          {notes.length === 0 ? (
            'No Dream Notes to be Display'
          ) : (
            notes.map((note) => {
              return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
            })
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Notes;
