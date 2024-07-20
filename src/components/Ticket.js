import React from 'react'
import '../styles/ticket.css'

const ticket = (props) => {

    const changeDate = (date) => {
        const nd = new Date(date);
        const dateParts = nd.toString().split(" ");
        const dateString = [dateParts[0], dateParts[1], dateParts[2], dateParts[3]].join(" ");
        const dateWithoutTimezone = new Date(dateString).toDateString();

        return dateWithoutTimezone;
    }

    return (
        <div className="ticketdiv">
            <div>
                <h1>Plane Ticket Purchase</h1>
                <hr />
                <div className="bd">
                    <h2>Booking Date</h2>
                    <span id="date1">{changeDate(props.date)}</span>
                    <h2>Guest Name</h2>
                    <span id="name1">{props.name}</span>
                </div>
                <hr />
                <div className="bd">
                    <h3>Flight Details</h3>
                    <h2 style = {{color: '#19376D'}}>Route</h2>
                </div>
                <hr />
                <div>
                    <ul className="ul1">
                        <li className="li1">
                            <h2>From</h2>
                            <span id="from">{props.dep_country}</span>
                        </li>
                        <li className="li2">
                            <h2>Airline</h2>
                            <span>Emirates Airline</span>
                        </li>
                        <li className="li3">
                            <h2>Departure Date</h2>
                            <span id="da1">{changeDate(props.dep_date)}</span>
                        </li>
                        <li className="li4">
                            <h2>Arrival Date</h2>
                            <span id="da2">{changeDate(props.des_date)}</span>
                        </li>
                    </ul>
                    <hr />
                    <ul className="ul1">
                        <li className="li1">
                            <h2>To</h2>
                            <span id="to">{props.des_country}</span>
                        </li>
                        <li className="li2">
                            <h2>Flight Number</h2>
                            <span>AA7755</span>
                        </li>
                        <li className="li3">
                            <h2>Departure Terminal</h2>
                            <span>Terminal 1</span>
                        </li>
                        <li className="li4">
                            <h2>Arrival Terminal</h2>
                            <span>Terminal 5</span>
                        </li>
                    </ul>
                </div>
                <hr />
                <div>
                    <ul className="ul1">
                        <li className="li5">
                            <h2>Seat Class</h2>
                            <span id="sclass">{props.sclass}</span>
                        </li>
                        <li className="li6">
                            <h2>Extra Baggage Allowance</h2>
                            <span>8</span>
                        </li>
                        <li className="li6">
                            <h2>Seat Number</h2>
                            <span>3-A</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tcp">
                <h1>Ticket Cost Purchase</h1>
                <hr />
                <div className="ul2">
                    <h3>Fare Breakdown</h3>
                    <ul>
                        <li>Base Fare</li>
                        <li>100$</li>
                    </ul>
                    <ul>
                        <li>Passenger Service Charge</li>
                        <li>5$</li>
                    </ul>
                    <ul>
                        <li>Surcharge</li>
                        <li>80$</li>
                    </ul>
                    <ul>
                        <li>Fuel/Insurance Surcharge</li>
                        <li>30$</li>
                    </ul>
                    <ul>
                        <li>Ticketing Service Charge</li>
                        <li>10$</li>
                    </ul>
                    <hr />
                    <ul>
                        <li>Total Amount</li>
                        <li>225$</li>
                    </ul>
                </div>
                <div className="term">
                    <h2>Important Information</h2>
                    <p>Passengers are required to bring this Receipt along with an official ID with Photo issued by the government or known corporations upon entering the terminal.</p>
                    <p>The airline may contact the card holder or the passenger for verification of their payment, and in case the airline suspect or has a reason to believe that the ticket purchased were made fraudulently, the airline may cancel the reservation made by the passenger.</p>
                </div>
                <hr />
                <div className="thank">
                    <p>Thank you for making us your airline of choice!</p>
                    <p>Have a safe flight!</p>
                    <p>Happy journey!</p>
                </div>
            </div>
        </div>
    )
}

export default ticket