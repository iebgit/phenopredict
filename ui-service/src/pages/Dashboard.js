import React from "react";
import DataUpload from "../components/DataUpload";
import "./Dashboard.css"; // Import the CSS file for the Matrix theme

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <p className="dashboard-description">
        Upload your genetic data or an image to receive predictions.
      </p>

      <div className="upload-section">
        <h3 className="upload-heading">Upload Genetic Data</h3>
        <DataUpload uploadType="genetic" />
      </div>

      <div className="upload-section">
        <h3 className="upload-heading">Upload Image</h3>
        <DataUpload uploadType="image" />
      </div>
    </div>
  );
};

export default Dashboard;
