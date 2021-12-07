import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Spacer from "./UI/Spacer";
import ApiCall from "./BackendCall";
let rows = [];
export default function AdminBrandProfile() {
  const [data, setdata] = useState([]);
  const getdata = async () => {
    const response = await ApiCall.get("/procom");
    setdata(response.data);
    console.log("data", response.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>#</TableCell>

                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  Promoter ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Bank Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Account No
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Com Pending
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Com Recieved
                </TableCell>

                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Com Left
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.promoter.pro_id}</TableCell>
                  <TableCell align="right">{row.bankdetail.bankName}</TableCell>
                  <TableCell align="right">
                    {row.bankdetail.accountNumber}
                  </TableCell>
                  <TableCell align="right">{row.pencommission}</TableCell>
                  <TableCell align="right">{row.reccom}</TableCell>
                  <TableCell align="right">
                    {row.pencommission - row.reccom}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Spacer space="20" />
      </div>
    </div>
  );
}
