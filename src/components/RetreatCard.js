import React from "react";

const RetreatCard = ({ retreat }) => (
  <div className="retreat-card">
    <img src={retreat.image} alt={retreat.title} />
    <h2>{retreat.title}</h2>
    <p>{retreat.description}</p>
    <p>Date: {new Date(retreat.date * 1000).toLocaleDateString()}</p>
    <p>Location: {retreat.location}</p>
    <p>Price: ${retreat.price}</p>
  </div>
);

export default RetreatCard;
