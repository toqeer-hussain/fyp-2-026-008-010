import { useFormik } from "formik";
import React, { useState } from "react";
import MyButton from "../UI/MyButton";
import Spacer from "../UI/Spacer";
import ApiCall from "../BackendCall";
import * as Yup from "yup";
import {
  InputAdornment,
  Snackbar,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Menu,
  NativeSelect,
  Select,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  withStyles,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

let itemcategory = [
  { key: "10", value: "HBL / Konnect" },
  { key: "20", value: "Advans Micro Finance Bank LTD" },
  { key: "30", value: "Al Baraka Islamic Bank Limited" },
  { key: "40", value: "Allied Bank Limited" },
  { key: "50", value: "Apna Microfinance Bank" },
  { key: "60", value: "Askari Commercial Bank Limited" },
  { key: "70", value: "Bank Al Habib Limited" },
  { key: "80", value: "Bank Alfalah Limited" },
  { key: "90", value: "Bank of Khyber" },
  { key: "100", value: "Bank of Punjab" },
  { key: "110", value: "BankIslami Pakistan Limited" },
  { key: "120", value: "Burj Bank Limited" },
  { key: "130", value: "Citi Bank" },
  { key: "140", value: "Dubai Islamic Bank Pakistan Limited" },
  { key: "150", value: "Easypaisa / Telenor Microfinance Bank" },
  { key: "160", value: "Faysan Bank Limited" },
  { key: "170", value: "FINCA Microfinance Bank" },
  { key: "180", value: "FINJA EMI" },
  { key: "190", value: "First Women Bank" },
  { key: "200", value: "FMFB-PK / FirstPay" },
  { key: "210", value: "Habib Metropolitan Bank Limited" },
  { key: "220", value: "ICBC" },
  { key: "230", value: "JS Bank" },
  { key: "240", value: "KASB Bank Limited" },
  { key: "250", value: "Khushali Microfinance Bank" },
  { key: "260", value: "MCB Bank Limited" },
  { key: "270", value: "MCB Islamic" },
  { key: "280", value: "MCB Arif Habib Savings" },
  { key: "290", value: "Meezan Bank Limited" },
  { key: "300", value: "Mobilink Microfinance Bank Ltd / JazzCash" },
  { key: "310", value: "National Bank of Pakistan" },
  { key: "320", value: "NAYAPAY" },
  { key: "330", value: "MBP Fund Management Limited" },
  { key: "340", value: "NRST MFBL" },
  { key: "350", value: "PayMax" },
  { key: "360", value: "SadaPay" },
  { key: "370", value: "SAMBA" },
  { key: "380", value: "Silk Bank" },
  { key: "390", value: "Sindh Bank" },
  { key: "400", value: "Soneri Bank Limited" },
  { key: "410", value: "Standard Chartered Bank" },
  { key: "420", value: "Summit Bank" },
  { key: "430", value: "UBank / UPaisa" },
  { key: "440", value: "United Bank Limited" },
];
const bankvalidation = Yup.object({
  bankname: Yup.string().required(),
  ownername: Yup.string().required(),
  accountnumber: Yup.number().positive().integer().required(),
});

export default function Probankdetail() {
  const [data, setdata] = useState(null);
  const [success, setsuccess] = useState(false);
  const [text, settext] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data || {
      bankname: "10",
      ownername: "",
      accountnumber: "",
    },
    onSubmit: async (values) => {
      console.log("vlaue of formik inside");
      const response = await ApiCall.post("/bankdetail", values);
      if (response.data.updated) {
        setsuccess(true);
      } else {
        settext(true);
      }
    },
  });

  const getdata = async () => {
    const response = await ApiCall.get("/bankdetail");
    console.log("incomming data into bank detail", response);
    if (!response.data) {
      return;
    }
    setdata({
      bankname: response.data.bankName,
      ownername: response.data.ownerName,
      accountnumber: response.data.accountNumber,
    });
  };
  console.log(data);
  React.useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={success}
        autoHideDuration={2000}
        onClose={() => setsuccess(false)}
      >
        <MuiAlert variant="filled" elevation="6" severity="success">
          {text
            ? "Your Account has been create"
            : "Your Bank Detail has been updated"}
        </MuiAlert>
      </Snackbar>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "12px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Bank Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="bankname"
              value={formik.values.bankname}
              onChange={formik.handleChange}
              label="Bank Name"
            >
              {itemcategory.map((item) => {
                return <MenuItem value={item.key}>{item.value}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <Spacer space="10" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            style={{ marginRight: "12px" }}
            name="ownername"
            id="standard-basic"
            label="Account Holder"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ownername}
          />
          {formik.touched.ownername && formik.errors.ownername ? (
            <div style={{ color: "#B00020" }}>{formik.errors.ownername}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            style={{ marginRight: "12px" }}
            name="accountnumber"
            id="standard-basic"
            label="Account Number"
            variant="outlined"
            type="Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountnumber}
          />
          {formik.touched.accountnumber && formik.errors.accountnumber ? (
            <div style={{ color: "#B00020" }}>
              {formik.errors.accountnumber}
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ float: "right", marginTop: "0px", marginBottom: "10px" }}>
        <MyButton
          style={{ display: "flex" }}
          onPress={() => formik.handleSubmit()}
        >
          Update
        </MyButton>
      </div>{" "}
    </div>
  );
}
