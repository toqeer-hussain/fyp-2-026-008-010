import {
  Input,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import MyButton from "../UI/MyButton";

import Border from "../UI/Border";
import Spacer from "../UI/Spacer";
import BrandStat from "../UI/BrandStat";
import Search from "../UI/Search";
import { useHistory, useLocation } from "react-router";
import Nav from "./Nav";
import { UserContext } from "../App";
import ApiCall from "../BackendCall";

let itemcategory = [
  { 10: "Clothes" },
  { 20: "Shoes" },
  { 30: "Jewlary" },
  { 40: "Electronics" },
  { 50: "Bookings" },
  { 60: "Courses" },
  { 90: "Furniture" },
];

export default function MarketPlace() {
  const [open, setopen] = useState(false);
  const [alert, setalert] = useState(false);
  const [data, setdata] = useState([]);
  const [Cat, setCat] = useState(Object.keys(itemcategory[0])[0]);
  const action = useContext(UserContext);
  const [redirectwebsite, setredirectwebsite] = useState("");

  const history = useHistory();

  const createurl = (webid) => {
    ApiCall.post("/createredirecturl", {
      webid,
    }).then((res) => {
      console.log("what is value", res.data);
      setredirectwebsite(res.data);
    });
  };

  console.log("data", data);
  const getdata = async () => {
    const response = await ApiCall.get(`/marketitem/${Cat}`);
    setdata(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getdata();
  }, [Cat]);

  return (
    <div>
      <div style={{ display: "flex", marginTop: "25px" }}>
        <div style={{ width: "15%", marginTop: "24px" }}>
          <MyButton
            fillColor="yellow"
            style={{
              fontWeight: "600",
              display: "flex",
              margin: "0px",
            }}
          >
            CATEGORIES
          </MyButton>
          {itemcategory.map((value) => {
            console.log(Object.keys(value)[0]);
            return (
              <MyButton
                fillColor={Object.keys(value)[0] == Cat ? "#28228c" : null}
                style={{
                  display: "flex",
                  color: "white",
                  margin: "0px",
                  border: "0px",
                  justifyContent: "flex-start",
                  borderBottom: "1px solid white",
                }}
                onPress={() => setCat(Object.keys(value)[0])}
              >
                {Object.values(value)[0]}
              </MyButton>
            );
          })}
        </div>
        <div style={{ flex: 1, marginRight: "40px", marginLeft: "20px" }}>
          <Search
            Heading="Brands"
            type="text"
            label="Search"
            placeholder="Search Here"
          />
          <Border space={5} />
          {data.map((item) => (
            <div>
              <Spacer space="15" />
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {item.web.brand}
              </div>
              <Spacer space="5" />
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 0.9,
                    textAlign: "justify",
                    marginRight: "25px",
                  }}
                >
                  <p>{item.web.description}</p>
                </div>

                <div style={{ flex: 0.2 }}>
                  <MyButton
                    style={{ display: "flex" }}
                    onPress={() => {
                      if (action.user == "promoter") {
                        createurl(item.web._id);
                        setopen(true);
                      } else {
                        setalert(true);
                      }
                    }}
                  >
                    Promote
                  </MyButton>
                </div>
              </div>
              <Spacer space="5" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <BrandStat first="Rank" Second={item.rank || 1} />
                <BrandStat first="Sales" Second={item.sale} />
                <BrandStat first="Conversion" Second={item.conversion} per />
                <BrandStat first="Return" Second="0" per />

                <BrandStat first="Comission" Second={item.web.commission} per />
              </div>
              <Border />
            </div>
          ))}
        </div>

        <Dialog
          open={open}
          onClose={() => setopen(false)}
          // aria-labelledby="simple-modal-title"
          // aria-describedby="simple-modal-description"
        >
          <DialogContent>
            <DialogTitle id="alert-dialog-title">
              {"Your Affiliate Link"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div
                  style={{
                    background: "#242323",
                    padding: "15px",
                    color: "white",
                  }}
                >
                  <span>{redirectwebsite}</span>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setopen(false)}
                color="primary"
              >
                Copy
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Dialog
          open={alert}
          onClose={() => setalert(false)}
          // aria-labelledby="simple-modal-title"
          // aria-describedby="simple-modal-description"
        >
          <DialogContent>
            <DialogTitle id="alert-dialog-title">
              {"Your Affiliate Link"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You have to Login as a Promoter to Promote Prodct
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setalert(false);
                  history.push("/login");
                }}
                color="primary"
              >
                Login
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
