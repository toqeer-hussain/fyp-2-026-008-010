import React from "react";
import Border from "../UI/Border";
import Card from "../UI/Card";
import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import Spacer from "../UI/Spacer";
import Table from "../UI/Table";

import ProTransaction from "../Tables/Brand/BrandTransaction";
// import ProDashBoard from "./ProDashboard";
export default function Transaction() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card
            Heading="Comission Recieveds"
            SubHeading=" RS 1450"
            Color="green"
          />
          <Card Heading="Comission Pending" SubHeading=" RS 140" Color="red" />
          <Card
            Heading="Next Payout"
            SubHeading=" 24th June,2021"
            Color="green"
          />
        </div>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            Recent Transaction
          </div>
          <div
            style={{
              background: "green",
              color: "white",
              padding: "3px",
              alignSelf: "center",
            }}
          >
            EXPORT
          </div>
        </div>
        <Border space="5" />
        <ProTransaction />
        <Spacer space="10" />
      </div>
    </div>
  );
}
