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
    refreshTokenSuccess: (state, action) => {
      state.token = action.payload.token;
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
    resendVerificationStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    resendVerificationSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    resendVerificationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
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
  loadUserFromStorage,
  resendVerificationStart,
  resendVerificationSuccess,
  resendVerificationFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  refreshTokenSuccess,
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

// Async action for resending the verification email
export const resendVerificationEmail = (email) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resend-verification/`, {
      email: email, // Make sure email is being passed here
    });
    return response.data; // return success
  } catch (error) {
    return error.response?.data || "Something went wrong"; // return error
  }
};

// Async action for resetting password
export const resetPassword = (email) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/auth/reset-password/`, { email });
  } catch (error) {
    dispatch(
      loginFailure(
        error.response?.data?.non_field_errors
          ? error.response?.data?.non_field_errors[0]
          : "Unable to reset password"
      )
    );
  }
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    const newToken = response.data.access;
    dispatch(refreshTokenSuccess({ token: newToken }));
    localStorage.setItem("token", newToken); // Save the new token in localStorage
  } catch (error) {
    console.error("Token refresh failed", error);
    dispatch(logout());
  }
};

// Change Password
export const changePassword = (passwordData) => async (dispatch, getState) => {
  const token = getState().auth.token; // Get the token from the state

  try {
    const response = await axios.post(
      `${API_URL}/auth/change-password/`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authenticated requests
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Password change failed", error.response);
    return error.response;
  }
};

// Update User Profile
export const updateUserProfile =
  (profileData) => async (dispatch, getState) => {
    const token = getState().auth.token; // Get the token from the state
    try {
      await axios.put(`${API_URL}/auth/profile/`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authenticated requests
        },
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed", error.response);
    }
  };

// Update Email
export const updateEmail = (emailData) => async (dispatch, getState) => {
  const token = getState().auth.token; // Get the token from the state
  try {
    await axios.post(`${API_URL}/auth/update-email/`, emailData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token for authenticated requests
      },
    });
    console.log("Email updated successfully");
  } catch (error) {
    console.error("Email update failed", error.response);
  }
};

export default authSlice.reducer;
