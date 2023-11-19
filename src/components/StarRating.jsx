import React, { useState } from "react";

const StarRating = ({ initialRating, onRatingChange, bookIndex }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating, bookIndex);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
          onClick={() => handleStarClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
