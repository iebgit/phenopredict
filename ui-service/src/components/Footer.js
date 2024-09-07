// src/components/Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS for the footer

const Footer = () => {
  const currentYear = new Date().getFullYear(); //
  return (
    <footer className="footer">
      <p className="footer-text">
        {" "}
        © {currentYear} PhenoPredict | All rights reserved.
      </p>
      <p className="footer-text">
        Powered by Machine Learning & Bioinformatics
      </p>
    </footer>
  );
};

export default Footer;
