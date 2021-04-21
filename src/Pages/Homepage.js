import React, { useState } from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Rating from "@material-ui/lab/Rating";
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonIcon from "@material-ui/icons/Person";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];
  return (
    <div>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
        ></Header>{" "}
      </div>

      <Grid
        container
        direction="row"
        justify="center"
        style={{
          marginTop: 30,
          maxHeight: "calc( 100vh - 60px )",
          overflowY: "scroll",
        }}
      >
        <div style={{ width: "100%" }}></div>
        <Map center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            onclick={() => {
              setBottomState(true);
            }}
          >
            <Popup style={{ width: 120 }}>
              <Grid container direction="row" justify="center">
                <img src={Avatar} style={{ width: 40, height: 40 }}></img>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  Jane Doe
                </p>
                <Grid container direction="row">
                  <Rating value={5} style={{ fontSize: 10 }}></Rating>
                  <span style={{ fontSize: 10 }}>5.0(433) </span>
                </Grid>
                <span style={{ fontSize: 10 }}>$25 / hr</span>
              </Grid>
            </Popup>
          </Marker>
        </Map>

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
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{
            height: 60,
            background: "white",
            position: "absolute",
            zIndex: 100000000,
            bottom: 0,
          }}
        >
          <Grid item md={4} xs={4}>
            <Grid container direction="row" justify="center">
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
              style={{ color: "gray" }}
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
              style={{ color: "gray" }}
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
      </Grid>
    </div>
  );
}
