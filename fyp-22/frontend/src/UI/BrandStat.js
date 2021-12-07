import React from "react";

export default function BrandStat({ first, Second, per }) {
  return (
    <div>
      <span style={{ fontWeight: "700" }}>
        {first} {per && "%"}:{" "}
      </span>
      <span style={{ fontWeight: "700" }}>
        {Second}
        {per && "%"}
      </span>
    </div>
  );
}
