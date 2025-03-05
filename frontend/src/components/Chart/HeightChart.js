import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import './HeightChart.css';

const HeightChart = ({ userId }) => {
  const chartRef = useRef(null); // Canvas reference
  const chartInstanceRef = useRef(null); // Store chart instance
  const [heightData, setHeightData] = useState([]);

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
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
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

  return (
    <div className="heightcard">
      <div className="heightcard-body">
        <h5 className="heightcard-title">Height Chart</h5>
        {heightData.length === 0 ? <p>No height data available.</p> : <canvas ref={chartRef}></canvas>}
      </div>
    </div>
  );
};

export default HeightChart;
