import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightButton, setHighlightButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {//what i want to do as a side effect
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
          <div ><img src="babydiary.svg" alt="logo"className="splash-logo" /></div>
        </div>
      )}

      <div id="home" className={`home-page ${!isLoading ? "visible" : ""}`}>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title"><img src="babydiary.svg" alt="logo2" className="Logo2"/></h2>
             <div> <h4 className="hero-subtitle1">
                BabyDiary 
              </h4>
              <p className="hero-subtitle2">The diary for you and your baby</p>
              <p className="hero-subtitle">
                Track your baby's growth, milestones, and cherish every moment.
              </p>
              
              <button
                className={`hero-button ${highlightButton ? "highlight" : ""}`}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
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
              <h6 className="feature-title">📈 Growth Tracking</h6>
              <p className="feature-description">
                Monitor your baby's height, weight, and head circumference over time.
              </p>
            </div>
            <div className="feature-box">
              <h6 className="feature-title">🎉 Milestone Tracker</h6>
              <p className="feature-description">
                Capture your baby's first steps, words, and other special moments.
              </p>
            </div>
            <div className="feature-box">
              <h6 className="feature-title">💉 Vaccination Reminders</h6>
              <p className="feature-description">
                Stay updated with immunization schedules and set reminders.
              </p>
            </div>
          </div>
        </div>
       {/* Image After Features Section */}
<div className="image-after-features">
  <img src="Babies.svg" alt="Baby Growth Illustration" className="features-image" />
</div>
      </div>
      <div className="image-before-footer">
  <div className="sub-title-container">
    <img src="icon-statistics.svg" alt="Statistics Icon" className="static-img" />
    <h5 className="sub-title1">Statistics</h5>
  </div>
  <p className="sub-title2">Height. Weight. Head Circumference.</p>
  <p className="sub-title3">Add height,weight and head circumference,to see</p><br/><p className="sub-title4"> how your baby develops.</p>
<img src="staticss.png" alt="ss" className="ss-img"/>
</div>


<div className="sub-title-container2">
  <img src="icon-milestones.svg" alt="milstone-Icon" className="milstone-Icon"/>
  <h5 className="sub-topic1">Milestones</h5>
</div>
<p className="sub-topic2">and Achievements</p>
<p className="sub-topic3">Remember important Milestones like the first Tooth or</p><br/><p className="sub-topic4">the first smile and share it with your Friends and</p>
<br/><p className="sub-topic5">Family.</p>
<img src="img2.png" alt="img2" className="img2"/>


     
      
      {/* Footer Section */}
      <footer className="footer">
        BabyGrowth 2024 © Developed by Buddhi Dassanayake
      </footer>
    </>
  );
};

export default HomePage;
