import React, { useState } from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Rating from "@material-ui/lab/Rating";
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ReviewCard from "../Components/ReviewCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 16,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
  },
  label: {
    width: "100%",
    color: "#aeaeae",
    margin: 0,
    fontSize: 13,
  },
  icon: {
    color: "#aeaeae",
  },
  button: {
    color: "white",
    border: "none",
    borderRadius: 15,
    width: "80%",
    background: "#1075c2",
    height: 45,
    marginTop: 20,
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("text");

  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Contacts");

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];

  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id="homepage" to="/details/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Provider Details"}
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                document.getElementById("homepage").click();
              }}
            ></ArrowBackIosIcon>
          }
          rightIcon={<div></div>}
        ></Header>{" "}
      </div>

      <Grid
        container
        direction="row"
        justify="center"
        style={{
          marginTop: 0,
          maxHeight: "calc( 100vh - 100px )",
          minHeight: "calc( 100vh - 100px )",
          overflowY: "scroll",
        }}
      >
        {" "}
        <Grid
          container
          direction="row"
          justify="center"
          style={{ height: "max-content" }}
        >
          <Grid container direction="row">
            {localStorage.getItem("reviews") &&
              JSON.parse(localStorage.getItem("reviews")).map((item) => {
                return (
                  <Grid container direction="row" justify="center">
                    {" "}
                    <Paper
                      style={{ width: "90%", marginBottom: 10, padding: 10 }}
                    >
                      <Grid container direction="row">
                        <Grid item md={2} xs={2}>
                          <img
                            src={item.customerImage || Avatar}
                            style={{ width: 50, height: 50, borderRadius: 70 }}
                          ></img>
                        </Grid>
                        <Grid item md={8} xs={8}>
                          <Grid
                            container
                            direction="row"
                            style={{ marginLeft: 5 }}
                          >
                            <p
                              style={{
                                width: "100%",
                                margin: 0,
                                fontWeight: 600,
                              }}
                            >
                              {item.customerName || "Jane Doe"}
                            </p>
                            <Rating
                              value={item.rating}
                              style={{ fontSize: 12 }}
                            ></Rating>
                            <span style={{ fontSize: 12 }}>
                              {item.rating}(
                              {
                                JSON.parse(localStorage.getItem("reviews"))
                                  .length
                              }
                              ){" "}
                            </span>
                            <div style={{ width: "100%" }}></div>
                            {/* <span style={{ fontSize: 12 }}>$25 / hr</span> */}
                            <div style={{ width: "100%" }}></div>
                            <span>{item.comment}</span>
                          </Grid>
                        </Grid>
                        <Grid item md={2} xs={2}>
                          {/* <span style={{ fontSize: 10, color: "gray" }}>
                          $25 / hr
                        </span> */}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <div className="sideBar" style={{ background: "red" }}>
          <Drawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer("bottom", false)}
          >
            <div style={{ width: "60vw" }}>
              <Sidebar></Sidebar>
            </div>
          </Drawer>
        </div>
        <Drawer
          anchor={"bottom"}
          open={bottomState}
          onClose={toggleDrawerBottom("bottom", false)}
        >
          <Grid
            container
            direction="row"
            justify="center"
            // alignItems="center"
            style={{ height: 120 }}
          >
            <button
              className={classes.button}
              onClick={() => {
                setBottomState(false);
              }}
            >
              Send Offer
            </button>
          </Grid>
        </Drawer>
        <Paper
          style={{
            height: 60,
            background: "white",
            position: "absolute",
            zIndex: 100000000,
            bottom: 0,
            width: "100vw",
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{
              height: 60,
            }}
          >
            <Grid item md={4} xs={4}>
              <Grid
                container
                direction="row"
                justify="center"
                style={{ color: activeTab === "NearBy" ? "black" : "gray" }}
                onClick={() => {
                  setActiveTab("NearBy");
                }}
              >
                <ExploreIcon></ExploreIcon>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  NearBy
                </p>
              </Grid>
            </Grid>
            <Grid item md={4} xs={4}>
              <Grid
                container
                direction="row"
                justify="center"
                style={{ color: activeTab === "Offers" ? "black" : "gray" }}
                onClick={() => {
                  setActiveTab("Offers");
                }}
              >
                {" "}
                <MonetizationOnIcon></MonetizationOnIcon>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  Offers
                </p>
              </Grid>
            </Grid>
            <Grid item md={4} xs={4}>
              <Grid
                container
                direction="row"
                justify="center"
                style={{ color: activeTab === "Contacts" ? "black" : "gray" }}
                onClick={() => {
                  setActiveTab("Contacts");
                }}
              >
                <PersonIcon></PersonIcon>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  Contacts
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
