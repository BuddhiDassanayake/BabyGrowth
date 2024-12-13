import React from "react";
import "./Card.css";

const Card = ({ title, description, onAdd }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default Card;
