import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { loadUserFromStorageAsync } from "./redux/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import { useLoading } from "./contexts/LoadingContext"; // Use the loading context

const App = () => {
  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    // Load user from local storage
    dispatch(loadUserFromStorageAsync());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true); // Start showing the spinner when the route changes
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop showing the spinner after a brief delay
    }, 500); // Adjust delay as needed to simulate loading

    return () => clearTimeout(timeout); // Clean up timeout on route change
  }, [location, setIsLoading]);

  return (
    <>
      <LoadingSpinner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
