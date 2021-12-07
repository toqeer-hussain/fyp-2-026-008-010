import { InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
export default function Search({ Heading, ...props }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",

        // borderBottom: "5px solid black",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: "25px" }}>{Heading}</span>

      <div style={{ marginBottom: "5px" }}>
        <TextField
          id="standard-basic"
          {...props}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}
