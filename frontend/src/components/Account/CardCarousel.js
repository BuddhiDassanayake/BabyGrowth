import React, { useState } from "react";
import CardComponent from "../Account/Card";
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
  {
    title: "Tooth",
    description: "Record the baby's teething milestones.",
  },
];

const CardCarousel = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className="carousel"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {cardsData.map((card, index) => (
        <div key={index} onClick={() => handleCardClick(index)}>
          <CardComponent
            title={card.title}
            description={card.description}
            expanded={expandedIndex === index} // Pass the expanded state to the CardComponent
          />
        </div>
      ))}
    </div>
  );
};

export default CardCarousel;
