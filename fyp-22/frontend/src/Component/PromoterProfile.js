import React, { useState } from "react";
import { useFormik } from "formik";
import { InputAdornment, Snackbar, TextField } from "@material-ui/core";
import ApiCall from "../BackendCall";
import Spacer from "../UI/Spacer";

import Border from "../UI/Border";
import MyButton from "../UI/MyButton";
import * as Yup from "yup";
import MuiAlert from "@material-ui/lab/Alert";

const Uservalidation = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  name: Yup.string().min(6).max(10).required(),
  phonenumber: Yup.number().positive().integer(),
});
const passwordvalidation = Yup.object({
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    })
    .required(),
});

export default function PromoterProfile() {
  const [data, setdata] = useState(null);
  const [proid, setproid] = useState(null);
  const [success, setsuccess] = useState(false);
  const [password, setpassword] = useState("");

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: data || {
      name: "",
      email: "",
      phonenumber: "",
      password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: async (values) => {
      if (!password) {
        const response = await ApiCall.post("/promoterid", values);
        setsuccess(response.data.updated && true);
        console.log("updated profile", response);
      } else {
        console.log(
          "value of password",
          password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        );
        passwordvalidation
          .validate({ password })
          .then(async (status) => {
            console.log("password staus");

            console.log("what is this called");
            const response = await ApiCall.post("/promoterid", {
              ...values,
              password,
            });
            setsuccess(response.data.updated && true);
            console.log("updated profile", response);
          })
          .catch((e) => {
            console.log(e.errors[0]);
          });
      }
    },
  });
  const getdata = async () => {
    const response = await ApiCall.get("/promoterid");
    console.log("incomming data", response);
    setdata({
      name: response.data.user.name,
      email: response.data.user.email,
      phonenumber: response.data.user.phoneNumber,
    });
    setproid(response.data.pro_id);
  };
  console.log(data);

  React.useEffect(() => {
    getdata();
  }, []);

  // formik.values.name = data.user.name/;
  console.log("outside", data);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={success}
        autoHideDuration={1500}
        onClose={() => setsuccess(false)}
      >
        <MuiAlert variant="filled" elevation="6" severity="success">
          Your Profile has been updated
        </MuiAlert>
      </Snackbar>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          Personal Detail
        </div>
        <div
          style={{
            padding: "3px",
          }}
        >
          {proid}
        </div>
      </div>
      <Border space="5" />
      <Spacer space="10" />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="standard-basic"
            label="Email"
            variant="outlined"
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "#B00020" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            id="standard-basic"
            label="Name"
            variant="outlined"
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "#B00020" }}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            id="standard-basic"
            label="phonenumber"
            variant="outlined"
            name="phonenumber"
            helperText="Format 03XXXXXXXXX"
            inputProps={{ max: 11, maxlength: 11 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+92</InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
          />
          {formik.touched.phonenumber && formik.errors.phonenumber ? (
            <div style={{ color: "#B00020" }}>{formik.errors.phonenumber}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            id="standard-basic"
            label="New Password"
            variant="outlined"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            // onBlur={formik.handleBlur}
            value={password}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "0px",

          marginBottom: "10px",
        }}
      >
        <MyButton
          style={{ display: "flex" }}
          onPress={() => formik.handleSubmit()}
        >
          Update
        </MyButton>
      </div>
    </div>
  );
}
