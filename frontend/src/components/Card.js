import React, { useState } from "react";
import { Card, CardContent, Button, Snackbar, Alert, Typography } from "@mui/material";
import { Add } from "@mui/icons-material"; // Material-UI add icon
import "./Card.css";

const CardComponent = ({ title, description, onAdd }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleAddClick = () => {
    setShowMessage(true);
    // Hide the message after 3 seconds
    setTimeout(() => setShowMessage(false), 3000);
    onAdd(title);
  };

  return (
    <Card
      sx={{
        width: "300px", // Custom card width
        height: "400px", // Custom card height
        position: "relative",
        margin: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Push content to the bottom
        padding: 2,
        transition: "transform 0.3s, box-shadow 0.3s", // Smooth animation
        "&:hover": {
          transform: "scale(1.05)", // Slightly enlarge the card on hover
          boxShadow: 6, // Increase shadow intensity on hover
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: "center", // Center align text
          marginBottom: "60px", // Space above the plus button
        }}
      >
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>

      {/* Plus icon button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 2,
         
        }}
        onClick={handleAddClick}
      >
        <Add sx={{ fontSize: 30 }} />
      </Button>

      {/* Notification inside the card */}
      {showMessage && (
        <Snackbar
          open={showMessage}
          autoHideDuration={3000} // Duration for the message
          onClose={() => setShowMessage(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert onClose={() => setShowMessage(false)} severity="success" sx={{ width: "100%" }}>
            {title} added successfully!!✅
          </Alert>
        </Snackbar>
      )}
    </Card>
  );
};

export default CardComponent;
