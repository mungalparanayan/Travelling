import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/rating.css'; 
import { toast } from 'react-toastify';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const [credentials, setCredentials] = useState({email: "", rating: "", comment: ""})

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleRating = async (e) => {
    e.preventDefault();

    const ema = localStorage.getItem("Email");

    if (!ema) {
      toast.error("User not logged in. Please log in to submit a rating.", {
        position: "top-right",
        className: "fontToast"
      });
      return;
    }

    if (rating === 0 || comment === "") {
      toast.error("Please provide both a rating and a comment.", {
        position: "top-right",
        className: "fontToast"
      });
      return;
    }

    // const host = "https://travel-1xsf.onrender.com"

    credentials.email = localStorage.getItem("Email");
    setCredentials({ ...credentials, rating: rating, comment: comment });
    const response = await fetch("http://localhost:5000/api/feed/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, rating: rating, comment: comment })
    });
    const json = await response.json();
    console.log(json);
    console.log("JSON : " , json.success);
    if(json.success) {
      toast.success("Rating submitted successfully", {
        position: "top-right",
        className: "fontToast"
      });
      setRating(0);
      setComment('');
    }
    else {
        toast.error(json.error, {
            position: "top-right",
            className: "fontToast"
        });
    }
  }

  return (
    <div className="rate-container">
      <h1 className='rateh1'>Rate Your Travel Experience</h1>
      <p className='ratep'>We value your feedback and strive to provide the best travel experiences for our community. Please take a moment to rate your recent trip and share your thoughts with us.</p>

      <div className="stars">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                className='typera'
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingClick(ratingValue)}
              />
              <FontAwesomeIcon
                icon={faStar}
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size="2x"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
      <p className="rating-text">Your Rating : {rating} stars</p>

      <textarea
        className="comment-box"
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit" className="submit-button" onClick={handleRating}>Submit</button>
    </div>
  );
};

export default ReviewPage;
