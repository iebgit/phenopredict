// src/pages/ResetPasswordForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To get the token and uid from URL and navigate after success
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./LoginRegister.css"; // Reuse the same styling

const ResetPasswordForm = () => {
  const { uidb64, token } = useParams(); // Get uidb64 and token from URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password/${uidb64}/${token}/`,
        { password }
      );

      setSnackbarMessage("Password reset successful! You can now log in.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setSnackbarMessage("Password reset failed. Invalid or expired link.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="glow-input"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="glow-input"
        />
        <button type="submit" className="glow-button">
          Reset Password
        </button>
      </form>

      {/* Snackbar for success or error notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPasswordForm;
