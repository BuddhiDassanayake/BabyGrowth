import React from "react";
import Card from "./Card";
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
  const handleAdd = (title) => {
    alert(`${title} added successfully!`);
  };

  return (
    <div className="carousel">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          onAdd={() => handleAdd(card.title)}
        />
      ))}
    </div>
  );
};

export default CardCarousel;
