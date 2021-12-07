import { useParams } from "react-router";

import ApiCall from "../BackendCall";

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

const Uservalidation = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .required(),
});

export default function NewPassword() {
  const { token } = useParams();
  const history = useHistory();
  console.log(history);
  const action = useContext(UserContext);
  const [showform, setshowform] = useState(true);
  const [serverMessage, setserverMessage] = useState({});
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    ApiCall.post(`/reset_password/${token}`).then((data) => {
      if (data.data.validToken) {
        setshowform(true);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      action.setlogin(true);
      setsuccess(true);

      ApiCall.post(`/reset_password/new_password/${token}`, values)
        .then((result) => {
          console.log(result);

          if (result.status == "200") {
            setserverMessage({ err: false, msg: result.data.message });

            history.replace("/Login");
          }
        })
        .catch((e) => {
          setserverMessage({ err: true, msg: e.response.data.message });
          setTimeout(() => {
            history.replace("/Reset_Password");
          }, 2000);
          console.log("not solve data", e.response.data.message);
        });

      //   history.replace("/Dashboard");
    },
  });

  return (
    <div>
      {showform && (
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
              open={true}
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
                    <h2 style={{ textDecoration: "underline" }}>
                      Reset Password
                    </h2>
                  </Center>
                  <Spacer space={30} />
                  <Center>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="New Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      placeholder="Enter the New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </Center>
                  {formik.touched.password && formik.errors.password ? (
                    <div style={{ color: "#B00020" }}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <Spacer space={10} />

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
      )}
    </div>
  );
}
