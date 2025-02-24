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
      style={{
        padding: "20px",
        margin: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "15px",
          borderBottom: "2px solid #34ccfa",
        }}
      >
        <div>
          <h3 style={{ color: "#664254", margin: 0, fontSize: "1.5rem" }}>
            {title}
          </h3>
          <p style={{ color: "#664254", margin: 0, fontSize: "1rem" }}>
            {description}
          </p>
        </div>
        <button
          className="toggle-button"
          onClick={toggleExpand}
          style={{
            backgroundColor: "#34ccfa",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "36px",
            height: "36px",
          }}
        >
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <div
          className="card-body"
          style={{
            backgroundColor: "#fef8f8",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <div className="form-group" style={{ marginBottom: "15px" }}>
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
              style={{
                color: "#664254",
                marginBottom: "5px",
                display: "block",
                fontWeight: "500",
              }}
            >
              Special Notes:
            </label>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              style={{
                border: "1px solid #34ccfa",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                resize: "none",
                fontSize: "1rem",
                height: "100px",
              }}
            ></textarea>
          </div>
          <button
            className="save-button"
            onClick={handleSave}
            style={{
              backgroundColor: "#f76fb3",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              padding: "12px 15px",
              cursor: "pointer",
              width: "100%",
              fontSize: "1.1rem",
            }}
          >
            Save
          </button>
        </div>
      )}
      {showMessage && (
        <div
          className="notification"
          style={{
            backgroundColor: "#fef8f8",
            color: "#664254",
            border: "1px solid #34ccfa",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
            {title} measurement saved successfully! ✅
        </div>
      )}
    </div>
  );
};

export default CardComponent;
