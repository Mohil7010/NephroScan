import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadSection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    preventDefaults(e);
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    preventDefaults(e);
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    e.currentTarget.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      displayImage(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      displayImage(file);
    }
  };

  const displayImage = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setImageSrc(e.target.result);

      const prediction = await uploadToBackend(file);
      navigate("/result", {
        state: {
          image: e.target.result,
          prediction: prediction,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  // Send image to Django backend
  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Django API error:", errText);
        return {
          result: "Error",
          description: "Backend returned an error.",
        };
      }

      const data = await res.json();
      console.log("Prediction received:", data);
      return data;
    } catch (err) {
      console.error("Prediction error:", err);
      return {
        result: "Unknown",
        description: "No description.",
      };
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="section-3">
      <div
        className="upload-section"
        id="uploadSection"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" />
        ) : (
          <>
            <p className="instructions">
              Drag & Drop an image here or click to upload
            </p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
