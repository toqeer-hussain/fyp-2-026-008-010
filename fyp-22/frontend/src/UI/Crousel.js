import React, { useState } from "react";
import r1 from "../assets/r1.PNG";
import r2 from "../assets/r2.PNG";
import r3 from "../assets/r3.PNG";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

let imagelist = [r1, r2, r3];
export default function Crousel() {
  const [image, setimage] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => {
          console.log("minus", image);
          image == 0 ? setimage(imagelist.length - 1) : setimage(image - 1);
        }}
      >
        <ArrowBackIosOutlinedIcon />
      </div>
      <img src={imagelist[image]} />
      <div
        onClick={() => {
          console.log("plus", image);
          image == 2 ? setimage(0) : setimage(image + 1);
        }}
      >
        <ArrowForwardIosOutlinedIcon />
      </div>
    </div>
  );
}
