import React, { useState, useContext, useEffect } from "react";
import MenuItem from "./MenuItem";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";
import jwt_decode from "jwt-decode";

export default function SideBar() {
  // const [selected, setselected] = useState("Dashboard");
  const location = useLocation();
  const [user, setuser] = useState("");
  const selected = location.pathname.replace("/", "");
  const action = useContext(UserContext);

  console.log("user user", user);
  useEffect(() => {
    setuser(jwt_decode(JSON.parse(localStorage.getItem("token"))).name);
  }, []);

  return (
    <div
      style={{
        background: "gray",
        display: "flex",
        flexDirection: "column",
        width: "80px",
        minHeight: "568px",
      }}
    >
      <MenuItem Icon={AccountCircleIcon} nothead subheading={user} />
      <MenuItem
        Icon={DashboardIcon}
        active={selected == "Dashboard"}
        subheading="Dashboard"
        // onPress={setselected}
      />
      <MenuItem
        Icon={AttachMoneySharpIcon}
        active={selected == "Transaction"}
        subheading="Transaction"
        // onPress={setselected}
      />
      {!action.admin && (
        <MenuItem
          Icon={EditSharpIcon}
          active={selected == "Editing"}
          subheading="Editing"
          // onPress={setselected}
        />
      )}
    </div>
  );
}
