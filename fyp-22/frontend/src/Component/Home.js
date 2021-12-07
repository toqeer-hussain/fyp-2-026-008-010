import React from "react";
import { useLocation } from "react-router";
import brand from "../assets/brand.png";
import first from "../assets/businessman.png";
import person from "../assets/person.png";
import Crousel from "../UI/Crousel";
import MyButton from "../UI/MyButton";
import Spacer from "../UI/Spacer";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <div>
        <Spacer space="10" />
        <div style={{ display: "flex" }}>
          <img src={first} style={{ objectFit: "contain" }} />
          <div style={{ marginLeft: "60px" }}>
            <Spacer space="35" />
            <div style={{ fontSize: "50px", fontWeight: "700" }}>Leading</div>
            <div style={{ fontSize: "50px", fontWeight: "700" }}>
              Affiliate Marketplace in
            </div>
            <span
              style={{
                fontSize: "50px",
                fontWeight: "700",
                borderBottom: "5px solid #e6e3e3",
              }}
            >
              Pakistan
            </span>
            <Spacer space="16" />
            <div
              style={{
                fontSize: "35px",
                fontWeight: "400",
                marginRight: "60px",
              }}
            >
              A place where brand can grow their business & a promoter can earn
              money
            </div>
          </div>
        </div>
      </div>
      <MyButton style={{ display: "flex", margin: "0px", fontWeight: "600" }}>
        OUR EXCELLENCE
      </MyButton>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "700", fontSize: "25px" }}>BRANDS</div>
          <div
            style={{ fontWeight: "600", fontSize: "50px", color: "#727272" }}
          >
            135+
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "25px" }}>COMISSION</div>
            <div
              style={{ fontWeight: "600", fontSize: "50px", color: "#727272" }}
            >
              1,35,00000+
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "25px" }}>AFFILIATE</div>
            <div
              style={{ fontWeight: "600", fontSize: "50px", color: "#727272" }}
            >
              23,000+
            </div>
          </div>
        </div>

        {/* Become Affiliat  */}

        <div>
          <Spacer space="10" />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "10px" }}>
              <Spacer space="35" />
              <div style={{ fontSize: "63px" }}>
                Become an {""}
                <span style={{ color: "#4f2738", fontWeight: "700" }}>
                  AFFILIATE
                </span>
              </div>
              <Spacer space="10" />
              <div style={{ fontSize: "33px", marginRight: "10px" }}>
                An affiliate Promote the Products of others and earn comission
                on each sale
              </div>
              <Spacer space="10" />
              <Link to="/Signup">
                <MyButton
                  fillColor="#a70d4e"
                  style={{ color: "white", border: "2px solid white" }}
                >
                  {" "}
                  Sign up now
                </MyButton>{" "}
              </Link>
            </div>

            <img src={person} style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Brand  */}

        <div>
          <Spacer space="10" />
          <div style={{ display: "flex" }}>
            <img
              src={brand}
              style={{ objectFit: "contain", width: "628px", heihgt: "555px" }}
            />
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",

                alignItems: "flex-end",
              }}
            >
              <Spacer space="35" />
              <div style={{ fontSize: "65px" }}>
                Become an{"  "}
                {"  "}
                <span style={{ color: "#e59b00", fontWeight: "700" }}>
                  BRAND
                </span>
              </div>
              <Spacer space="10" />
              <div
                style={{
                  fontSize: "33px",
                  marginRight: "10px",
                  textAlign: "end",
                }}
              >
                A Brand Register their website so that anyone can promote their
                brand
              </div>
              <Spacer space="10" />
              <Link to="/Signup">
                <MyButton
                  fillColor="#e59b00"
                  style={{ color: "white", border: "2px solid white" }}
                >
                  {" "}
                  Sign up now
                </MyButton>{" "}
              </Link>
            </div>
          </div>
        </div>

        <MyButton style={{ display: "flex" }}>Review</MyButton>

        <div>
          <Crousel />
        </div>
        <MyButton style={{ display: "flex" }}></MyButton>
      </div>
    </div>
  );
}
