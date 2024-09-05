import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
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
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },

    // Action to clear errors
    clearError: (state) => {
      state.error = null;
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
  clearError, // Export the clearError action
} = authSlice.actions;

// Async action for user registration
export const registerUser = (credentials) => async (dispatch) => {
  try {
    console.log(credentials);
    dispatch(registerStart());
    const response = await axios.post(`${API_URL}/auth/register/`, {
      email: credentials.email,
      password: credentials.password,
    });
    dispatch(registerSuccess({ user: response.data.user }));
  } catch (error) {
    console.log(error);
    dispatch(
      registerFailure(
        error.response?.data?.email
          ? error.response?.data?.email[0]
          : error.response?.data?.password
          ? error.response?.data?.password[0]
          : "Registration failed"
      )
    ); // Pass the full error object
  }
};

// Async action for user login
export const login = (credentials) => async (dispatch) => {
  try {
    console.log(credentials);

    dispatch(loginStart());
    const response = await axios.post(`${API_URL}/auth/login/`, {
      email: credentials.email,
      password: credentials.password,
    });

    const { access, refresh } = response.data;
    dispatch(loginSuccess({ token: access, user: credentials.email }));
    localStorage.setItem("token", access); // Store token in localStorage
  } catch (error) {
    console.log(error.response?.data);
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
  localStorage.removeItem("token"); // Remove token from localStorage
  dispatch(logout());
};

export default authSlice.reducer;
