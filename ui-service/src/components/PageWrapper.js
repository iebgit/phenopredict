// src/components/PageWrapper.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const { setIsLoading } = useLoading(); // Access loading context

  // Use an effect to trigger the loading spinner during route changes
  useEffect(() => {
    setIsLoading(true); // Show spinner on route change
    const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [location.pathname, setIsLoading]); // Listen for route changes

  return <div>{children}</div>;
};

export default PageWrapper;
