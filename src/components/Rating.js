// import { findByLabelText } from '@testing-library/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const feedbackStyles = {
  container: {
    textAlign: 'center',
    margin: '130px 20px 50px 20px',
    fontSize: '2rem',
  },
  starsContainer: {
    display: 'inline-block',
    margin: '1rem'
  },
  star: {
    fontSize: '4rem',
    cursor: 'pointer',
    marginRight: '5px',
  },
  selectedStar: {
    color: 'orange',
  },
};

const Rating = (props) => {
  const [rating, setRating] = useState(0);
  const [credentials, setCredentials] = useState({email: "", rating: ""})

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleRating = async (e) => {
    e.preventDefault();

    const ema = localStorage.getItem("Email");

    if (!ema) {
      toast.error("User not logged in. Please log in to submit a rating.", {
        position: "top-center",
        className: "fontToast"
      });
      return;
    }

    credentials.email = localStorage.getItem("Email");
    setCredentials({ ...credentials, rating: rating });
    const response = await fetch("https://travel-1xsf.onrender.com/api/feed/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, rating: rating })
    });
    const json = await response.json();
    console.log(json);
    setRating(0);
    console.log("JSON : " , json.success);
    if(json.success) {
        toast.success("Rating submitted successfully", {
            position: "top-center",
            className: "fontToast"
        });
    }
    else {
        toast.error(json.error, {
            position: "top-center",
            className: "fontToast"
        });
    }
  }
  
  return (
    <div style={feedbackStyles.container}>
      <div className="rating-page" style={{width: '70%', margin: 'auto'}}>
          <h2 style={{margin: '2rem'}}>Rate Your Travel Experience</h2>
          <p>
              We value your feedback and strive to provide the best travel experiences for our community.
              Please take a moment to rate your recent trip and share your thoughts with us.
              Your feedback helps us improve our services and offer even better travel experiences in the future.
          </p>
      </div>
      {/* <h1>Rate our service:</h1> */}
      <div style={feedbackStyles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...feedbackStyles.star,
              ...(star <= rating ? feedbackStyles.selectedStar : {}),
            }}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p style={{fontSize: '2rem', marginTop: '1rem'}}>Your rating: <span id="selected-rating">{rating}</span> stars</p>
      <button className="btn btn-info" style={{margin: '20px', padding: '8px', borderRadius: '10px='}} onClick={handleRating}>Submit</button>
    </div>
  );
}

export default Rating;