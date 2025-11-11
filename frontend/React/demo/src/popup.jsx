import React from "react";
import "./popup.css";

function Popup({ show, message, count, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p>{message}</p>
        <p>Opened {count} times</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;


