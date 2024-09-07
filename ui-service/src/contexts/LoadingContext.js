import React, { createContext, useContext, useState } from "react";

// Create the context
const LoadingContext = createContext();

// Hook for using the loading context
export const useLoading = () => useContext(LoadingContext);

// Provider component to wrap your app
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
