import React from "react";

export default function Border({ space = 3 }) {
  return (
    <div
      style={{ display: "flex", height: `${space}px`, background: "black" }}
    ></div>
  );
}
