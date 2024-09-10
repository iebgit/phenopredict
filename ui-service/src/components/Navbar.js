import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "../redux/authSlice";
import logo from "./dna-icon.svg";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(performLogout());
    setIsMobileMenuOpen(false); // Close menu after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // If the user is logged in, redirect them to the dashboard
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="icon" /> PhenoPredict
        </Link>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          &#9776;
        </button>
        <ul className={`navbar-list ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/dashboard" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" onClick={toggleMobileMenu}>
                  Profile
                </Link>
              </li>

              <li>
                <span className="welcome-text">Welcome, {user}</span>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
