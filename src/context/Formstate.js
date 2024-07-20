import { useState } from "react";
import FormContext from './FormContext'

const FormState = (props) => {
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
        <FormContext.Provider value={{datas, getUser}}>
          {props.children}
        </FormContext.Provider>
    )
}

export default FormState;