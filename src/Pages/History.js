import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  FormGroup,
  Checkbox,
  Badge,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Refrigertors from "../assets/refrigertors.png";

import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Calendar from "react-calendar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReviewCard from "../Components/ReviewCard";
const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 12,
  },
  label: {
    width: "100%",
    // color: "#aeaeae",
    color: "#1075c2",
    margin: 0,
    fontSize: 13,
    marginTop: 20,
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
  heading: {
    fontSize: 16,
    margin: 0,
    marginTop: 10,
    fontWeight: 600,
  },
  icon: { marginTop: 10, fontSize: 16, color: "#2d86c9" },
  labelBlack: {
    width: "100%",
    margin: 0,
    fontSize: 13,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
    marginTop: 5,
  },
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [calendar, setCalendar] = React.useState(false);
  const [postRequest, setPostRequest] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [activeTab, setActiveTab] = React.useState("Problem");
  const [image, setImage] = React.useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];
  console.log("THis is great", props);
  const OfferCards = (props) => {
    var type = props.item;
    if (props.item === "Job Started") {
      type = "jobStarted";
    }
    return (
      <Paper
        style={{ width: "90%", padding: 10, marginBottom: 10 }}
        onClick={() => {
          setActiveTab("Detail");
        }}
      >
        <Link
          id={"details" + props.index}
          to={"/details/" + props.index}
        ></Link>
        <Link
          id={"jobdetails" + props.index}
          to={"/jobDetails/" + props.index}
        ></Link>
        <Grid container direction="row">
          <Grid item md={8} xs={8}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                Bath Tub <BathtubIcon></BathtubIcon>
              </p>
            </Grid>
          </Grid>
          <Grid item md={3} xs={3}>
            <div
              style={{
                background: props.item === "Accepted" ? "#60a3d6" : "#60a3d6",
                fontSize: 10,
                borderRadius: 10,
                padding: 4,
                textAlign: "center",
                color: props.item === "Accepted" ? "white" : "white",
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
        <div
          style={{ width: "100%", border: "1px solid #f6f6f6", marginTop: 15 }}
        ></div>
        <Grid container direction="row" justify="center">
          <Grid item md={12} xs={12}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Date</span>
            <p style={{ fontSize: 10, margin: 0 }}>March 23 , 2021</p>
          </Grid>
          <Grid item md={12} xs={12}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Description</span>
            <p style={{ fontSize: 10, margin: 0 }}>
              Leaking and flooding everywhere
            </p>
            <img src={Refrigertors} className={classes.image}></img>
          </Grid>
          <Grid item md={8} xs={8}></Grid>
          <Grid item md={3} xs={3}></Grid>
        </Grid>
      </Paper>
    );
  };

  const MyRequests = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 10, height: "max-content", marginTop: -60 }}
      >
        <OfferCards item={"Repair"}></OfferCards>
      </Grid>
    );
  };

  const ReviewRequest = () => {
    return (
      <Grid
        container
        direction="row"
        style={{
          marginTop: -50,
          height: 60,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <Grid item md={2} xs={2}>
          <img
            src={Avatar}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          ></img>
        </Grid>
        <Grid item md={8} xs={8}>
          <Grid container direction="row">
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

        <div
          style={{ width: "100%", border: "1px solid #f6f6f6", margin: 0 }}
        ></div>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 15,
              width: "100%",
            }}
          >
            Your Review
          </p>
          <ReviewCard width="100%"></ReviewCard>
          <Grid item md={12} xs={12}>
            <Grid container direction="row" alignItems="center">
              <BathtubIcon></BathtubIcon>{" "}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 15,
                  textAlign: "center",
                }}
              >
                Bath Tub
              </p>
            </Grid>
          </Grid>
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Estimated Travel Time
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>5 minutes</p>
          </Grid>{" "}
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Service</span>
            <p style={{ fontSize: 10, margin: 0 }}>Dishwasher</p>
          </Grid>
        </Grid>
        <div
          style={{ width: "100%", border: "1px solid #f6f6f6", margin: 0 }}
        ></div>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          {" "}
          <Grid item md={12} xs={12}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Provider Phone
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>12345678</p>
          </Grid>{" "}
          <Grid item md={12} xs={12}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Provider Email
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>test@example.com</p>
          </Grid>
        </Grid>
        <div
          style={{ width: "100%", border: "1px solid #f6f6f6", margin: 0 }}
        ></div>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          {" "}
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Estimated Work Hours
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>3 hrs</p>
          </Grid>{" "}
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Estimated Completion Date
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>April 6 , 2021</p>
          </Grid>{" "}
          <Grid item md={12} xs={12}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>
              Estimated Labour Cost
            </span>
            <p style={{ fontSize: 10, margin: 0 }}>$ 63.00</p>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          <button
            className={classes.button}
            style={{ marginTop: 10 }}
            onClick={() => {
              // setBottomState(true);
            }}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              Make Copy
            </Grid>
          </button>
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={activeTab != "Detail" ? "History" : "Request Details"}
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTab === "Problem") {
                  document.getElementById("homepage").click();
                } else {
                  setActiveTab("Problem");
                }
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
          height: "max-content",
          background: activeTab === "Problem" ? "#f2f2f2" : "white",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "100vw",
              maxWidth: "100vw",
              overflow: "scroll",
              display: "flex",
              height: 70,
            }}
          ></div>
          {activeTab === "Problem" ? (
            <MyRequests></MyRequests>
          ) : (
            <ReviewRequest></ReviewRequest>
          )}
        </div>
        <div className="sideBar">
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
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
          >
            {" "}
            <p
              style={{
                fontWeight: "bold",
                fontSize: 18,

                textAlign: "center",
                width: "100%",
              }}
            >
              Rate and Review
            </p>
            <Rating style={{ fontSize: 40 }}></Rating>
            <p className={classes.label}>Write Something</p>
            <input
              className={classes.input}
              placeholder="Write Something"
              style={{ border: "none" }}
            ></input>
            <button
              className={classes.button}
              onClick={() => {
                setBottomState(false);
              }}
            >
              Submit
            </button>
          </Grid>
        </Drawer>

        <Drawer
          anchor={"bottom"}
          // open={needModifications}
          open={calendar}
          onClose={() => {
            setCalendar(false);
          }}
        >
          <Grid
            container
            direction="row"
            justify="center"
            // alignItems="center"
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
          >
            {" "}
            <p
              style={{
                fontWeight: "bold",
                fontSize: 18,

                textAlign: "center",
                width: "100%",
              }}
            >
              Select a Date
            </p>
            <Calendar></Calendar>
          </Grid>
        </Drawer>

        <Drawer
          anchor={"bottom"}
          open={postRequest}
          onClose={() => setPostRequest(false)}
        >
          <Grid container direction="row" justify="center">
            <CheckCircleIcon
              style={{ marginTop: 20, fontSize: 50, color: "#1075c2" }}
            ></CheckCircleIcon>
          </Grid>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,

              textAlign: "center",
              width: "100%",
            }}
          >
            Thank you for your submission
          </p>

          <Grid
            container
            direction="row"
            justify="center"
            // alignItems="center"
            style={{ height: 120 }}
          >
            <p
              style={{
                fontSize: 12,
                textAlign: "center",
                width: "90%",
              }}
            >
              Your service request has been submitted please wait for a request
              from plumber.
            </p>
            <p
              style={{
                color: "#358acb",
                textDecoration: "underline",
                fontSize: 12,
                textAlign: "center",
                width: "90%",
                cursor: "pointer",
              }}
            >
              View My Requests
            </p>
            <button
              className={classes.button}
              onClick={() => {
                setBottomState(false);
              }}
              onClick={() => {
                document.getElementById("homepage").click();
              }}
            >
              Continue
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(ProviderDetail);