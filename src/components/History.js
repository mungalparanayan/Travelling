import React, { useContext, useEffect, useState, useRef } from 'react';
import '../styles/history.css';
import { useNavigate } from 'react-router-dom';
import formcontext from '../context/FormContext';
import Ticket from './Ticket';

const History = () => {
    const context = useContext(formcontext);
    const { datas, getUser } = context;
    const navigate = useNavigate();
    const [selectTicket, setSelectTicket] = useState(null);
    var ticketNo = 1;

    useEffect(() => { 
        if(localStorage.getItem('token')) { 
            getUser();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const handleTicket = (ticket) => {
        setSelectTicket((prevTicket) => (prevTicket === ticket ? null : ticket));
    }

    const changeDate = (date) => {
        const nd = new Date(date);
        const dateParts = nd.toString().split(" ");
        const dateString = [dateParts[0], dateParts[1], dateParts[2], dateParts[3]].join(" ");
        const dateWithoutTimezone = new Date(dateString).toDateString();

        return dateWithoutTimezone;
    }

    return (
        <div className="cont">
            <h2 className="histic">Ticket History</h2>
            {datas.length === 0 && 
                <div className="contt"> 
                    No Data to Display
                </div>
            }
            {datas.length !== 0 ? <div style={{fontSize: "3rem", padding: "1rem"}}>Total Tickets ({datas.length})</div> : <div></div>}
            {datas.map((data) => {
                return (
                    <div key={data._id}>
                        <div className="tick" key={data._id} style={{marginBottom: datas.length === 1 ? '75px' : '0'}}>
                            <ul>
                                <li>Ticket No : {ticketNo++}</li>
                                <li>Date : {changeDate(data.date)}</li>
                                <li>Email : {data.email}</li>
                                <li>From : {data.dep_country}</li>
                                <li>To : {data.des_country}</li>
                            </ul>
                            <button className="beaa" onClick={() => handleTicket(data._id)}>View Ticket</button>
                        </div>
                        {selectTicket === data._id && <Ticket ticket={selectTicket} key={data._id} date={data.date} name={data.name} dep_country={data.dep_country} des_country={data.des_country} dep_date={data.dep_date} des_date={data.des_date} sclass="Business class" />}
                    </div>
                );
            })}
        </div>
    )
}

export default History;