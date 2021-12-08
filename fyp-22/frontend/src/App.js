import "./App.css";
import React, { createContext, useContext, useState, useEffect } from "react";
import MyButton from "./UI/MyButton";
import Nav from "./Component/Nav";
import LogIn from "./Form/LogIn";
import Signup from "./Form/Sigup";
import MarketPlace from "./Component/MarketPlace";
import BrandDashBoard from "./Component/BrandDashBoard";
import PromoterDashBoard from "./Component/ProDashboard";
import Card from "./UI/Card";
import MenuItem from "./UI/MenuItem";
import ProTransaction from "./Component/ProTransaction";
import PromoterProfile from "./Component/ProProfile";
import AdminDashBoard from "./Component/AdminDashboard";
import AdminTransaction from "./Component/AdminTransaction";
import AdminLogin from "./Component/AdminLogin";

import NewPassword from "./Form/NewPassword";

import BrandTransaction from "./Component/BrandTransaction";
import ProProfile from "./Component/ProProfile";
import BrandProfile from "./Component/BrandProfile";
import ForgetPassword from "./Form/ForgetPassword";
import Home from "./Component/Home";
import jwt_decode from "jwt-decode";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import FourOFour from "./Component/FourOFour";
import Dashboard from "@material-ui/icons/Dashboard";
import ProtectedRoute from "./UI/ProtectedRoute";
import AdminBrandProfile from "./AdminBrandProfile";

export const UserContext = createContext();

function App() {
  const [user, setuser] = useState("advertiser");

  const [login, setlogin] = useState(false);
  const [admin, setadmin] = useState(false);

  console.log("from app", user);
  console.log("from app login", login);

  const callComponent = (value) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("token in app", token);
    const Role = token
      ? jwt_decode(JSON.parse(localStorage.getItem("token"))).Role
      : null;
    console.log("Current Role", Role);
    if (value == "Transaction")
      return token ? (
        Role == "admin" ? (
          <AdminTransaction />
        ) : Role == "advertiser" ? (
          <BrandTransaction />
        ) : (
          <ProTransaction />
        )
      ) : (
        <Redirect to="/404" />
      );
    else if (value == "Editing") {
      console.log("called editing");
      return token ? (
        Role != "admin" ? (
          Role == "advertiser" ? (
            <BrandProfile />
          ) : (
            <PromoterProfile />
          )
        ) : (
          <Redirect to="/404" />
        )
      ) : (
        <Redirect to="/404" />
      );
    } else if (value == "Pending") {
      return token ? (
        Role == "admin" ? (
          <AdminBrandProfile />
        ) : (
          <Redirect to="/404" />
        )
      ) : (
        <Redirect to="/404" />
      );
    } else
      return token ? (
        Role == "admin" ? (
          <AdminDashBoard />
        ) : Role == "advertiser" ? (
          <BrandDashBoard />
        ) : (
          <PromoterDashBoard />
        )
      ) : (
        <Redirect to="/404" />
      );
  };

  useEffect(() => {
    setlogin(JSON.parse(localStorage.getItem("token")) ? true : false);

    let role = JSON.parse(localStorage.getItem("token"))
      ? jwt_decode(JSON.parse(localStorage.getItem("token"))).Role
      : null;
    setuser(role);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ user, setuser, setlogin, login, admin, setadmin }}
      >
        <Router>
          <Nav />
          <Switch>
            <Route path="/Market">
              <MarketPlace />
            </Route>
            <Route path="/Pending">
              <AdminBrandProfile />
            </Route>

            <Route exact path="/Reset_Password">
              <ForgetPassword />
            </Route>
            <Route exact path="/Reset_Password/:token">
              <NewPassword />
            </Route>
            <Route exact path="/admin">
              <AdminLogin />
            </Route>
            <Route exact path="/Login">
              <LogIn />
            </Route>
            <Route exact path="/Signup">
              <Signup />
            </Route>
            {/* <ProtectedRoute path="/DashBoard" />
            <ProtectedRoute path="/Transaction" />
            <ProtectedRoute path="/Editing" /> */}
            <Route path="/DashBoard">{() => callComponent("DashBoard")}</Route>
            <Route path="/Transaction">
              {() => callComponent("Transaction")}
            </Route>
            <Route path="/Editing">{() => callComponent("Editing")}</Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/404">
              <FourOFour />
            </Route>
            <Route>
              <FourOFour />
            </Route>
          </Switch>
        </Router>
        {/* <BrandProfile /> */}
        {/* <Home /> */}
        {/* <DashBoard /> */}
        {/* <ProTransaction /> */}
        {/* <BrandTransaction /> */}
        {/* Login  */}
        {/* Sign ui  */}
        {/* <ProProfile />  */}
        {/* <Card />  */}
        {/* <MenuItem /> */}
        {/* MarketPlace */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
