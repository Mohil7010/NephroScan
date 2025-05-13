import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../src/Images/logo.png";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageSrc = location.state?.image;
  const prediction = location.state?.prediction;

  return (
    <>
      <div className="result-page">
        <div className="logo-image-div">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        <div className="result-body">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded Result"
              className="result-image"
            />
          ) : (
            <p>No image uploaded.</p>
          )}

          <div className="result-desc">
            <h3>Result : {prediction?.result || "Unknown"}</h3>
            <h3>Description : {prediction?.description || "No description."}</h3>
          </div>

          <div className="button-container">
            <button onClick={() => navigate("/")} className="back-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
