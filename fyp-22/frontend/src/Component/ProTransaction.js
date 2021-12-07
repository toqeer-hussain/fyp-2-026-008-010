import React, { useEffect, useState } from "react";
import Border from "../UI/Border";
import Card from "../UI/Card";
import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import Spacer from "../UI/Spacer";
import Table from "../UI/Table";

import ProTransaction from "../Tables/Brand/BrandTransaction";
// import ProDashBoard from "./ProDashboard";

import ApiCall from "../BackendCall";
const getdate = (value) => {
  console.log("what is vlaue", value);
  var today = new Date(value);
  today.setDate(today.getDate() + 15);
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};
export default function Transaction() {
  const [data, setdata] = useState({});
  const getdata = async () => {
    const response = await ApiCall.get("/protransstat");
    console.log("data for promote", response.data);
    setdata(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card
            Heading="Comission Recieveds (Rs)"
            SubHeading={`${data.sum}`}
            Color="green"
          />
          <Card
            Heading="Comission Pending (Rs)"
            SubHeading={`${data.pendingrevenue}`}
            Color="red"
          />
          <Card
            Heading="Next Payout"
            SubHeading={getdate(data.next)}
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
