import React, { useState, useEffect } from "react";
import Border from "../UI/Border";
import Card from "../UI/Card";
import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import Spacer from "../UI/Spacer";
import Table from "../UI/Table";
import BrandTransaction from "../Tables/Brand/BrandTransaction";
import ApiCall from "../BackendCall";
const getdate = (value) => {
  console.log("what is vlaue", value);
  if (value) {
    var today = new Date(value);
    today.setDate(today.getDate() + 15);
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  } else return undefined;
};

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

export default function BdTransaction() {
  const [data, setdata] = useState({});
  const [bankdetail, setbankdetail] = useState("");
  const [bankacc, setbankacc] = useState("");
  //   console.log("test", test);
  const getdata = async () => {
    var response = await ApiCall.get("/brandtransstat");
    console.log("stat", response.data);
    setdata(response.data);
    var response = await ApiCall.get("/jvseabankdetail");
    console.log("bankdetial", response.data);
    itemcategory.map((item, index) => {
      if (item.key == response.data.bankdetail) setbankdetail(index);
    });
    setbankdetail(response.data.bankdetail);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <div style={{ flex: 1, marginLeft: "60px", marginRight: "60px" }}>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card
            Heading="Comission Sent"
            SubHeading={`RS ${data.sum || "0"}`}
            Color="green"
          />
          <Card
            Heading="Comission Pending"
            SubHeading={`RS ${data.pendingcom || "0"}`}
            Color="red"
          />
          <Card
            Heading="Next DeadLine"
            SubHeading={getdate(data.next) || "-"}
            Color="red"
          />
        </div>
        <Spacer space="10" />
        <div>
          <div>
            <strong>Bank Name : </strong>
            <span>{itemcategory[0].value}</span>
          </div>
          <Spacer space="5" />
          <div>
            <strong>Account Holder Name : </strong>
            <span>{bankdetail.ownerName}</span>
          </div>
          <Spacer space="5" />
          <strong>Bank Account Number : </strong>
          <span>{bankdetail.accountNumber}</span>
        </div>
        <Spacer space="10" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            Recent Transaction
          </div>
          <div
            style={{
              background: "green",
              color: "white",
              padding: "3px",
              alignSelf: "center",
            }}
          >
            EXPORT
          </div>
        </div>
        <Border space="5" />
        <BrandTransaction />
        <Spacer space="10" />
      </div>
    </div>
  );
}
