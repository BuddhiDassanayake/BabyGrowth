import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const HeightChart = ({ userId }) => {
  const chartRef = useRef(null); // Reference to the canvas element
  const [chartInstance, setChartInstance] = useState(null);
  const [heightData, setHeightData] = useState([]);

  useEffect(() => {
    // Fetch data for the specific user
    axios
      .get(`http://localhost:5000/api/measurements/${userId}`)
      .then((response) => {
        const measurements = response.data;

        // Filter the measurements to only include "Add Height" type
        const filteredData = measurements.filter(
          (item) => item.type === "Add Height"
        );

        // Sort the filtered data by date
        const sortedData = filteredData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setHeightData(sortedData); // Set the filtered and sorted data
      })
      .catch((error) => {
        console.error("Error fetching measurements:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (heightData.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create gradient for the chart
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(206, 132, 216, 0.5)");
      gradient.addColorStop(1, "rgba(136, 132, 216, 0)");

      // Create a new chart instance
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: heightData.map((item) =>
            new Date(item.date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Height (cm)",
              data: heightData.map((item) => item.measurement),
              borderColor: "#8884d8",
              backgroundColor: gradient,
              fill: true, // Enable gradient fill
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 2000, // Smooth animation duration
            easing: "easeInOutQuad", // Smooth easing
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Height Chart",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Height (cm)",
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [heightData]); // Re-run when heightData changes

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Height Chart</h5>
        {heightData.length === 0 ? (
          <p>No height data available.</p>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default HeightChart;
