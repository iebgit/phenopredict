import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, updateEmail } from "../redux/authSlice"; // Import Redux actions
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Profile.css"; // Ensure styling is consistent with the Matrix theme

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth); // Retrieve the user and loading state from Redux
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });
  const [emailData, setEmailData] = useState({ email: user ? user.email : "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (user) {
      setEmailData({ email: user.email });
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmailData({ email: e.target.value });
  };

  // Function to handle password update via Redux
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(changePassword(passwordData)); // Unwrap to handle promise correctly
      console.log(response);
      if (response?.message === "Password updated successfully") {
        setSnackbarMessage("Password changed successfully");
        setSnackbarSeverity("success");
      } else {
        throw new Error(response?.message || "Failed to change password");
      }
    } catch (error) {
      // Handle error properly
      setSnackbarMessage(
        error.response?.data?.old_password || "Failed to change password"
      );
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true); // Always open snackbar
    }
  };

  // Function to handle email update via Redux
  //   const handleEmailSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(updateEmail(emailData))
  //       .then(() => {
  //         setSnackbarMessage("Email updated successfully");
  //         setSnackbarSeverity("success");
  //         setOpenSnackbar(true);
  //       })
  //       .catch((error) => {
  //         setSnackbarMessage(
  //           error.response?.data?.email || "Failed to update email"
  //         );
  //         setSnackbarSeverity("error");
  //         setOpenSnackbar(true);
  //       });
  //   };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile Settings</h2>

      {/* Change Password */}
      <form onSubmit={handlePasswordSubmit} className="profile-form">
        <h3 className="form-heading">Change Password</h3>
        <input
          type="password"
          name="old_password"
          value={passwordData.old_password}
          onChange={handlePasswordChange}
          placeholder="Old Password"
          className="glow-input"
        />
        <input
          type="password"
          name="new_password"
          value={passwordData.new_password}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="glow-input"
        />
        <button type="submit" className="glow-button" disabled={isLoading}>
          Change Password
        </button>
      </form>

      {/* Update Email */}
      {/* <form onSubmit={handleEmailSubmit} className="profile-form">
        <h3 className="form-heading">Update Email</h3>
        <input
          type="email"
          name="email"
          value={emailData.email}
          onChange={handleEmailChange}
          placeholder="New Email"
          className="glow-input"
        />
        <button type="submit" className="glow-button" disabled={isLoading}>
          Update Email
        </button>
      </form> */}

      {/* Snackbar for notifications */}
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

export default Profile;
