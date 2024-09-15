import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataUpload.css";

const API_URL = process.env.REACT_APP_API_URL;

const DataUpload = ({ uploadType, onSuccess, onError, onFileUploaded }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || "No file chosen");
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      onError();
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/genetic/upload-genetic-data/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess();
      onFileUploaded(); // Trigger a callback to refresh the file list
    } catch (error) {
      console.error("File upload failed:", error);
      onError();
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
