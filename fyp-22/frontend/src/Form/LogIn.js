import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Snackbar,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import BoxShadow from "../UI/BoxShadow";
import Center from "../UI/Center";
import MyButton from "../UI/MyButton";
import Spacer from "../UI/Spacer";
import formik, { useFormik } from "formik";
import * as Yup from "yup";
import MuiAlert from "@material-ui/lab/Alert";
import ApiCall from "../BackendCall";

const Uservalidation = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .required(),
});

export default function LogIn() {
  const [type, settype] = useState("advertiser");
  const [success, setsuccess] = useState(false);
  const action = useContext(UserContext);
  const [token, setToken] = useState("");
  const history = useHistory();
  const [serverMessage, setserverMessage] = useState("Successfully Login");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      setsuccess(true);
      values.Role = type;
      // console.log("role", values);
      ApiCall.post("/user/login", values)
        .then((result) => {
          console.log(result);
          if (result.data.All_Input) {
            return setserverMessage(result.data.message);
          }
          if (result.data.Wrong_Detail) {
            return setserverMessage(result.data.message);
          }
          console.log("user detail", result.data);

          localStorage.setItem("token", JSON.stringify(result.data.token));
          action.setlogin(true);
          action.setadmin(false);
          history.replace("DashBoard");
        })
        .catch((e) => console.log("not solve data", e));

      // history.replace("/Dashboard");
    },
  });

  useEffect(() => {
    console.log("context value", action);
    action.setuser(type);
  }, [type]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "580px",
        border: "1px solid black",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={success}
        autoHideDuration={2000}
        onClose={() => setsuccess(false)}
      >
        <MuiAlert variant="filled" elevation="6" severity="success">
          {serverMessage}
        </MuiAlert>
      </Snackbar>
      <BoxShadow>
        <div style={{ width: "400px", padding: "40px" }}>
          <div>
            <Center>
              <h2 style={{ textDecoration: "underline" }}>SIGN IN</h2>
            </Center>
            <Spacer space={30} />
            <Center>
              <TextField
                fullWidth
                id="standard-basic"
                label="email"
                variant="outlined"
                placeholder="Enter the email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </Center>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "#B00020" }}>{formik.errors.email}</div>
            ) : null}
            <Spacer space={10} />
            <Center>
              <TextField
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="standard-basic"
                label="password"
                name="password"
                variant="outlined"
                placeholder="Enter the password"
              />
            </Center>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "#B00020" }}>{formik.errors.password}</div>
            ) : null}
            <Spacer space={10} />
            <Center>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div style={{ display: "flex" }}>
                  <input
                    style={{ marginTop: "5px" }}
                    type="radio"
                    value="advertiser"
                    checked={type == "advertiser"}
                    name="user"
                    onChange={() => settype(type == "promoter" && "advertiser")}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    <span style={{ fontWeight: "500" }}>Advertiser</span>
                    <p style={{ color: "#737070" }}>Manage Brand</p>
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    style={{ marginTop: "5px" }}
                    type="radio"
                    value="promoter"
                    checked={type == "promoter"}
                    name="user"
                    onChange={() => settype(type == "advertiser" && "promoter")}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    <span style={{ fontWeight: "500" }}>Promoter</span>
                    <p style={{ color: "#737070" }}>Promoter Brands</p>
                  </span>
                </div>
              </div>
            </Center>
            <Spacer space={5} />

            <MyButton
              style={{ display: "flex" }}
              onPress={() => {
                console.log("cliced");
                formik.handleSubmit();
              }}
            >
              SIGN IN
            </MyButton>

            <Spacer space={5} />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Link to="Reset_Password">
                <span style={{ color: "#737070" }}>Forgot password?</span>
              </Link>
              <span style={{ color: "#737070" }}>Not a member yet?</span>
            </div>
          </div>
        </div>
      </BoxShadow>
    </div>
  );
}
