// components/Logo.jsx
import React from "react";
import './Logo.css'; // CSS file for animation

export default function Logo({ size = "text-3xl" }) {
  return (
    <div className={`logo-wrapper ${size}`}>
      <span className="logo-text">GetUpdates</span>
    </div>
  );
}
