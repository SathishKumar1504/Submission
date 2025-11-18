// src/components/shared/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ size = 32 }) {
  const style = {
    width: size,
    height: size,
    border: "4px solid #ddd",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  };

  return (
    <>
      <div style={style} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
    </>
  );
}
