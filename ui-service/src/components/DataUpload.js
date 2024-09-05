// src/components/DataUpload.js
import React, { useState } from "react";
import axios from "axios";

const DataUpload = ({ uploadType }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus("Uploading...");

    try {
      const endpoint =
        uploadType === "genetic"
          ? `${process.env.REACT_APP_API_BASE_URL}/upload-genetic-data`
          : `${process.env.REACT_APP_API_BASE_URL}/upload-image`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
        },
      });
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        Upload {uploadType === "genetic" ? "Genetic Data" : "Image"}
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default DataUpload;
