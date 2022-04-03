import React from "react";
import "./loader.css";

export const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="loader" />
      <span className="loading-text">{message ? message : "Loading..."}</span>
    </div>
  );
};
