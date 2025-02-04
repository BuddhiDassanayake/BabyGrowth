import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightButton, setHighlightButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // Scroll to the top after splash screen
      setHighlightButton(true); // Highlight the button
    }, 2000); // 2 seconds splash screen

    const highlightTimer = setTimeout(() => {
      setHighlightButton(false); // Remove highlight after animation
    }, 3000); // Highlight duration

    return () => {
      clearTimeout(timer);
      clearTimeout(highlightTimer);
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <>
      {isLoading && (
        <div className="splash-screen">
          <div className="splash-logo">
            <img src="Welcome.svg" alt="Welcome" />
          </div>
        </div>
      )}

      <div id="home" className={`home-page ${!isLoading ? "visible" : ""}`}>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <div className="Header"><img src="Welcome.svg"  alt="header"/></div>
              <p className="hero-subtitle">
                Discover a delightful way to treasure every precious moment of your baby’s journey. From first smiles to first steps, create memories that last a lifetime.
              </p>
              <button
                className={`hero-button ${highlightButton ? "highlight" : ""}`}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
            <div className="hero-image">
              <img src="img1.png" alt="Img Error !" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h4 className="features-title">Why Choose Baby Diary?</h4>
          <div className="features-grid">
            <div className="feature-box">
              <h6 className="feature-title">📈 Growth Tracking
              </h6>
              <p className="feature-description">
                Monitor your baby's height, weight, and head circumference over time.
              </p>
            </div>
            <div className="feature-box">
              <h6 className="feature-title">🎉 Milestone Tracker
              </h6>
              <p className="feature-description">
                Capture your baby's first steps, words, and other special moments.
              </p>
            </div>
            <div className="feature-box">
              <h6 className="feature-title">💉 Vaccination Reminders
              </h6>
              <p className="feature-description">
                Stay updated with immunization schedules and set reminders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="image-before-footer">
        <img
          src="Babies.svg"
          alt="Decorative Footer Illustration"
          className="footer-image"
        />
      </div>

      {/* Footer Section */}
      <footer className="footer">
        BabyGrowth 2024 © Developed by Buddhi Dassanayake
      </footer>
    </>
  );
};

export default HomePage;
