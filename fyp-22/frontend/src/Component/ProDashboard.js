import React, { useEffect, useState } from "react";
import MenuItem from "../UI/MenuItem";

import Card from "../UI/Card";
import Spacer from "../UI/Spacer";
import Search from "../UI/Search";
import Border from "../UI/Border";
import Table from "../UI/Table";
// import { BorderAll } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@material-ui/core";
import SideBar from "../UI/SideBar";
import ProDashboard from "../Tables/Promoter/ProDashboard";
import ProDashboard2 from "../Tables/Promoter/Dashboard2";
import { AddShoppingCart } from "@material-ui/icons";
import ApiCall from "../BackendCall";

export default function ProDashBoard() {
  const [data, setdata] = useState({});

  const getdata = async () => {
    const response = await ApiCall.get("/prostat");
    console.log("data recired", response.data);
    setdata(response.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  console.log("promoter");
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card Heading="Total Click" SubHeading={data.click} Color="green" />
          <Card
            Heading="Total Sales"
            SubHeading={data.totalsale}
            Color="green"
          />
          <Card
            Heading="Revenue(Rs)"
            SubHeading={data.revenuecount}
            Color="green"
          />
          <Card Heading="Returns" SubHeading={data.Refund} Color="red" />
          <Card
            Heading="Pen.Comissions"
            SubHeading={data.pendingcom}
            Color="red"
          />
        </div>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            Recent Sales
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
        <ProDashboard />
        <Spacer space="10" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>TOP Brands</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "Center",
              marginBottom: "5px",
            }}
          >
            <TextField
              id="standard-basic"
              Heading="Brands"
              type="text"
              style={{ marginRight: "5px" }}
              label="Search"
              placeholder="Search Here"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div
              style={{
                background: "green",
                color: "white",
                padding: "3px",
                // alignSelf: "center",
              }}
            >
              EXPORT
            </div>
          </div>
        </div>
        <Border space="4" />
        <ProDashboard2 />
      </div>
    </div>
  );
}
