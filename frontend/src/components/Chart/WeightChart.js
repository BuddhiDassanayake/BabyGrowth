import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./WeightChart.css";

const WeightChart = ({ userId }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
        const measurements = response.data;

        // Filter and sort weight data
        const filteredData = measurements
          .filter((item) => item.type === "Add Weight")
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setWeightData(filteredData);
      } catch (error) {
        console.error("Error fetching weight measurements:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (weightData.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 99, 132, 0.5)");
    gradient.addColorStop(1, "rgba(255, 99, 132, 0)");

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: weightData.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: "Weight (kg)",
            data: weightData.map((item) => item.measurement),
            borderColor: "#ff6384",
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
          title: { display: true, text: "Weight Chart" },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Weight (cm)" } },
        },
      },
    });

    // Cleanup function to destroy chart on component unmount or re-render
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [weightData]);

  return (
    <div className="weightcard">
      <div className="weightcard-body">
        <h5 className="weightcard-title">Weight Chart</h5>
        {weightData.length === 0 ? <p>No weight data available.</p> : <canvas ref={chartRef}></canvas>}
      </div>
    </div>
  );
};

export default WeightChart;
