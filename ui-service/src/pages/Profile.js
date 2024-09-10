import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, updateEmail } from "../redux/authSlice"; // Import Redux actions
import MatrixSnackbar from "../components/CustomSnackbar"; // Use the global Matrix Snackbar
import "./Profile.css"; // Matrix theme CSS

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

export default Profile;
