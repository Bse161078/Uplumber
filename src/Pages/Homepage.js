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
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MessageIcon from "@material-ui/icons/Message";

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
export default function LoginPage(pros) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("text");

  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("NearBy");

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];

  const OfferCards = (props) => {
    var type = props.item;
    if (props.item === "Job Started") {
      type = "jobStarted";
    }
    return (
      <Paper style={{ width: "90%", padding: 10, marginBottom: 10 }}>
        <Link
          id={"details" + props.index}
          to={"/details/" + props.index}
        ></Link>
        <Link
          id={"jobdetails" + props.index}
          to={"/jobDetails/" + props.index}
        ></Link>
        <Grid container direction="row">
          <Grid item md={2} xs={2}>
            <img src={Avatar} style={{ width: 50, height: 50 }}></img>
          </Grid>
          <Grid item md={7} xs={7}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                Jane Doe
              </p>
              <Rating value={5} style={{ fontSize: 10 }}></Rating>
              <span style={{ fontSize: 10 }}>5.0(433) </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 10 }}>$25 / hr</span>
            </Grid>
          </Grid>
          <Grid item md={3} xs={3}>
            <div
              style={{
                background: props.item === "Accepted" ? "#e7f9e9" : "#e7f1f9",
                fontSize: 10,
                borderRadius: 10,
                padding: 4,
                textAlign: "center",
                color: props.item === "Accepted" ? "#23c739" : "#60a3d6",
                cursor: "pointer",
              }}
              onClick={() => {
                if (props.item === "Pending") {
                  document.getElementById("details" + props.index).click();
                } else if (props.item === "Job Started") {
                  document.getElementById("jobdetails" + props.index).click();
                }
              }}
            >
              {props.item}
            </div>
          </Grid>
        </Grid>
        <div style={{ width: "100%", border: "1px solid #f6f6f6" }}></div>
        <Grid container direction="row" justify="center">
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Date</span>
            <p style={{ fontSize: 10, margin: 0 }}>March 23 , 2021</p>
          </Grid>
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Item</span>
            <p style={{ fontSize: 10, margin: 0 }}>Dishwasher</p>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const ContactCards = () => {
    return (
      <Paper style={{ width: "90%", padding: 10, marginBottom: 10 }}>
        <Grid container direction="row">
          <Grid item md={2} xs={2}>
            <img src={Avatar} style={{ width: 50, height: 50 }}></img>
          </Grid>
          <Grid item md={9} xs={9}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                Jane Doe
              </p>
              <Rating value={5} style={{ fontSize: 10 }}></Rating>
              <span style={{ fontSize: 10 }}>5.0(433) </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 10 }}>$25 / hr</span>
            </Grid>
          </Grid>
          <Grid item md={1} xs={1}>
            <Paper
              style={{
                fontSize: 10,
                borderRadius: "50%",
                height: 25,
                width: 25,
                padding: 4,
                textAlign: "center",
                color: "#60a3d6",
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={{ height: 25 }}
              >
                <FavoriteBorderOutlinedIcon
                  style={{ fontSize: 20 }}
                ></FavoriteBorderOutlinedIcon>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ width: "100%", border: "1px solid #f6f6f6" }}></div>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={1}
          style={{ marginTop: 5 }}
        >
          <Grid item md={6} xs={6}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                background: "#f2f2f2",
                height: 35,
                width: "98%",
                borderRadius: 20,
              }}
            >
              <PhoneEnabledIcon style={{ fontSize: 18 }}></PhoneEnabledIcon>{" "}
              Call
            </Grid>
          </Grid>
          <Grid item md={6} xs={6}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                background: "#f2f2f2",
                height: 35,
                width: "98%",
                borderRadius: 20,
              }}
            >
              <MessageIcon style={{ fontSize: 18 }}></MessageIcon> Message
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <div style={{ background: "#f2f2f2" }}>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={activeTab === "NearBy" ? "Nearby Plumbers" : activeTab}
        ></Header>{" "}
      </div>

      <Grid
        container
        direction="row"
        justify="center"
        style={{
          marginTop: activeTab === "NearBy" ? 0 : 30,
          maxHeight: "calc( 100vh - 100px )",
          minHeight: "calc( 100vh - 100px )",
          overflowY: "scroll",
          // background: "gray",
        }}
      >
        <Link id={"requestAService/0"} to={"requestAService/0"}></Link>
        {/* <div style={{ width: "100%" }}></div> */}
        {activeTab === "NearBy" ? (
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
        ) : activeTab === "Offers" ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{ height: "max-content" }}
          >
            {["Accepted", "Job Started", "Pending"].map((item, index) => {
              return <OfferCards index={index} item={item}></OfferCards>;
            })}
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{ height: "max-content" }}
          >
            {[1, 3].map((item, index) => {
              return <ContactCards index={index}></ContactCards>;
            })}
          </Grid>
        )}

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
          onClose={() => toggleDrawerBottom("bottom", false)}
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
              onClick={() => {
                document.getElementById("requestAService/0").click();
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
