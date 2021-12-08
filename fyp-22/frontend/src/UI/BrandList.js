import React, { useEffect, useState } from "react";

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
import Spacer from "./Spacer";
import ApiCall from "../BackendCall";
export default function MyTable({ promoter }) {
  const [data, setdata] = useState([]);
  //   console.log("test", test);
  const getdata = async () => {
    const response = await ApiCall.get("/brandlist");
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
              <TableCell style={{ fontWeight: "bold" }}>
                {promoter ? "Promoter ID" : "Brand Name"}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Clicks
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Sales
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Conversions %
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Returns
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Returns %
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.totalclick}</TableCell>
                <TableCell align="right">{row.salecount}</TableCell>
                <TableCell align="right">
                  {row.conversion?.toFixed(2) || "0"}
                </TableCell>
                <TableCell align="right">{row.returncount}</TableCell>
                <TableCell align="right">{row.returnper || "0"}</TableCell>

                <TableCell
                  align="right"
                  style={{ color: "red", fontWeight: "600" }}
                >
                  Block
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
