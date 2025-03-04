import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import './HeadDiameterChart.css';

const HeadDiameterChart = ({ userId }) => {
  const chartRef = useRef(null); // Canvas reference
  const chartInstanceRef = useRef(null); // Store chart instance
  const [headDiameterData, setHeadDiameterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
        const measurements = response.data;

        console.log(response.data);

        // Filter and sort data
        const filteredData = measurements
          .filter((item) => item.type === "Head Diameter")
          
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setHeadDiameterData(filteredData);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    fetchData();
  }, [userId]); // Runs when userId changes

  useEffect(() => {
    if (headDiameterData.length === 0 || !chartRef.current) return;

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
        labels: headDiameterData.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: "Head Diameter (cm)",
            data: headDiameterData.map((item) => item.measurement),
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
          title: { display: true, text: "Head Diameter Chart" },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Head Diameter (cm)" } },
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
  }, [headDiameterData]); // Runs when headDiameterData changes

  return (
    <div className="headdiametercard">
      <div className="headdiametercard-body">
        <h5 className="headdiametercard-title">Head Diameter Chart</h5>
        {headDiameterData.length === 0 ? <p>No head diameter data available.</p> : <canvas ref={chartRef}></canvas>}
      </div>
    </div>
  );
};

export default HeadDiameterChart;
