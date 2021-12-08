import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core/";
import * as Yup from "yup";
import { useFormik } from "formik";
import MyButton from "../UI/MyButton";
import ApiCall from "../BackendCall";
import MuiAlert from "@material-ui/lab/Alert";
import { InputAdornment, Snackbar } from "@material-ui/core";
const bankvalidation = Yup.object({
  bankname: Yup.string().required(),
  ownername: Yup.string().required(),
  accountnumber: Yup.number().positive().integer().required(),
});
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

export default function AdminBrand() {
  const [data, setdata] = useState(null);
  const [category, setcategory] = useState("10");
  const [accountnumber, setaccountnumber] = useState(null);
  const [text, settext] = useState(false);
  const [success, setsuccess] = useState(false);

  const handlesubmit = async () => {
    const response = await ApiCall.post("/transaction", {
      category,
      accountnumber,

      Role: "advertiser",
    });
    if (response.data.done) {
      settext(true);
      setsuccess(true);
    } else {
      setsuccess(true);
    }
    console.log(response.data);
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={success}
          autoHideDuration={2000}
          onClose={() => setsuccess(false)}
        >
          <MuiAlert variant="filled" elevation="6" severity="success">
            {text ? " Done Transcation" : "Account No not found"}
          </MuiAlert>
        </Snackbar>
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
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            label="Bank Name"
          >
            {itemcategory.map((item) => {
              return <MenuItem value={item.key}>{item.value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          style={{ marginRight: "12px" }}
          value={accountnumber}
          onChange={(e) => setaccountnumber(e.target.value)}
          name="accountnumber"
          id="standard-basic"
          label="Account Number"
          inputProps={{ type: "Number" }}
          variant="outlined"
        />
        {/* <TextField
          style={{ marginRight: "12px" }}
          value={price}
          onChange={(e) => setprice(e.target.value)}
          name="accountnumber"
          id="standard-basic"
          label="Price"
          inputProps={{ type: "Number" }}
          variant="outlined"
        /> */}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MyButton onPress={handlesubmit}>Verify</MyButton>
      </div>
    </div>
  );
}
