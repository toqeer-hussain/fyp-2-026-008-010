import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Menu,
  NativeSelect,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

import Border from "../UI/Border";
import Card from "../UI/Card";
// import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import Spacer from "../UI/Spacer";
import BrandProfileComponent from "./BrandProfileComponent";

import BdProfile from "./PromoterProfile";
import Bdbank from "./Probankdetail";

export default function BrandProfile() {
  //   const classes = useStyles();

  console.log("it is brandprofile");
  const [cat, setcat] = React.useState(10);
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <BdProfile />

        <BrandProfileComponent />
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>Bank Detail</div>
        <Border space="5" />
        <Spacer space="10" />
        <Bdbank />
      </div>
    </div>
  );
}
