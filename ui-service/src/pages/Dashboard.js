import React, { useState } from "react";
import DataUpload from "../components/DataUpload";
import "./Dashboard.css"; // Import the CSS file for the Matrix theme

const Dashboard = () => {
  const [uploadType, setUploadType] = useState("genetic");

  const handleSwitch = () => {
    setUploadType(uploadType === "genetic" ? "image" : "genetic");
  };

  // Dynamic description based on upload type
  const description =
    uploadType === "genetic"
      ? "Upload genetic data (raw data from 23andMe/AncestryDNA) to gain insight into appearance, behavior, ancestry, and health risks."
      : "Upload a facial image to receive predictions based on physical features, including ancestry, health, and behavior.";

  return (
    <div className="dashboard-container">
      {uploadType === "genetic" ? (
        <div>
          <h2 className="dashboard-heading">Upload Genetic Data</h2>
        </div>
      ) : (
        <div>
          <h2 className="dashboard-heading">Upload Image</h2>
        </div>
      )}
      <p className="dashboard-description">{description}</p>

      {/* Conditionally render the DataUpload component based on the selected upload type */}
      <div className="upload-section">
        {uploadType === "genetic" ? (
          <div>
            <DataUpload uploadType="genetic" />
          </div>
        ) : (
          <div>
            <DataUpload uploadType="image" />
          </div>
        )}
      </div>

      {/* Wrap buttons in a button-wrapper for alignment */}
      <div className="button-wrapper">
        {/* Render the upload button only here */}
        <button className="glow-button">
          {uploadType === "genetic" ? "Upload Genetic Data" : "Upload Image"}
        </button>

        <button className="toggle-button" onClick={handleSwitch}>
          {uploadType === "genetic"
            ? "Switch to Upload Image"
            : "Switch to Upload Genetic Data"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
