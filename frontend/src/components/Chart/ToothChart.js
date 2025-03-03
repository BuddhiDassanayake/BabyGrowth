import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import './ToothChart.css';

const ToothChart = ({ userId }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [toothData, setToothData] = useState([]);

  // ✅ Use useCallback to memoize fetchData
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/measurements/${userId}`);
      const measurements = response.data;

      // Filter and sort data
      const filteredData = measurements
        .filter((item) => item.type === "Add Tooth")
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setToothData([...filteredData]);

      console.log("Fetched & Updated Tooth Data:", filteredData);
    } catch (error) {
      console.error("Error fetching measurements:", error);
    }
  }, [userId]); // ✅ Depend on userId

  // ✅ Now fetchData is stable and can be safely included in useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ No warning!

  useEffect(() => {
    if (toothData.length === 0 || !chartRef.current) return;

    console.log("Updating chart with new data:", toothData);

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(206, 132, 216, 0.5)");
    gradient.addColorStop(1, "rgba(136, 132, 216, 0)");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: toothData.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: "Tooth Status",
            data: toothData.map((item) => item.measurement),
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
          title: { display: true, text: "Tooth Chart" },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Tooth Status" } },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [toothData]);

  return (
    <div className="toothcard">
      <div className="toothcard-body">
        <h5 className="toothcard-title">Tooth Chart</h5>
        {toothData.length === 0 ? <p>No tooth data available.</p> : <canvas ref={chartRef}></canvas>}
      </div>
    </div>
  );
};

export default ToothChart;
