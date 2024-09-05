import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/authSlice";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./LoginRegister.css"; // Reusing the same CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glow-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="glow-input"
        />
        <button type="submit" className="glow-button" disabled={isLoading}>
          Login
        </button>
      </form>

      {error && typeof error === "string" && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      {error && typeof error === "object" && error.email && (
        <p style={{ color: "red" }}>{error.email[0]}</p>
      )}

      {/* Add a button to navigate to the Register page */}
      <div className="switch-auth-link">
        <p>Don't have an account?</p>
        <Link to="/register" className="secondary-button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
