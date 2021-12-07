import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../Constant/Colors";
import MyButton from "../UI/MyButton";

import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../App";

import ApiCall from "../BackendCall";
import { LocalHospitalTwoTone } from "@material-ui/icons";

console.log(Colors.Primary);
export default function Nav({ login }) {
  const action = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();
  const [loggedin, setloggedin] = useState("");

  const NavHead = location.pathname.replace("/", "");

  useEffect(() => {
    setloggedin(localStorage.getItem("token"));
  });

  console.log(NavHead);
  return (
    <div
      style={{
        backgroundColor: Colors.Primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            marginLeft: "12px",
          }}
        >
          {NavHead ? (NavHead == "404" ? "JVsea" : NavHead) : "JVsea"}
        </p>
      </div>
      <div>
        {loggedin && (
          <MyButton
            fillColor="yellow"
            style={{ marginRight: "20px" }}
            onPress={() => {
              history.push("/DashBoard");
            }}
          >
            DashBoard
          </MyButton>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Link to="/Market">
          {!(NavHead == "Market") && (
            <div>
              <MyButton
                fillColor="yellow"
                style={{ marginRight: "20px" }}
                onPress={() => {
                  console.log("clicked");
                }}
              >
                Marketplace
              </MyButton>
            </div>
          )}
        </Link>
        {!action.login ? (
          <div>
            {!(NavHead == "Login" || NavHead == "admin") ? (
              <Link to="/Login">
                <MyButton style={{ marginRight: "25px" }}>Login</MyButton>
              </Link>
            ) : (
              <Link to="/Signup">
                <MyButton style={{ marginRight: "25px" }}>Sign Up</MyButton>
              </Link>
            )}
          </div>
        ) : (
          <MyButton
            style={{ marginRight: "25px" }}
            onPress={() => {
              action.setlogin(false);
              action.setadmin(false);
              localStorage.removeItem("token");

              ApiCall.defaults.headers.common["x-access-token"] = JSON.parse(
                localStorage.getItem("token")
              );
              history.replace("/");
            }}
          >
            Logout
          </MyButton>
        )}
      </div>
    </div>
  );
}
