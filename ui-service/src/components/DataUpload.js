// src/components/DataUpload.js
import React, { useState } from "react";
import axios from "axios";

const DataUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/upload-genetic-data`,
        formData
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DataUpload;
