import React, { useState, useEffect } from "react";
import "./Card.css";

const CardComponent = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    user_id: 1,
    date: new Date().toISOString().split("T")[0], // Default to today's date
    weight: "",
    height: "",
    head_diameter: "",
    tooth: "",
    specialNotes: "",
  });

  // Fetch userId from localStorage and update formData
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: parseInt(storedUserId, 10),
      }));
    }
  }, []);

  const [showMessage, setShowMessage] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    fetch("http://localhost:5000/api/save-measurements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Saved Data:", data);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="card card-large">
      <div className="card-header">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="toggle-button" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          {title === "Add Weight" && (
            <div className="form-group">
              <label htmlFor="weight">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Enter weight"
              />
            </div>
          )}
          {title === "Add Height" && (
            <div className="form-group">
              <label htmlFor="height">Height (cm):</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Enter height"
              />
            </div>
          )}
          {title === "Head Diameter" && (
            <div className="form-group">
              <label htmlFor="head_diameter">Head Diameter (cm):</label>
              <input
                type="number"
                id="head_diameter"
                name="head_diameter"
                value={formData.head_diameter}
                onChange={handleInputChange}
                placeholder="Enter head diameter"
              />
            </div>
          )}
          {title === "Tooth" && (
            <div className="form-group">
              <label htmlFor="tooth">Number of Teeth:</label>
              <input
                type="number"
                id="tooth"
                name="tooth"
                value={formData.tooth}
                onChange={handleInputChange}
                placeholder="Enter number of teeth"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="specialNotes">Special Notes:</label>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
            ></textarea>
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      {showMessage && (
        <div className="notification">
          {title} measurement saved successfully! ✅
        </div>
      )}
    </div>
  );
};

export default CardComponent;
