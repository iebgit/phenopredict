import React, { useState } from "react";
import "./DataUpload.css"; // Ensure the CSS for styling is linked

const DataUpload = ({ uploadType }) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "No file chosen");
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
    </div>
  );
};

export default DataUpload;
