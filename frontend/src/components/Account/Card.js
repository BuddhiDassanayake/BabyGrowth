import React, { useState, useEffect } from "react";
import "./Card.css";

const CardComponent = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    measurement: "",
    specialNotes: "",
    type: title, // Store the card title as measurementType
  });

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
      body: JSON.stringify(formData), // Send complete form data, including measurementType
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
    <div
      className="card card-large"
    >
      <div
        className="card-header"
      >
        <div>
          <h3 className="card-title">
            {title}
          </h3>
          <p className="card-description">
            {description}
          </p>
        </div>
        <button
          className="toggle-button"
          onClick={toggleExpand}
          
        >
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <div
          className="card-body"
      
        >
          <div className="form-group" >
            <label
              htmlFor="date"
              style={{
                color: "#664254",
                marginBottom: "5px",
                display: "block",
                fontWeight: "500",
              }}
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={{
                border: "1px solid #34ccfa",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label
              htmlFor="measurement"
              style={{
                color: "#664254",
                marginBottom: "5px",
                display: "block",
                fontWeight: "500",
              }}
            >
              Measurement:
            </label>
            <input
              type="text"
              id="measurement"
              name="measurement"
              value={formData.measurement}
              onChange={handleInputChange}
              placeholder={`Enter measurement for ${title}`}
              style={{
                border: "1px solid #34ccfa",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label
              htmlFor="specialNotes"
            >
              Special Notes:
            </label>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              ></textarea>
          </div>
          <button
            className="save-button"
            onClick={handleSave}
       
          >
            Save
          </button>
        </div>
      )}
      {showMessage && (
        <div
          className="notification"
        
        >
            {title} measurement saved successfully! ✅
        </div>
      )}
    </div>
  );
};

export default CardComponent;
