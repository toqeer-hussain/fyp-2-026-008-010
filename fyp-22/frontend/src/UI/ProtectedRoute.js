import React, { useState, useEffect, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AdminDashBoard from "../Component/AdminDashboard";
import AdminTransaction from "../Component/AdminTransaction";
import BrandProfile from "../Component/BrandProfile";
import PromoterProfile from "../Component/PromoterProfile";
import BrandDashBoard from "../Component/BrandDashBoard";
import PromoterDashBoard from "../Component/ProDashboard";
import BrandTransaction from "../Component/BrandTransaction";
import ProTransaction from "../Component/ProTransaction";
import { UserContext } from "../App";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ path, redirect, ...restOfProps }) {
  const context = useContext(UserContext);
  const [Component, setcomponent] = useState("");

  useEffect(() => {
    setcomponent(callComponent());
  }, [context]);

  console.log("component", Component);
  const callComponent = (value) => {
    // console.log("context value", context.login);
    // console.log("token", JSON.parse(localStorage.getItem("token")));
    // if (JSON.parse(localStorage.getItem("token"))) context.setlogin(true);
    // console.log("login in value", context.login);
    // context.setuser(jwt_decode(JSON.parse(localStorage.getItem("token"))).Role);

    console.log("is called ", context);
    if (path == "Transaction")
      return context.login ? (
        context.user == "admin" ? (
          <AdminTransaction />
        ) : context.user == "advertiser" ? (
          <BrandTransaction />
        ) : (
          <ProTransaction />
        )
      ) : (
        <Redirect to="/404" />
      );
    else if (path == "Editing") {
      console.log("called editing");
      return context.login ? (
        context.user == "advertiser" ? (
          <BrandProfile />
        ) : (
          <PromoterProfile />
        )
      ) : (
        <Redirect to="/404" />
      );
    } else
      return context.login ? (
        context.user == "admin" ? (
          <AdminDashBoard />
        ) : context.user == "advertiser" ? (
          <BrandDashBoard />
        ) : (
          <PromoterDashBoard />
        )
      ) : (
        <Redirect to="/404" />
      );
  };

  return <Route>{Component}</Route>;
}

export default ProtectedRoute;
