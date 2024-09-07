import React, { useState, useEffect } from "react";
import "./Home.css"; // Import the CSS for styling

const Home = () => {
  const images = [
    "/images/profile.webp",
    "/images/profile0.webp",
    "/images/profile1.webp", // Correct the image extensions if necessary
  ];

  const words = [
    "Predict Appearance",
    "Evaluate Behavior",
    "Trace Ancestry",
    "Identify Health Risks",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // State to store the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in"); // New state for fade animation

  useEffect(() => {
    // Function to update the image index every 7 seconds
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

  // Typing effect for cycling words
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setDisplayedWord((prev) => prev.slice(0, prev.length - 1));
        setTypingSpeed(100); // Speed up when deleting
      } else {
        setDisplayedWord((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150); // Slow down when typing
      }

      if (!isDeleting && displayedWord === currentWord) {
        // Wait for a second after fully typing the word
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedWord === "") {
        // Switch to the next word after deleting
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) =>
          prevIndex === words.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    const typingInterval = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [displayedWord, isDeleting, typingSpeed, currentWordIndex, words]);

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

      {/* List of features with typing effect */}
      <div className="home-features">
        <p className="features-list">
          <strong className="typed-word">{displayedWord}</strong>
        </p>
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
