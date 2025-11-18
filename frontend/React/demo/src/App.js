import React, { useState } from "react";
import Popup from "./popup.jsx";
import PopupButton from "./PopupButton.jsx";
import ThreeButtons from "./components/ThreeButtons/ThreeButtons";  // ✅ ADD THIS
import "./App.css";

function App() {
  const [popups, setPopups] = useState([
    { show: false, count: 0, color: "green", message: "👋 Hello from Popup 1" },
    { show: false, count: 0, color: "orange", message: "✅ Welcome to Popup 2" },
    { show: false, count: 0, color: "blue", message: " Popup 3" }
  ]);

  const handleShow = (index) => {
    const updated = [...popups];
    updated[index].show = true;
    updated[index].count += 1;
    setPopups(updated);
  };

  const handleClose = (index) => {
    const updated = [...popups];
    updated[index].show = false;
    setPopups(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Popup Example </h2>

      {/* ⭐ Display Three Buttons on UI */}
      <ThreeButtons />

      {/* Render popup buttons */}
      {popups.map((popup, index) => (
        <PopupButton
          key={index}
          index={index}
          count={popup.count}
          color={popup.color}
          onShow={handleShow}
        />
      ))}

      {/* Render popups */}
      {popups.map((popup, index) => (
        <Popup
          key={index}
          show={popup.show}
          message={popup.message}
          count={popup.count}
          onClose={() => handleClose(index)}
        />
      ))}
    </div>
  );
}

export default App;
