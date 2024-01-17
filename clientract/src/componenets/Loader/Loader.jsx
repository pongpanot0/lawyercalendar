import React from "react";
import "./Loader.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
const Loader = () => {

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
