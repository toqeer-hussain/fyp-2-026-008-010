import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
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
  const action = useContext(UserContext);
  const history = useHistory();

  const [type, settype] = useState("advertiser");
  const [success, setsuccess] = useState(false);

  const [token, setToken] = useState("");

  const [serverMessage, setserverMessage] = useState("Successfully Login");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      values.Role = "admin";
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
          action.setlogin(result.data.token);
          action.setadmin(true);
          history.replace("/DashBoard");
        })
        .catch((e) => console.log("not solve data", e));

      // history.replace("/Dashboard");
    },
  });

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
                label="Email"
                name="email"
                variant="outlined"
                placeholder="Enter the email"
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
                value={formik.values.Password}
                id="standard-basic"
                label="Password"
                name="password"
                variant="outlined"
                placeholder="Enter the password"
              />
            </Center>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "#B00020" }}>{formik.errors.password}</div>
            ) : null}
            <Spacer space={10} />

            <Spacer space={5} />

            <MyButton
              style={{ display: "flex" }}
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              SIGN IN
            </MyButton>

            <Spacer space={5} />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <span style={{ color: "#737070" }}>Forgot Password?</span>
            </div>
          </div>
        </div>
      </BoxShadow>
    </div>
  );
}
