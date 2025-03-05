import React, { useState, useEffect } from "react";
import CardComponent from "../Account/Card";

import "./CardCarousel.css";

const cardsData = [
  {
    title: "Head Diameter",
    description: "Keep track of the baby's head circumference.",
  },
  {
    title: "Add Weight",
    description: "Track and log the baby's weight over time.",
  },
  {
    title: "Add Height",
    description: "Monitor and record the baby's height growth.",
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
      <img src="babyGrowth.png" alt="Logoo" className="Logoo"/>
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
     
    </div>
  );
};

export default CardCarousel;