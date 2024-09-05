import React, { useState, useEffect } from "react";
import "./Home.css"; // Import the CSS for styling

const Home = () => {
  const images = [
    "/images/profile.webp",
    "/images/profile0.webp",
    "/images/profile1.webp", // Correct the image extensions if necessary
  ];

  // State to store the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in"); // New state for fade animation

  useEffect(() => {
    // Function to update the image index every 3 seconds
    const interval = setInterval(() => {
      setFadeState("fade-out"); // Start fade-out transition
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFadeState("fade-in"); // Start fade-in transition
      }, 700); // Wait for half a second to allow the fade-out animation to complete
    }, 7000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [images.length]);

  return (
    <div className="home-container">
      <h1 className="home-heading">PhenoPredict</h1>

      {/* Slideshow of predicted appearances */}
      <div className="home-image-container">
        <img
          src={images[currentImageIndex]}
          alt="Predicted Appearance"
          className={`predicted-image ${fadeState}`} // Add dynamic fade class
        />
      </div>

      {/* List of features */}
      <div className="home-features">
        <ul className="features-list">
          <li>
            Predict <strong>Appearance</strong>
          </li>
          <li>
            Evaluate <strong>Behavior</strong>
          </li>
          <li>
            Trace <strong>Ancestry</strong>
          </li>
          <li>
            Identify <strong>Health Risks</strong>
          </li>
        </ul>
      </div>

      {/* Call to action buttons */}
      <div className="call-to-action">
        <a href="/register" className="glow-button">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
