import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // New action for loading user from storage
    loadUserFromStorage: (state, action) => {
      const { token, refreshToken, user } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      state.user = user;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  loadUserFromStorage, // Export the new action
} = authSlice.actions;

// Load user from localStorage when app starts
export const loadUserFromStorageAsync = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh");
  const user = localStorage.getItem("user");

  if (token && refreshToken && user) {
    dispatch(loadUserFromStorage({ token, refreshToken, user }));
  }
};

// Async action for user registration
export const registerUser = (credentials) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await axios.post(`${API_URL}/auth/register/`, {
      email: credentials.email,
      password: credentials.password,
    });
    dispatch(registerSuccess({ user: response.data.user }));
    return true; // Return success for the frontend
  } catch (error) {
    dispatch(
      registerFailure(
        error.response?.data?.email
          ? error.response?.data?.email[0]
          : error.response?.data?.password
          ? error.response?.data?.password[0]
          : "Registration failed"
      )
    );
    return false; // Return failure
  }
};

// Async action for user login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${API_URL}/auth/login/`, {
      email: credentials.email,
      password: credentials.password,
    });

    const { access, refresh } = response.data;
    dispatch(
      loginSuccess({
        token: access,
        refreshToken: refresh,
        user: credentials.email,
      })
    );
    localStorage.setItem("token", access); // Store access token in localStorage
    localStorage.setItem("refresh", refresh); // Store refresh token in localStorage
    localStorage.setItem("user", credentials.email); // Store user email in localStorage
  } catch (error) {
    dispatch(
      loginFailure(
        error.response?.data?.non_field_errors
          ? error.response?.data?.non_field_errors[0]
          : error.response?.data?.email[0] || error.response?.data?.password[0]
      )
    );
  }
};

// Async action for user logout
export const performLogout = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove tokens from localStorage
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  dispatch(logout());
};

export default authSlice.reducer;
