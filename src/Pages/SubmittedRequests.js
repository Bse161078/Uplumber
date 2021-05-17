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
import CancelIcon from "@material-ui/icons/Cancel";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";

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
          <Grid item md={3} xs={3}>
            <div
              style={{
                background: "red",
                fontSize: 10,
                borderRadius: 10,
                padding: 4,
                textAlign: "center",
                color: "white",
                cursor: "pointer",
              }}
              // onClick={() => {
              //   if (props.item === "Pending") {
              //     document.getElementById("details" + props.index).click();
              //   } else if (props.item === "Job Started") {
              //     document.getElementById("jobdetails" + props.index).click();
              //   }
              // }}
            >
              Cancel
            </div>
          </Grid>
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
        justify="center"
        style={{ padding: 10, height: "max-content", marginTop: -60 }}
      >
        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Problem</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Problem");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <p className={classes.label}>Request Service on date *</p>
          <p className={classes.labelBlack}>March 23,2021 </p>
          <p className={classes.label}>Preffered service time *</p>
          <p className={classes.labelBlack}>As soon as possible</p>

          <p className={classes.label}>What item is having problem?</p>
          <p className={classes.labelBlack}>Dishwasher</p>

          <p className={classes.label}>What service do you need ? *</p>
          <p className={classes.labelBlack}>Repair</p>

          <p className={classes.label}>Request Option *</p>
          <p className={classes.labelBlack}>Auto accept first offer</p>

          <p className={classes.label}>Any flood of water damage? *</p>
          <p className={classes.labelBlack}>Yes</p>
        </div>

        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Looking For</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Looking For");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <FormGroup row style={{ width: "100%" }}>
            {["Plumbing Tecnician", "Mould Specialist"].map((item) => {
              return (
                <FormControlLabel
                  checked={true}
                  control={
                    <Checkbox
                      icon={<CheckCircleIcon style={{ color: "#efefef" }} />}
                      checkedIcon={
                        <CheckCircleIcon style={{ color: "#1075c2" }} />
                      }
                      name="checkedH"
                    />
                  }
                  label={item}
                />
              );
            })}
          </FormGroup>
        </div>

        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Property</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Property");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <p className={classes.label}>Area *</p>
          <p className={classes.labelBlack}>Kitchen </p>
          <p className={classes.label}>Structure</p>
          <p className={classes.labelBlack}>Single Home</p>

          <p className={classes.label}>Requestor Status</p>
          <p className={classes.labelBlack}>House Owner</p>
        </div>

        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Description and Photo</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Description and Photo");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <p className={classes.label}>problem Description *</p>
          <p className={classes.labelBlack}>Leaking and flooding everywhere </p>
          <p className={classes.label}>Photos</p>
          <img src={Refrigertors} className={classes.image}></img>
        </div>

        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Inssurance</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Inssurance");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <p className={classes.label}>Company *</p>
          <p className={classes.labelBlack}>State Farm </p>
          <p className={classes.label}>Poliicy Number</p>
          <p className={classes.labelBlack}>2554667 </p>
          <p className={classes.label}>Expiry Date</p>
          <p className={classes.labelBlack}>Mar27 , 2021 </p>
          <p className={classes.label}>Deduction</p>
          <p className={classes.labelBlack}>2500 </p>
        </div>

        <div
          style={{
            width: "100%",

            background: "white",
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}
        >
          <Grid container direction="row">
            <Grid item md={11} xs={11}>
              {" "}
              <p className={classes.heading}>Contact Details</p>
            </Grid>
            <Grid item md={1} xs={1}>
              {/* <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Contact Details");
                }}
              ></EditIcon> */}
            </Grid>
          </Grid>
          <p className={classes.label}>Name *</p>
          <p className={classes.labelBlack}>Lisa Farri </p>
          <p className={classes.label}>Phone *</p>
          <p className={classes.labelBlack}>1232554667 </p>
          <p className={classes.label}>Allow U plumber to contact you</p>
          <p className={classes.labelBlack}>Yes </p>
          <p className={classes.label}>Email * </p>
          <p className={classes.labelBlack}>utis@gmail.com </p>
          <p className={classes.label}>Address * </p>
          <p className={classes.labelBlack}>2701 lockere starte </p>
          <p className={classes.label}>Unit / APT * </p>
          <p className={classes.labelBlack}>23 </p>
          <p className={classes.label}>City * </p>
          <p className={classes.labelBlack}>Islamabad </p>
          <p className={classes.label}>State * </p>
          <p className={classes.labelBlack}>California </p>
          <p className={classes.label}>Zipcode * </p>
          <p className={classes.labelBlack}>92010 </p>
        </div>
        <button
          className={classes.button}
          onClick={() => {
            // document.getElementById("requestAService/0").click();
          }}
        >
          Submit Requests
        </button>
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
          heading={
            activeTab != "Detail" ? "Submitted Requests" : "Request Details"
          }
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTab != "ReviewRequest") {
                  document.getElementById("homepage").click();
                } else {
                  setActiveTab("Contact Details");
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
          background: "#f2f2f2",
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
