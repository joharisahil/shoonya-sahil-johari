import React from "react";

const Filter = ({ onDateChange, onTypeChange }) => (
  <div className="filter">
    <select onChange={(e) => onDateChange(e.target.value)}>
      <option value="Filter by Date">Filter by Date</option>
      <option value="2023-2024">2023-2024</option>
      <option value="2024-2025">2024-2025</option>
      {/* Add other date options */}
    </select>
    <select onChange={(e) => onTypeChange(e.target.value)}>
      <option value="Filter by Type">Filter by Type</option>
      <option value="Yoga">Yoga</option>
      <option value="Meditation">Meditation</option>
      <option value="Detox">Detox</option>
      {/* Add other type options */}
    </select>
  </div>
);

export default Filter;
