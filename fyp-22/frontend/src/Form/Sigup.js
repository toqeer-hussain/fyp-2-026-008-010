import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import BoxShadow from "../UI/BoxShadow";
import Center from "../UI/Center";
import MyButton from "../UI/MyButton";
import Spacer from "../UI/Spacer";
import * as Yup from "yup";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

import ApiCall from "../BackendCall";

const Uservalidation = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  name: Yup.string().min(6).max(10).required(),
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      excludeEmptyString: true,
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    })
    .required(),
});

export default function Signup() {
  const history = useHistory();
  const [type, settype] = useState("advertiser");
  const [serverMessage, setserverMessage] = useState(
    "Your Accound Has Been Created"
  );
  const [success, setsuccess] = useState(false);
  const action = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      setsuccess(true);
      // action.setlogin(true);
      setsuccess(true);
      console.log("role", type);
      values.Role = type;
      ApiCall.post("/user/register", values)
        .then((result) => {
          if (result.data.All_Input) {
            return setserverMessage(result.data.message);
          }
          if (result.data.Already_Exist) {
            return setserverMessage(result.data.message);
          }
          console.log(result.data);
          history.replace("Login");
        })
        .catch((e) => console.log("not solve data", e));
      // console.log("form values", values);

      //
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
        <div style={{ width: "370px", padding: "40px" }}>
          <div>
            <Center>
              <h2 style={{ textDecoration: "underline" }}>SIGN UP</h2>
            </Center>
            <Spacer space={30} />
            <Center>
              <TextField
                fullWidth
                id="standard-basic"
                label="Name"
                name="name"
                variant="outlined"
                placeholder="Enter the Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </Center>
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "#B00020" }}>{formik.errors.name}</div>
            ) : null}
            <Spacer space={10} />
            <Center>
              <TextField
                fullWidth
                id="standard-basic"
                label="email"
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
                type="password"
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
              onPress={() => formik.handleSubmit()}
            >
              SIGN UP
            </MyButton>
            <Spacer space={5} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "#737070" }}>Already a User? </span>
              <Spacer space={3} />
              <span style={{ color: "blue" }}> Sign in</span>
            </div>
          </div>
        </div>
      </BoxShadow>
    </div>
  );
}
