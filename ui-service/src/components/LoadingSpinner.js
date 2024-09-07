import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "../contexts/LoadingContext"; // Assuming you have a loading context
import "./LoadingSpinner.css"; // Matrix-style CSS

const LoadingSpinner = () => {
  const { isLoading } = useLoading(); // Get loading status from context or global state

  if (!isLoading) return null; // Don't render spinner if not loading

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
