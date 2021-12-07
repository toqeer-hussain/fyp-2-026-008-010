import React from "react";

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
import { useEffect, useState } from "react";
import ApiCall from "../../BackendCall";

export default function MyTable({ promoter }) {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const response = await ApiCall.get(`/topbrand`);
    setdata(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  //   console.log("test", test);
  function createData(Bname, Clicks, Conversions, Sales, Return, Returnp, com) {
    return { Bname, Clicks, Conversions, Sales, Return, Returnp, com };
  }

  const rows = [
    createData("Khaadi", 25, 6, "3%", 3200, 20, "5%"),
    createData("JJ", 250, 8, "5%", 4300, 5, "2%"),
    createData("Gul Ahmad", 52, 6, "9%", 2015, 8, "9%"),
    createData("Borjan", 96, 4, "9%", 8541, 5, "2%"),
    createData("Daewoo", 85, 9, "8%", 9678, 4, "1%"),
  ];
  return (
    <div style={{ marginTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Brand Name</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Clicks
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Sales
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Conversions
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Commission
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Return
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Return %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.brand}</TableCell>
                <TableCell align="right">{row.click}</TableCell>
                <TableCell align="right">{row.sale}</TableCell>
                <TableCell align="right">{row.conversion}</TableCell>
                <TableCell align="right">
                  {" "}
                  <span>&#8360;</span> {row.commission}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <span>&#8360;</span> {row.Return || "0"}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <span>&#8360;</span> {row.com || "0"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer space="20" />
    </div>
  );
}
