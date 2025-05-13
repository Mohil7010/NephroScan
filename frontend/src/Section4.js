import React, { useState, useEffect } from "react";

const reviews = [
  {
    name: "Ajay",
    stars: 5,
    review: "Amazing User Interface! Highly recommend it to everyone.",
  },
  {
    name: "Bhuvi",
    stars: 4,
    review: "Great accuracy, helps us in detecting the images easily.",
  },
  {
    name: "Hardik",
    stars: 3,
    review: "It has the potential for improvement.",
  },
  {
    name: "Dinesh",
    stars: 5,
    review: "Absolutely love it! Will try it again for my patients.",
  },
  {
    name: "Eshan",
    stars: 4,
    review: "Highly satisfied with the results provided.",
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the indices of the three visible reviews
  const getVisibleReviews = () => {
    return [
      reviews[currentIndex],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
    ];
  };

  // Navigate to the previous set of reviews
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next set of reviews
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const visibleReviews = getVisibleReviews();

  return (
    <div className="section-4">
        <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <h2>Reviews</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
            {/* Left Arrow */}
            <button
            onClick={handlePrev}
            style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                marginRight: "10px",
            }}
            >
            &#8592;
            </button>

            {/* Review Boxes */}
            <div style={{ display: "flex", gap: "20px", overflow: "hidden", backgroundColor: "white" }}>
            {visibleReviews.map((review, index) => (
                <div
                key={index}
                style={{
                    flex: "1",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    minWidth: "250px",
                    textAlign: "left",
                }}
                >
                <h3>{review.name}</h3>
                <p style={{ fontSize: "18px", color: "#ffc107" }}>
                    {"★".repeat(review.stars)}
                    {"☆".repeat(5 - review.stars)}
                </p>
                <p>{review.review}</p>
                </div>
            ))}
            </div>

            {/* Right Arrow */}
            <button
            onClick={handleNext}
            style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                marginLeft: "10px",
            }}
            >
            &#8594;
            </button>
        </div>
        </div>
    </div>
  );
};

export default ReviewCarousel;
