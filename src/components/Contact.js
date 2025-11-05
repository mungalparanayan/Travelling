import React, { useState, useEffect } from 'react'
import '../styles/contact.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Contact() {
    const [details, setDetails] = useState({name: "", email: "", phoneno: "", age: "", dep_country: "", des_country: "", dep_date: "", des_date: "", service_class: ""})

    const [data, setData] = useState([]) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault(); 
            const {name, email, phoneno, age, dep_country, des_country, dep_date, des_date, service_class} = details

            const response = await fetch("http://localhost:5000/api/form/formdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({name, email, phoneno, age, dep_country, des_country, dep_date, des_date, service_class})
            })

            console.log(data);

            const json = await response.json();
            setData([...data, json]);
            // setData(data.concat(json));

            console.log(details);

            if(!details.name || !details.email || !details.phoneno || !details.age || !details.dep_country || !details.des_country || !details.dep_date || !details.des_date || !details.service_class) {
                toast.warning("Please select details properly.", {
                    position: "top-center",
                    className: "fontToast"
                })
                return;
            }
            else if(details.dep_country && details.des_country && details.dep_country === details.des_country) {
                toast.warning("Departure Country and Destination Country cannot be same", {
                    position: "top-center",
                    className: "fontToast"
                });
                return;
            }

            toast.success("Ticket booked successfully", {
                position: "top-center",
                className: "fontToast"
            });
            
            setDetails({
                name: "",
                email: "",
                phoneno: "",
                age: "",
                dep_country: "",
                des_country: "",
                dep_date: "",
                des_date: "",
                service_class: "",
              });
              
              navigate("/");
        }
        catch(error) {
            console.error(error);
        }
    }

    const onchange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const getTodayDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => { 
        if(localStorage.getItem('token')) { 
            handleSubmit();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [navigate])

  return (
    <div>
        <main className="tic">
            <form onSubmit={handleSubmit} className="conform">
                <h1 className="my-4 hh">Travel Information Form</h1>
                <p className="text">Please provide us with the contact information below and we will arrange to reserve your ticket.</p>
                <section>
                    <h2 className="h2h">Your Personal details</h2>
                    <ul>
                        <li>
                            <label className='confo' htmlFor="name">Enter Your name <span style={{color: 'red'}}>*</span></label>
                            <input className="n1" onChange={onchange} type="text" name="name" id="name" required placeholder="Enter your name" />
                        </li>
                        <li>
                            <label className='confo' htmlFor="email">Enter Your email address <span style={{color: 'red'}}>*</span></label>
                            <input type="email" onChange={onchange} name="email" id="email" required placeholder="xxx@gmail.com" />
                        </li>
                        <li>
                            <label className='confo' htmlFor="age">Enter Your age <span style={{color: 'red'}}>*</span></label>
                            <input type="number" step="1" onChange={onchange} name="age" id="age" required />
                        </li>
                        <li>
                            <label className='confo' htmlFor="phoneno">Enter Your Phone Number <span style={{color: 'red'}}>*</span></label>
                            <input type="tel" onChange={onchange} name="phoneno" id="phoneno" required placeholder="xxxxx xxxxx"/>
                        </li>
                    </ul>
                    <h2 className="mar h2h">Travel Details</h2>
                    <ul>
                        <li>
                            <label htmlFor="dep_country">Departure country <span style={{color: 'red'}}>*</span></label>
                            <select id="dep_country" onChange={onchange} name="dep_country" required> 
                                <option value>please select</option>
                                <option value="Australia">Australia</option>
                                <option value="England">England</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Italy">Italy</option>
                                <option value="Japan">Japan</option>
                                <option value="New zealand">New zealand</option>
                                <option value="Spain">Spain</option>
                                <option value="USA">USA</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="des_country">Destination country <span style={{color: 'red'}}>*</span></label>
                            <select id="des_country" onChange={onchange} name="des_country" required> 
                                <option value>please select</option>
                                <option value="Australia">Australia</option>
                                <option value="England">England</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Italy">Italy</option>
                                <option value="Japan">Japan</option>
                                <option value="New zealand">New zealand</option>
                                <option value="Spain">Spain</option>
                                <option value="USA">USA</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="dep_date">Departure date & time <span style={{color: 'red'}}>*</span></label>
                            <input id="dep_date" type="date" onChange={onchange} name="dep_date" required min={getTodayDate()}/>
                            {/* <input type="time" value="00:00" name="user-time" required /> */}
                        </li>
                        <li>
                            <label htmlFor="des_date">Return date & time <span style={{color: 'red'}}>*</span></label>
                            <input id="des_date" type="date" onChange={onchange} name="des_date" required min={details.dep_date || getTodayDate()}/>
                            {/* <input type="time" value="00:00" name="user-time" required /> */}
                        </li>
                        <li>
                            <label>class of service <span style={{color: 'red'}}>*</span></label>
                            <li className="form-control-inline">
                                <input type="radio" name="service_class" onChange={onchange} id="verify-text-message" value="Economy class" required />
                                <label htmlFor="verify-text-message">Economy class</label>
                            </li>
                            <li className="form-control-inline">
                                <input type="radio" name="service_class" onChange={onchange} id="verify-phone" value="Bussiness Class" required />
                                <label htmlFor="verify-phone">Bussiness Class</label>
                            </li>
                            <li className="form-control-inline">
                                <input type="radio" name="service_class" onChange={onchange} id="verify-email" value="First Class" required />
                                <label htmlFor="verify-email">First Class</label>
                            </li>
                        </li>
                    </ul>
                </section>  

                <section className="buttons">
                    <button id="b2" type="submit" className="b2">Book ticket</button>
                </section>
            </form>
        </main>

        {/* {JSON.stringify(details)} */}
    </div>
  )
}