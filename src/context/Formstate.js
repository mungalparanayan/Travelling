import { useState } from "react";
import FormContext from './FormContext'
import { toast } from "react-toastify";

const FormState = (props) => {

  // const hostRender = "https://inotec-9.onrender.com"
  const hostRender = "http://localhost:5000"

  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${hostRender}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    setnotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${hostRender}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), 
    }); 

    const note = await response.json();
    // console.log("Notes : ", note);
    setnotes(notes.concat(note));
    if(note.success) {
      toast.success("Note Added successfully", {
        position: "top-center"
      })
    }
    else {
      toast.error("Failed to add note", {
        position: "top-center",
      });
    }
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${hostRender}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();  
    console.log(json);

    const newNote = notes.filter((note)=>{return note._id !== id})
    setnotes(newNote);
    toast.success("Note Deleted successfully", {
      position: 'top-center'
    })
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${hostRender}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = await response.json(); 
    console.log(json);
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    toast.success("Note Updated successfully", {
      position: 'top-center'
    })
  }

  const host = "http://localhost:5000"

  const dataInitial = []
  const [datas, setDatas] = useState(dataInitial)

  const getUser = async () => {
    try{
      const response = await fetch(`${host}/api/form/fetchdata`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(),
      });
      const json = await response.json();

      // setDatas(datas.concat(json));
      setDatas([...json]); // By using setDatas([...json]), you replace the existing data with the new data. 
    }
    catch(error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
      <FormContext.Provider value={{datas, getUser, notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
      </FormContext.Provider>
  )
}

export default FormState;