import React, { useState, useEffect } from "react";

const ClockWithColorInfo = () => {
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState("blue"); // 🟦 default color

  // 🕒 Update the time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString();

  const colors = ["blue", "red", "green", "purple", "orange", "black"];

  const clockStyle = {
    color: color,
    fontSize: "70px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "80px",
    transition: "color 0.3s ease",
  };

  const dropdownStyle = {
    fontSize: "16px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "20px",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>⏰ React Clock with Color Selector</h2>

      {/* 🕒 Time */}
      <div style={clockStyle}>{formattedTime}</div>

      {/* 🎨 Dropdown to select color */}
      <div style={{ marginTop: "30px" }}>
        <label htmlFor="color-select" style={{ marginRight: "10px" }}>
          Select Clock Color:
        </label>
        <select
          id="color-select"
          style={dropdownStyle}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Show which color is selected */}
      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        🎨 Selected Color:{" "}
        <span style={{ color: color, fontWeight: "bold" }}>{color}</span>
      </p>
    </div>
  );
};

export default ClockWithColorInfo;
