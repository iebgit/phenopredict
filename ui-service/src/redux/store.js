// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"; // Import your data slice

const store = configureStore({
  reducer: {
    data: dataReducer, // Add your data slice here
  },
});

export default store;
