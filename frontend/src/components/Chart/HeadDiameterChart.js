import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import './HeadDiameterChart.css';

const HeadDiameterChart = ({ userId }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [headDiameterData, setHeadDiameterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
        const measurements = response.data;

        console.log(response.data);

        // Grouping measurements by date and keeping the last measurement
        const groupedData = measurements
          .filter((item) => item.type === "Head Diameter")
          .reduce((acc, item) => {
            const dateKey = new Date(item.date).toISOString().split('T')[0]; // Keep consistent date format
            acc[dateKey] = item; // Keep only the last measurement for each date
            return acc;
          }, {});

        // Convert grouped data to an array and sort by date
        const aggregatedData = Object.values(groupedData)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setHeadDiameterData(aggregatedData);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (headDiameterData.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(206, 132, 216, 0.5)");
    gradient.addColorStop(1, "rgba(136, 132, 216, 0)");

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

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [headDiameterData]);

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