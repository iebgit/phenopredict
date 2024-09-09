import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearError,
  resendVerificationEmail,
} from "../redux/authSlice";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./LoginRegister.css"; // Reusing the same CSS file

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Control the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Controls severity: success/error

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(registerUser({ email, password }));
    if (success) {
      setRegistrationSuccess(true);
      setSnackbarMessage(
        "Registration successful! Please check your email for verification."
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true); // Show success message in Snackbar
    }
  };

  useEffect(() => {
    if (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error);
      setOpenSnackbar(true); // Show error message in Snackbar
    }
  }, [error]);

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

  return (
    <div className="form-container">
      <h2>Register</h2>

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
          Register
        </button>
      </form>

      <button
        onClick={handleResendVerification}
        className="glow-button"
        disabled={isLoading}
      >
        Resend Verification Email
      </button>

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
        <p>Already have an account?</p>
        <Link to="/login" className="secondary-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
