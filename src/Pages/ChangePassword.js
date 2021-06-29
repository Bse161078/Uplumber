import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Rating from "@material-ui/lab/Rating";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import Calendar from "react-calendar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { changePassword } from "../ApiHelper";

import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "90%",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
  const [newPassword, setNewPassword] = React.useState();
  const [confirmNewPassword, setConfirmNewPassword] = React.useState();
  const [openLoader, setOpenLoader] = useState(false);

  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");

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
  // //console.log("THis is great", props);
  const notify = (data) => toast(data);
  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Link id="back" to="/settings"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Settings"}
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTab === "Problem") {
                  document.getElementById("back").click();
                } else {
                  setActiveTab("back");
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
          background: activeTab === "Problem" ? "white" : "white",
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ width: "100%", height: "max-content" }}
        >
          {/* <div
            className={classes.input}
            style={{ height: 70, marginTop: 10, paddingBottom: 10 }}
          >
            <p className={classes.label}>Current Password</p>
            <input
              className={classes.input}
              style={{ border: "none" }}
              type={type}
            ></input>
            {type === "text" ? (
              <VisibilityOffOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setType("password");
                }}
              ></VisibilityOffOutlinedIcon>
            ) : (
              <VisibilityOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setType("text");
                }}
              ></VisibilityOutlinedIcon>
            )}
          </div>
          */}
          <div
            className={classes.input}
            style={{ height: 70, marginTop: 10, paddingBottom: 10 }}
          >
            <p className={classes.label}>New Password</p>
            <input
              className={classes.input}
              style={{ border: "none" }}
              type={type}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            ></input>
            {type === "text" ? (
              <VisibilityOffOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setType("password");
                }}
              ></VisibilityOffOutlinedIcon>
            ) : (
              <VisibilityOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setType("text");
                }}
              ></VisibilityOutlinedIcon>
            )}
          </div>

          <div
            className={classes.input}
            style={{ height: 70, marginTop: 10, paddingBottom: 10 }}
          >
            <p className={classes.label}>Confirm New Password</p>
            <input
              className={classes.input}
              style={{ border: "none" }}
              type={typeConfirm}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            ></input>
            {typeConfirm === "text" ? (
              <VisibilityOffOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setTypeConfirm("password");
                }}
              ></VisibilityOffOutlinedIcon>
            ) : (
              <VisibilityOutlinedIcon
                className={classes.icon}
                onClick={() => {
                  setTypeConfirm("text");
                }}
              ></VisibilityOutlinedIcon>
            )}
          </div>
          <button
            className={classes.button}
            onClick={() => {
              if (newPassword === "") {
                notify("Please enter password!!");
              } else if (newPassword != confirmNewPassword) {
                notify("Passwords dont matchs!!");
              } else {
                setOpenLoader(true);
                changePassword(newPassword).then(
                  (res) => {
                    if (
                      res.statusText === "OK" ||
                      res.statusText === "Created"
                    ) {
                      setOpenLoader(false);
                      document.getElementById("back").click();
                    }
                  },
                  (error) => {
                    if (error.response) {
                      notify(error.response.data.message);
                    }
                    setOpenLoader(false);
                    console.log("This is response", error.response);
                  }
                );
              }
            }}
          >
            Save Changes
          </button>
        </Grid>
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
