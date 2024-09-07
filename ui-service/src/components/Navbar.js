import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogout } from "../redux/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(performLogout());
    setIsMobileMenuOpen(false); // Close menu after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PhenoPredict
        </Link>
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          &#9776;
        </button>
        <ul className={`navbar-list ${isMobileMenuOpen ? "active" : ""}`}>
          {user ? (
            <>
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
          <li>
            <Link to="/dashboard" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
