import React, { useEffect, useState } from "react";

import {
  InputAdornment,
  Paper,
  requirePropFactory,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Spacer from "../../UI/Spacer";
import ApiCall from "../../BackendCall";

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

let itemcategory = {
  10: "Processing",
  20: "Succeed",
  30: "Returned",
};

export default function MyTable({ promoter }) {
  const [data, setdata] = useState([]);
  const [cat, setcat] = useState([]);

  const getdata = async () => {
    const response = await ApiCall.get(`/sales`);
    setdata(response.data);
    console.log("ldksflksdnfhklsdnfk", response.data);
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
              <TableCell style={{ fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Brand Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Time
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Location
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
            {data.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
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
                <TableCell align="right">{row.webid.brand}</TableCell>
                <TableCell align="right">{getdate(row.createdAt)}</TableCell>
                <TableCell align="right">{gettime(row.createdAt)}</TableCell>
                <TableCell align="right">{row.track?.city}</TableCell>
                <TableCell align="right">
                  <span>&#8360;</span>{" "}
                  {`${row.products.reduce(
                    (num1, num2) =>
                      parseFloat(num2.price.replace(/,/g, "")) + num1,
                    0
                  )}`}
                </TableCell>
                <TableCell align="right">
                  <span>&#8360;</span>{" "}
                  {`${Math.floor(
                    (row.webid.commission *
                      row.products.reduce(
                        (num1, num2) =>
                          parseFloat(num2.price.replace(/,/g, "")) + num1,
                        0
                      )) /
                      100
                  )}`}
                </TableCell>
                <TableCell align="right">{itemcategory[row.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer space="20" />
    </div>
  );
}
