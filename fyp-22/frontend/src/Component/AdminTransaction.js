import React, { useEffect, useState } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core/";
import Formik, { useFormik } from "formik";
import Border from "../UI/Border";
import Card from "../UI/Card";
import Spacer from "../UI/Spacer";
import MyButton from "../UI/MyButton";
import ApiCall from "../BackendCall";
// import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import * as Yup from "yup";
import AdminBrand from "./AdminBrand";
import AdminPromoter from "./AdminPromoter";
import AdminBank from "./AdminBank";
const websitvalidation = Yup.object({
  brand: Yup.string().required(),
  description: Yup.string().required(),
  domain: Yup.string().required().url(),
  category: Yup.string().required(),
  commission: Yup.number().required(),
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

// import { TextField } from "@material-ui/icons";

export default function AdminTransaction() {
  const [data, setdata] = useState({});
  const getdata = async () => {
    const response = await ApiCall.get("/admintransscreen");
    console.log("recieved", response.data);
    setdata(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: data || {
  //     bankname: "",
  //     commission: "",
  //     description: "",
  //     category: "10",
  //     domain: "",
  //   },
  //   validationSchema: websitvalidation,
  //   onSubmit: (values) => {
  //     console.log("vlaue of formik inside");
  //     ApiCall.post("/website", values).then((result) => {});
  //   },
  // });

  const [status, setstatus] = useState("Pending");
  const [success, setsuccess] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card
            Heading="Total Transactions"
            SubHeading={data.totaltrans}
            Color="green"
          />
          <Card
            Heading="Amount Sent by Advertise"
            SubHeading={data.brandcom}
            Color="green"
          />
          <Card
            Heading="Amount Sent to promoter"
            SubHeading={data.promotercom}
            Color="red"
          />
        </div>
        <Spacer space="10"></Spacer>
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>

        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          Administrator Bank Details
        </div>
        <Border space="5" />
        <Spacer space="10" />
        <AdminBank />
        <Spacer space="20" />
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          Verify Advertiser Transaction
        </div>
        <Border space="5" />
        <Spacer space="10" />
        <AdminBrand />

        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          Verify Promoter Transaction
        </div>
        <Border space="5" />
        <Spacer space="10" />
        <AdminPromoter />
      </div>
    </div>
  );
}
