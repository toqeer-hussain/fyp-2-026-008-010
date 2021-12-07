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
import Spacer from "../UI/Spacer";

export default function MyTable({ promoter }) {
  //   console.log("test", test);
  function createData(Bname, Clicks, Conversions, Sales) {
    return { Bname, Clicks, Conversions, Sales };
  }

  const rows = [
    createData("Toqeer", "Advertiser", "6/5/2012", "Dead line course"),
    createData("Ali", "Promoter", "6/2/2018", "high Rate"),
    createData("Eclair", "Advertiser", "9/4/2012", "high Rate"),
    createData("Cupcake", "Promoter", "6/45/2022", "Dead Line"),
  ];
  return (
    <div style={{ marginTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>User ID</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Comments
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.Bname}</TableCell>
                <TableCell align="right">{row.Clicks}</TableCell>
                <TableCell align="right">{row.Conversions}</TableCell>
                <TableCell align="right">{row.Sales}</TableCell>

                <TableCell
                  align="right"
                  style={{ color: "green", fontWeight: "600" }}
                >
                  UnBlock
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
