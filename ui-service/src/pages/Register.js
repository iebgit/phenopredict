import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>

      {/* Check for string errors and render */}
      {error && typeof error === "string" && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {error && typeof error === "object" && (
        <div style={{ color: "red" }}>
          {error.email && <p>{error.email[0]}</p>}
          {error.password && <p>{error.password[0]}</p>}
        </div>
      )}
    </div>
  );
};

export default Register;
