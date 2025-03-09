import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import './HeightChart.css';

// Custom Styled Components for Better UI
const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: 16,
    padding: 20,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(135deg, #f7f7f7, #ffffff)",
    maxWidth: "90%",
  },
});

const StyledButton = styled(Button)({
  borderRadius: 8,
  fontWeight: "bold",
  textTransform: "none",
  padding: "10px 20px",
  width: "100%", // Ensures button is responsive
});

const HeightChart = ({ userId }) => {
  const chartRef = useRef(null); // Canvas reference
  const chartInstanceRef = useRef(null); // Store chart instance
  const [heightData, setHeightData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState("");


  // Snackbar and Alert State
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"
  
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
        const measurements = response.data;

        // Grouping measurements by date and keeping the last measurement
        const groupedData = measurements
          .filter((item) => item.type === "Add Height")
          .reduce((acc, item) => {
            const dateKey = new Date(item.date).toISOString().split('T')[0]; // Keep consistent date format
            acc[dateKey] = item; // Keep only the last measurement for each date
            return acc;
          }, {});

        // Convert grouped data to an array and sort by date
        const aggregatedData = Object.values(groupedData)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setHeightData(aggregatedData);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    fetchData();
  }, [userId]); // Runs when userId changes

  useEffect(() => {
    if (heightData.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy existing chart before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(206, 132, 216, 0.5)");
    gradient.addColorStop(1, "rgba(136, 132, 216, 0)");

    // Create new chart
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: heightData.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: "Height (cm)",
            data: heightData.map((item) => item.measurement),
            borderColor: "#8884d8",
            backgroundColor: "rgba(136, 132, 216, 0.3)",
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: "easeInOutQuad",
        },
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Height Chart" },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Height (cm)" } },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const selected = heightData[index];
            setSelectedData(selected);
            setNewValue(selected.measurement);
            setOpen(true);
          }
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [heightData]); // Runs when heightData changes


  
  const handleUpdate = async () => {
    if (!selectedData || isNaN(newValue) || newValue === "") {
      setSnackbarMessage("Invalid input!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/measurements/${selectedData.id}`, {
        new_measurement: parseFloat(newValue),
        date: selectedData.date,
        type: "Add Height",
      });
  
      // Fetch the updated data after a successful update
      const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
      const updatedMeasurements = response.data.filter((item) => item.type === "Head Diameter");
  
      setHeightData(updatedMeasurements); // Update state to refresh chart
  
      setSnackbarMessage("Measurement updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setOpen(false);
    } catch (error) {
      console.error("Error updating measurement:", error);
      setSnackbarMessage("Failed to update the measurement.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  

  

  // ✅ Step 4: Handle Delete
  const handleDelete = async () => {
    if (!selectedData) return;

    try {
      // Send the delete request with id, date, and type in the request body
      await axios.delete(`http://localhost:5000/api/measurements/${selectedData.id}`, {
        data: {
          id: selectedData.id,
          date: selectedData.date,
          type: "Add Height", // Specify the measurement type
        }
      });

      // Update the UI by removing the deleted data from the state
      setHeightData((prevData) => prevData.filter((item) => item.id !== selectedData.id));

      setSnackbarMessage("Measurement deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting measurement:", error);
      setSnackbarMessage("Failed to delete the measurement.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };


  return (
    <div className="heightcard">
      <div className="heightcard-body">
        <h5 className="heightcard-title">Height Chart</h5>
        {heightData.length === 0 ? <p>No height data available.</p> : <canvas ref={chartRef}></canvas>}
      </div>
      {/* Snackbar for success/error alerts */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }} // Align Snackbar at the top
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
      
            {/* ✅ Step 5: Responsive MUI Dialog Box */}
            <StyledDialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
                Manage Measurement
              </DialogTitle>
              <DialogContent>
                {selectedData && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="body1"><b>Date:</b> {new Date(selectedData.date).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><b>Current Value:</b> {selectedData.measurement} cm</Typography>
                    <TextField
                      label="New Measurement"
                      type="number"
                      variant="outlined"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      fullWidth
                    />
                  </Box>
                )}
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <StyledButton onClick={handleDelete} variant="contained" color="error">Delete</StyledButton>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledButton onClick={handleUpdate} variant="contained" color="primary">Update</StyledButton>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledButton onClick={() => setOpen(false)} variant="outlined">Cancel</StyledButton>
                  </Grid>
                </Grid>
              </DialogActions>
            </StyledDialog>
          </div>
    
  );
};

export default HeightChart;
