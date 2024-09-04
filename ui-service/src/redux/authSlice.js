import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // <-- Import axios here

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    // API call to authenticate the user
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_SERVICE_URL}/login`,
      credentials
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export default authSlice.reducer;
