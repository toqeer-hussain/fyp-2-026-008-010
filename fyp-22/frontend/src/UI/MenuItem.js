import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({
  Icon,
  subheading,
  nothead,
  active,
  onPress,
}) {
  const nav = () => {
    console.log("called", subheading);
    onPress(subheading);
    // return subheading;
  };

  return (
    <div
      // onClick={nav}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        background: active && "#242333",
      }}
    >
      <Link to={!nothead && subheading} style={{ textDecoration: "none" }}>
        <Icon
          fontSize="large"
          co
          style={{ fontSize: "40px", color: active ? "white " : "#242333" }}
        />
      </Link>
      <span style={{ fontSize: "13px", color: active ? "white" : "black" }}>
        {subheading}
      </span>
    </div>
  );
}
