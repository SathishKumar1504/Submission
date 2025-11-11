import React from "react";

function PopupButton({ index, count, color, onShow }) {
  return (
    <button
      onClick={() => onShow(index)}
      style={{
        padding: "10px 20px",
        backgroundColor: color || "gray",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "10px",
      }}
    >
      Show Popup {index + 1} ({count})
    </button>
  );
}

export default PopupButton;
