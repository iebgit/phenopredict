import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  clearError,
  resendVerificationEmail,
  resetPassword,
} from "../redux/authSlice";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./LoginRegister.css"; // Ensure the updated CSS is used

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Control the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); // Controls severity: success/error

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setOpenSnackbar(true); // Show error message in Snackbar
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  const handleResendVerification = () => {
    if (email) {
      dispatch(resendVerificationEmail(email));
      setSnackbarMessage("Verification email resent. Check your inbox.");
      setSnackbarSeverity("info");
      setOpenSnackbar(true); // Show resend email notification
    } else {
      setSnackbarMessage("Please provide an email address.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show error if email is not provided
    }
  };

  const handleResetPassword = () => {
    if (email) {
      dispatch(resetPassword(email));
      setSnackbarMessage("Password reset email sent.");
      setSnackbarSeverity("info");
      setOpenSnackbar(true); // Show reset password notification
    } else {
      setSnackbarMessage("Please provide an email address.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show error if email is not provided
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glow-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="glow-input"
        />
        <button type="submit" className="glow-button" disabled={isLoading}>
          Login
        </button>
      </form>

      {/* Container for buttons */}
      <div className="button-container">
        <button onClick={handleResendVerification} className="resend-button">
          Resend Verification Email
        </button>
        <button onClick={handleResetPassword} className="reset-password-button">
          Reset Password
        </button>
      </div>

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

      <div className="switch-auth-link">
        <p>Don't have an account?</p>
        <Link to="/register" className="secondary-button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
