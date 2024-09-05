import React from "react";
import "./Home.css"; // Import CSS

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">PhenoPredict</h1>

      <div className="home-features">
        <ul className="features-list">
          <li>
            Predict your <strong>appearance</strong> from your genetic data.
          </li>
          <li>
            Estimate your <strong>behavioral tendencies</strong> based on
            genetic markers.
          </li>
          <li>
            Trace your <strong>ancestry</strong> and discover your heritage.
          </li>
          <li>
            Identify potential <strong>health risks</strong> from your DNA.
          </li>
        </ul>
      </div>

      <div className="call-to-action">
        <a href="/register" className="glow-button">
          Get Started
        </a>
        <a href="/login" className="secondary-button">
          Log In
        </a>
      </div>
    </div>
  );
};

export default Home;
