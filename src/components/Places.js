import React from 'react'
import '../styles/about.css'

export default function places(props) {
  return (
    <div>
        <div className='cityy'>
            <div>
                <img className='imag' src={`images/${props.city}.jpg`} alt={`Picture of ${props.cityName}`}/>
            </div>
            <div className="place">
                <h2>{props.cityName}</h2>
                <p>{props.msg}</p>
                <a href={`https://en.wikipedia.org/wiki/${props.cityName}`}>Explore &nbsp; &rarr; </a>
            </div>
        </div>
    </div>
  )
}
