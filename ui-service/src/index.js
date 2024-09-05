import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import authReducer from "./redux/authSlice";
import { createRoot } from "react-dom/client"; // Import createRoot

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Get the root DOM element
const container = document.getElementById("root");
const root = createRoot(container); // Create a root

// Render the App using createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
