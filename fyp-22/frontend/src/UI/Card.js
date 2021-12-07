import React from "react";

export default function Card({ Heading, SubHeading, Color }) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: Color,
        flex: 1,
        marginRight: "10px",
        color: "white",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        paddingLeft: "35px",
        fontWeight: "600",
        paddingRight: "35px",
        borderRadius: "15px",
      }}
    >
      <div style={{ fontSize: "25px" }}>{Heading}</div>
      <div style={{ fontSize: "20px" }}>{SubHeading}</div>
    </div>
  );
}
