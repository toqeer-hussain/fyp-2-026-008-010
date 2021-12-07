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
});

export default function ForgetPassword() {
  const [type, settype] = useState("advertiser");
  const [success, setsuccess] = useState(false);
  const action = useContext(UserContext);
  const history = useHistory();
  const [serverMessage, setserverMessage] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      setserverMessage({ err: "", msg: "" });
      action.setlogin(true);

      values.Role = type;

      ApiCall.post("/reset_password", values)
        .then((result) => {
          console.log(result);

          setserverMessage({ err: false, msg: result.data.message });
          setsuccess(true);
          // history.replace("DashBoard");
        })
        .catch((e) => {
          console.log("not solve data", e);
          setserverMessage({ err: true, msg: e.response.data.message });
          setsuccess(true);
        });

      // history.replace("/Dashboard");
    },
  });

  return (
    <div>
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
          <MuiAlert
            variant="filled"
            elevation="6"
            severity={!serverMessage.err ? "success" : "error"}
          >
            {serverMessage.msg}
          </MuiAlert>
        </Snackbar>
        <BoxShadow>
          <div style={{ width: "400px", padding: "40px" }}>
            <div>
              <Center>
                <h2 style={{ textDecoration: "underline" }}>Reset Pasword</h2>
              </Center>
              <Spacer space={30} />
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
                      onChange={() =>
                        settype(
                          type == "advertiser" ? "promoter" : "advertiser"
                        )
                      }
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
                      onChange={() =>
                        settype(
                          type == "advertiser" ? "promoter" : "advertiser"
                        )
                      }
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
                  formik.handleSubmit();
                }}
              >
                Submit
              </MyButton>

              <Spacer space={5} />
            </div>
          </div>
        </BoxShadow>
      </div>
    </div>
  );
}
