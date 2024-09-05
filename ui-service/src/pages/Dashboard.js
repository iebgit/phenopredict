// src/pages/Dashboard.js
import React from "react";
import DataUpload from "../components/DataUpload";

const Dashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Upload your genetic data or an image to receive predictions.</p>

      <h3>Upload Genetic Data</h3>
      <DataUpload uploadType="genetic" />

      <h3>Upload Image</h3>
      <DataUpload uploadType="image" />
    </div>
  );
};

export default Dashboard;
