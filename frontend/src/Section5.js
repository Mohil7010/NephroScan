import React, { useState } from "react";

const ReviewSection = () => {
  const [rating, setRating] = useState(0); // State to track star rating
  const [hover, setHover] = useState(0); // State for hover effect
  const [review, setReview] = useState(""); // State for review text
  const [submittedReview, setSubmittedReview] = useState(null); // Submitted data

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedReview({ rating, review });
    setRating(0); // Reset rating
    setReview(""); // Reset review text
  };

  return (
    <div className="section-5">
      <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
        

        {/* Star Rating */}
        <div style={{ fontSize: "50px", marginBottom: "20px", marginLeft: "20px" }}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                style={{
                  cursor: "pointer",
                  color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        {/* Review Text Box */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            style={{
              width: "300px",
              height: "100px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
              resize: "none",
            }}
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              marginLeft: "15px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>

        {/* Submitted Review */}
        {submittedReview && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h4>Submitted Review</h4>
            <p>Rating: {"★".repeat(submittedReview.rating)}</p>
            <p>{submittedReview.review}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
