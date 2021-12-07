import React from "react";
import { useHistory } from "react-router";
import MyButton from "../UI/MyButton";
import Four0Four from "../assets/404error.png";

export default function FourOFour() {
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        style={{ marginLeft: "180px" }}
        src={Four0Four}
        alt="Girl in a jacket"
        width="1000"
        height="500"
      />
      <MyButton onPress={() => history.replace("/")}>Back To Home </MyButton>
    </div>
  );
}
