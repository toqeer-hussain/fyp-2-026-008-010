import React, { useState, useEffect } from "react";

import {
  InputAdornment,
  Paper,
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
let rows = [];

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

export default function MyTable({ promoter }) {
  //   console.log("test", test);
  const [data, setdata] = useState([]);
  //   console.log("test", test);
  const getdata = async () => {
    const response = await ApiCall.get("/brandtrans");
    console.log("what is data", response.data);
    setdata(response.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Time
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="right">
                Amount(Rs)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{getdate(row.createdAt)}</TableCell>
                <TableCell align="right">{gettime(row.createdAt)}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer space="20" />
    </div>
  );
}
