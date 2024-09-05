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
      ? "Upload genetic data (e.g., raw data from 23andMe, AncestryDNA) to receive predictions on appearance, behavior, ancestry, and health risks."
      : "Upload an image of a person to receive predictions based on physical features, including ancestry, health risks, and behavioral tendencies.";

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <p className="dashboard-description">{description}</p>

      {/* Conditionally render the DataUpload component based on the selected upload type */}
      <div className="upload-section">
        {uploadType === "genetic" ? (
          <div>
            <h3 className="upload-heading">Upload Genetic Data</h3>
            <DataUpload uploadType="genetic" />
          </div>
        ) : (
          <div>
            <h3 className="upload-heading">Upload Image</h3>
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
