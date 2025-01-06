import React, { useState } from "react";
import "./Card.css";

const CardComponent = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    measurement: "",
    specialNotes: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Send the form data to the backend
    fetch('http://localhost:5000/api/save-measurements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send form data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Saved Data:', data);
        setShowMessage(true); // Show success message
        setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
  

  return (
    <div className="card card-large" style={{ padding: "20px", margin: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", flex: "1" }}>
      <div className="card-header" style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "15px", borderBottom: "2px solid #34ccfa" }}>
        <h3 style={{ color: "#664254", margin: 0, fontSize: "1.5rem" }}>{title}</h3>
        <p style={{ color: "#664254", margin: 0, fontSize: "1rem" }}>{description}</p>
        <button 
          className="toggle-button" 
          onClick={toggleExpand} 
          style={{ backgroundColor: "#34ccfa", color: "#ffffff", alignSelf: "flex-start", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}
        >
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <div className="card-body" style={{ backgroundColor: "#fef8f8", padding: "20px", borderRadius: "10px", marginTop: "15px" }}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="date" style={{ color: "#664254", marginBottom: "5px", display: "block" }}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={{ border: "1px solid #34ccfa", borderRadius: "5px", padding: "8px", width: "100%" }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="measurement" style={{ color: "#664254", marginBottom: "5px", display: "block" }}>Measurement:</label>
            <input
              type="text"
              id="measurement"
              name="measurement"
              value={formData.measurement}
              onChange={handleInputChange}
              placeholder={`Enter measurement for ${title}`}
              style={{ border: "1px solid #34ccfa", borderRadius: "5px", padding: "8px", width: "100%" }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="specialNotes" style={{ color: "#664254", marginBottom: "5px", display: "block" }}>Special Notes:</label>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              style={{ border: "1px solid #34ccfa", borderRadius: "5px", padding: "8px", width: "100%", resize: "none", height: "80px" }}
            ></textarea>
          </div>
          <button 
            className="save-button" 
            onClick={handleSave} 
            style={{ backgroundColor: "#f76fb3", color: "#ffffff", border: "none", borderRadius: "5px", padding: "10px 15px", cursor: "pointer", width: "100%" }}
          >
            Save
          </button>
        </div>
      )}
      {showMessage && (
        <div 
          className="notification" 
          style={{ backgroundColor: "#fef8f8", color: "#664254", border: "1px solid #34ccfa", borderRadius: "5px", padding: "10px", marginTop: "10px", textAlign: "center" }}
        >
          {title} measurement saved successfully! ✅
        </div>
      )}
    </div>
  );
};

export default CardComponent;
