import React, { useState, useEffect } from "react";
import axios from "axios";
import DataUpload from "../components/DataUpload";
import MatrixSnackbar from "../components/CustomSnackbar";
import "./Dashboard.css"; // Import your existing CSS
import { AiOutlineInfoCircle } from "react-icons/ai"; // Info icon

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [uploadType, setUploadType] = useState("genetic");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [files, setFiles] = useState([]);
  const [showDescription, setShowDescription] = useState(false); // State to control the popup

  useEffect(() => {
    fetchFiles(); // Fetch the user's uploaded files when the component loads
  }, []);

  const handleSwitch = () => {
    setUploadType(uploadType === "genetic" ? "image" : "genetic");
  };

  const handleUploadSuccess = () => {
    setSnackbarMessage("Upload successful!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    fetchFiles(); // Refresh the file list after successful upload
  };

  const handleUploadError = () => {
    setSnackbarMessage("Upload failed. Please try again.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/genetic/files/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/genetic/file/${fileId}/delete/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the file list after successful deletion
      setFiles(files.filter((file) => file.id !== fileId));

      setSnackbarMessage("File deleted successfully.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting file:", error);
      setSnackbarMessage("Error deleting file. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleGenerateSignedURL = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/genetic/file/${fileId}/signed-url/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.open(response.data.signed_url, "_blank");
    } catch (error) {
      console.error("Error generating signed URL:", error);
      setSnackbarMessage("Error generating download link. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const description =
    uploadType === "genetic"
      ? "Upload genetic data (raw data from 23andMe/AncestryDNA) to gain insight into appearance, behavior, ancestry, and health risks."
      : "Upload a facial image to receive predictions based on physical features, including ancestry, health, and behavior.";

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Toggle popup
  };

  return (
    <div className="dashboard-container">
      {uploadType === "genetic" ? (
        <div>
          <h2 className="dashboard-heading">
            Upload Genetic Data
            {/* Information Icon */}
            <AiOutlineInfoCircle
              className="info-icon"
              onClick={toggleDescription}
              title="Click for more info"
              style={{ marginLeft: "10px", cursor: "pointer" }}
            />
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="dashboard-heading">
            Upload Image
            <AiOutlineInfoCircle
              className="info-icon"
              onClick={toggleDescription}
              title="Click for more info"
              style={{ marginLeft: "10px", cursor: "pointer" }}
            />
          </h2>
        </div>
      )}

      {/* Display the list of uploaded files */}
      <div className="file-list">
        <p>Uploaded Files</p>
        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                {file.file_name}{" "}
                <button
                  onClick={() => handleGenerateSignedURL(file.id)}
                  className="download-button"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="delete-button"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>

      <div className="upload-section">
        <DataUpload
          uploadType={uploadType}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
          onFileUploaded={fetchFiles} // Refresh the file list after uploading
        />
      </div>

      <button className="toggle-button" onClick={handleSwitch}>
        {uploadType === "genetic"
          ? "Switch to Upload Image"
          : "Switch to Upload Genetic Data"}
      </button>

      {/* Modal for showing description */}
      {showDescription && (
        <div className="description-modal">
          <p>{description}</p>
          <button className="close-button" onClick={toggleDescription}>
            Close
          </button>
        </div>
      )}

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
