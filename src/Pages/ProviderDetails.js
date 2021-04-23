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
import { Link, withRouter } from "react-router-dom";

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
function ProviderDetail(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [offerAccepted, setOfferAccepted] = useState(false);
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
  console.log("THis is great", props);
  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
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
        {/* props.match.params.jobType === "jobStarted" ? (
          <Grid
            container
            direction="row"
            justify="center"
            spacing={1}
            style={{
              background: "#1075c2",
              height: "max-content",
              position: "absolute",
            }}
          >
            {" "}
            <p style={{ color: "white", width: "100%", textAlign: "center" }}>
              Job Started
            </p>
          </Grid>
        ) : */}{" "}
        {offerAccepted ? (
          <Grid
            container
            direction="row"
            justify="center"
            spacing={1}
            style={{
              background: "#10c228",
              height: "max-content",
              position: "absolute",
            }}
          >
            {" "}
            <p style={{ color: "white", width: "100%", textAlign: "center" }}>
              You Accepted this offer
            </p>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            spacing={1}
            style={{
              background: "rgba(0,0,0,0.8)",
              height: "max-content",
              position: "absolute",
            }}
          >
            <p style={{ color: "white", width: "100%", marginLeft: 10 }}>
              Would you like to accept this offer?
            </p>
            <Grid item md={6} xs={6}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                  background: "#ff0000",
                  height: 35,
                  width: "98%",
                  borderRadius: 20,
                  color: "white",
                  fontSize: 12,
                }}
              >
                Cancel
              </Grid>
            </Grid>
            <Grid item md={6} xs={6}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                  background: "#10c228",
                  height: 35,
                  width: "98%",
                  borderRadius: 20,
                  color: "white",
                  fontSize: 12,
                }}
                onClick={() => {
                  setOfferAccepted(true);
                }}
              >
                Accept
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          direction="row"
          justify="center"
          style={{ height: "max-content" }}
        >
          <img
            src={Avatar}
            style={{
              width: 125,
              height: 125,
              borderRadius: 100,
              marginTop: 120,
            }}
          ></img>
          <Grid container direction="row" justify="center">
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
            <Rating value={5} style={{ fontSize: 10 }}></Rating>
            <span style={{ fontSize: 10 }}>5.0(433) </span>
            <div style={{ width: "100%" }}></div>
            <span style={{ fontSize: 10 }}>$25 / hr</span>
          </Grid>
          <div
            style={{ width: "100%", border: "1px solid #f6f6f6", margin: 20 }}
          ></div>
          <Grid
            container
            direction="row"
            justify="center"
            style={{ padding: 20, paddingTop: 0 }}
          >
            <Grid item md={6} xs={6}>
              <span style={{ color: "#60a3d6", fontSize: 10 }}>Date</span>
              <p style={{ fontSize: 10, margin: 0 }}>March 23 , 2021</p>
            </Grid>
            <Grid item md={6} xs={6}>
              <span style={{ color: "#60a3d6", fontSize: 10 }}>Item</span>
              <p style={{ fontSize: 10, margin: 0 }}>Dishwasher</p>
            </Grid>
            <Grid item md={6} xs={6}>
              <span style={{ color: "#60a3d6", fontSize: 10 }}>
                Estimated Distance
              </span>
              <p style={{ fontSize: 10, margin: 0 }}>5 miles</p>
            </Grid>
            <Grid item md={6} xs={6}>
              <span style={{ color: "#60a3d6", fontSize: 10 }}>
                Estimated Travel Time
              </span>
              <p style={{ fontSize: 10, margin: 0 }}>5 minutes</p>
            </Grid>
          </Grid>
          <div
            style={{ width: "100%", border: "1px solid #f6f6f6", margin: 20 }}
          ></div>
          <Grid container direction="row" justify="center">
            <Grid item md={8} xs={8}>
              {" "}
              <p
                style={{
                  margin: 0,
                  marginBottom: 10,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                Jane Doe
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <p
                style={{
                  margin: 0,
                  marginBottom: 10,
                  marginLeft: 10,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById("reviews").click();
                }}
              >
                All Reviews
              </p>
            </Grid>
          </Grid>
          <Grid container direction="row">
            {[1, 2, 3].map((item) => {
              return (
                <Grid container direction="row" justify="center">
                  {" "}
                  <Paper
                    style={{ width: "90%", marginBottom: 10, padding: 10 }}
                  >
                    <Grid container direction="row">
                      <Grid item md={2} xs={2}>
                        <img
                          src={Avatar}
                          style={{ width: 50, height: 50 }}
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
                            Jane Doe
                          </p>
                          <Rating value={5} style={{ fontSize: 12 }}></Rating>
                          <span style={{ fontSize: 12 }}>5.0(433) </span>
                          <div style={{ width: "100%" }}></div>
                          <span style={{ fontSize: 12 }}>$25 / hr</span>
                          <span>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                          </span>
                        </Grid>
                      </Grid>
                      <Grid item md={2} xs={2}>
                        <span style={{ fontSize: 10, color: "gray" }}>
                          $25 / hr
                        </span>
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
export default withRouter(ProviderDetail);
