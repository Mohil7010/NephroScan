import React from "react";

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div style={{  bottom: "20px", right: "20px" }}>
      <button
        onClick={handleScrollToTop}
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "black",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          height: "50px",
          width: "120px",
          marginTop: "80px",
          marginLeft: "90px",
          borderRadius: "20px"
        }}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
