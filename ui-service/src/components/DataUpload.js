import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import "./DataUpload.css"; // Ensure the CSS for styling is linked

const API_URL = process.env.REACT_APP_API_URL;

const DataUpload = ({ uploadType, onSuccess, onError }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || "No file chosen");
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      onError(); // If no file is selected, trigger an error
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Add file to FormData

    try {
      const token = localStorage.getItem("token"); // Assuming you have a JWT token saved in local storage
      const response = await axios.post(
        `${API_URL}/genetic/upload-genetic-data/`, // Replace with your actual backend API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
            Authorization: `Bearer ${token}`, // Attach JWT for authentication
          },
        }
      );
      onSuccess(); // Trigger success if the upload is successful
    } catch (error) {
      console.error("File upload failed:", error);
      onError(); // Trigger error if the upload fails
    }
  };

  return (
    <div className="upload-container">
      <label className="file-input-label" htmlFor={`file-upload-${uploadType}`}>
        <input
          type="file"
          id={`file-upload-${uploadType}`}
          className="file-input"
          onChange={handleFileChange}
        />
        <span className="custom-file-button">Choose File</span>
        <span className="file-name">{fileName}</span>
      </label>
      <button className="glow-button" onClick={handleFileUpload}>
        Upload {uploadType === "genetic" ? "Genetic Data" : "Image"}
      </button>
    </div>
  );
};

export default DataUpload;
