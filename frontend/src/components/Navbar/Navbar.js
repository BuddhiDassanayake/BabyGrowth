import React, { useState } from "react";
import { FaHome, FaBell, FaUserCircle, FaBars, FaStar, FaTrophy, FaChartBar } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Menu Icon */}
        <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle Menu">
          <FaBars />
        </button>

        {/* App Title */}
        <h1 className="title">
          Baby Diary <span role="img" aria-label="baby">👶</span> <span role="img" aria-label="book">📖</span>
        </h1>

        {/* Navigation Buttons */}
        <nav className={`nav-buttons ${menuOpen ? "show" : ""}`}>
          <a href="/" className="nav-button">
            <FaHome /> Home
          </a>
          <a href="/features" className="nav-button">
            <FaStar /> Features
          </a>
          <a href="/milestones" className="nav-button">
            <FaTrophy /> Milestones
          </a>
          <a href="/charts" className="nav-button">
            <FaChartBar /> Charts
          </a>
        </nav>

        <div className="icons-container">
          {/* Notification Icon */}
          <button className="icon-button">
            <span className="badge">4</span>
            <FaBell />
          </button>

          {/* Profile Icon */}
          <button className="icon-button">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
