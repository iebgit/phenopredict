import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResetPasswordForm from "./pages/ResetPasswordForm"; // Import the new reset password form component
import { useDispatch } from "react-redux";
import { loadUserFromStorageAsync } from "./redux/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import { useLoading } from "./contexts/LoadingContext"; // Use the loading context

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useLoading(); // You no longer need to trigger loading on route changes

  useEffect(() => {
    // Load user from local storage
    dispatch(loadUserFromStorageAsync());
  }, [dispatch]);

  return (
    <>
      {isLoading && <LoadingSpinner />} {/* Show spinner only when loading */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/reset-password/:uidb64/:token"
          element={<ResetPasswordForm />}
        />{" "}
        {/* Add this route */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
