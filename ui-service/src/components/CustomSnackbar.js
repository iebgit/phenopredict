// src/components/MatrixSnackbar.js
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./CustomSnackbar.css"; // Import your custom CSS

const CustomSnackbar = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      className={`matrix-theme-snackbar snackbar-${severity}`} // Add class based on severity
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        className={`matrix-theme-snackbar snackbar-${severity}`} // Add Matrix theme to Alert
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
