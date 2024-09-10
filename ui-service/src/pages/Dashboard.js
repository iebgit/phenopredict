import React, { useState, useEffect } from "react";
import DataUpload from "../components/DataUpload";
import MatrixSnackbar from "../components/CustomSnackbar";
import { useLoading } from "../contexts/LoadingContext";
import { useDispatch } from "react-redux";
import { fetchDataAction } from "../redux/dataSlice"; // Import the action here

import "./Dashboard.css"; // Import the CSS file for the Matrix theme

const Dashboard = () => {
  // const { setIsLoading } = useLoading();
  // const dispatch = useDispatch();

  const [uploadType, setUploadType] = useState("genetic");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSwitch = () => {
    setUploadType(uploadType === "genetic" ? "image" : "genetic");
  };

  const handleUploadSuccess = () => {
    setSnackbarMessage("Upload successful!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleUploadError = () => {
    setSnackbarMessage("Upload failed. Please try again.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       await dispatch(fetchDataAction()); // Assuming this is an async action
  //     } finally {
  //       setIsLoading(false); // Stop loading when data fetching is complete
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, setIsLoading]);

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
            <DataUpload
              uploadType="genetic"
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
          </div>
        ) : (
          <div>
            <DataUpload
              uploadType="image"
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
          </div>
        )}
      </div>

      {/* Wrap buttons in a button-wrapper for alignment */}
      <div className="button-wrapper">
        <button className="glow-button">
          {uploadType === "genetic" ? "Upload Genetic Data" : "Upload Image"}
        </button>

        <button className="toggle-button" onClick={handleSwitch}>
          {uploadType === "genetic"
            ? "Switch to Upload Image"
            : "Switch to Upload Genetic Data"}
        </button>
      </div>

      {/* Matrix Themed Snackbar */}
      <MatrixSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
};

export default Dashboard;
