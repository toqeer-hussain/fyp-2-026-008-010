import React from "react";

export default function BoxShadow({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        boxShadow: "0 1px 9px 0px #777",
      }}
    >
      {children}
    </div>
  );
}
