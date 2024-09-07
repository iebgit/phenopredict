// src/components/LoadingSpinner.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingSpinner.css"; // Create this CSS file for Matrix styling

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    setLoading(true); // Start loading when route changes
    const timeout = setTimeout(() => {
      setLoading(false); // Stop loading after a brief delay
    }, 700);

    return () => clearTimeout(timeout); // Clear timeout if the component unmounts
  }, [location]); // Runs on location change

  if (!loading) return null; // Don't render the spinner if not loading

  return (
    <div className="matrix-loading-overlay">
      <CircularProgress
        style={{
          color: "#00ff00", // Matrix green color
          width: "80px",
          height: "80px",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
