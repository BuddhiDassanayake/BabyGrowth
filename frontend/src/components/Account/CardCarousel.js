import React, { useState, useEffect } from "react";
import CardComponent from "../Account/Card";
import HeightChart from "../Chart/HeightChart";
import WeightChart from "../Chart/WeightChart";
import HeadDiameterChart from "../Chart/HeadDiameterChart";
import "./CardCarousel.css";

const cardsData = [
  {
    title: "Add Weight",
    description: "Track and log the baby's weight over time.",
  },
  {
    title: "Add Height",
    description: "Monitor and record the baby's height growth.",
  },
  {
    title: "Head Diameter",
    description: "Keep track of the baby's head circumference.",
  },
];

const CardCarousel = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar slidebar">
        {cardsData.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(index)}>
            <CardComponent
              title={card.title}
              description={card.description}
              expanded={expandedIndex === index}
            />
          </div>
        ))}
      </div>
      <div className="charts">
        <h2>Growth Charts</h2>
        <div className="chart-container">
          <HeightChart userId={userId} />
          <WeightChart userId={userId} />
          <HeadDiameterChart userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;