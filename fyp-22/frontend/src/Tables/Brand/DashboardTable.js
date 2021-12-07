import React, { useState, useEffect } from "react";

import {
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
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  MenuItem,
} from "@material-ui/core";
import Formik, { useFormik } from "formik";
import Spacer from "../../UI/Spacer";
import ApiCall from "../../BackendCall";

let itemcategory = [
  { key: "10", value: "Processing" },
  { key: "20", value: "Succeed" },
  { key: "30", value: "Returned" },
];

const getdate = (value) => {
  var today = new Date(value);
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};
const gettime = (value) => {
  var today = new Date(value);
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
};

function RowData({ row, index }) {
  const [status, setstatus] = useState("");

  const handleonChange = async (value, id) => {
    console.log("value of test", value);
    setstatus(value);
    await ApiCall.post("/updatesale", { status: value, id });
    console.log("status ", status, id);
  };

  return (
    <TableRow key={row.name}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.orderid}
      </TableCell>
      <TableCell align="left">
        {" "}
        {row.products.map((item) => (
          <p>
            {" "}
            <strong>
              {`${item.name}  ,`}{" "}
              <span style={{ fontSize: "10px" }}> &#10005;</span>{" "}
              <span>{item.qty}</span>{" "}
            </strong>
          </p>
        ))}
      </TableCell>
      <TableCell align="right">{row.promoterId.pro_id}</TableCell>
      <TableCell align="right">{getdate(row.createdAt)}</TableCell>
      <TableCell align="right">{gettime(row.createdAt)}</TableCell>
      <TableCell align="right">
        <span>&#8360;</span>{" "}
        {`${row.products.reduce(
          (num1, num2) => parseFloat(num2.price.replace(/,/g, "")) + num1,
          0
        )}`}
      </TableCell>

      <TableCell align="right">
        {" "}
        <span>&#8360;</span>{" "}
        {`${Math.floor(
          (row.webid.commission *
            row.products.reduce(
              (num1, num2) => parseFloat(num2.price.replace(/,/g, "")) + num1,
              0
            )) /
            100
        )}`}
      </TableCell>
      <TableCell align="right">
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="category"
            value={status || row.status}
            onChange={(e) => handleonChange(e.target.value, row._id)}
            label="Category"
          >
            {itemcategory.map((item) => {
              return <MenuItem value={item.key}>{item.value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
}

export default function MyTable({ promoter }) {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const response = await ApiCall.get(`/salesadver`);
    setdata(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  //   console.log("test", test);

  return (
    <div style={{ marginTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }} padding="none">
                Order Number
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Promoter id
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Time
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Revenue
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="right">
                Commission
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.reverse().map((row, index) => (
              <RowData row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer space="20" />
    </div>
  );
}
