import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Switch,
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
import { enableNotification } from "../ApiHelper";
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
function NotificationSetting(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [calendar, setCalendar] = React.useState(false);
  const [postRequest, setPostRequest] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [activeTab, setActiveTab] = React.useState("Problem");
  const [image, setImage] = React.useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [type, setType] = useState("text");

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
  //console.log("THis is great", props);
  const enableMyNotifications = (data) => {
    setOpenLoader(true);
    enableNotification(data).then(
      (res) => {
        console.log("THis is res", res.data.data);
        if (res.data.success) {
          console.log("THis is res");
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setOpenLoader(false);
          document.getElementById("back").click();
        }
      },
      (error) => {
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };
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
          {[
            { name: "Enable  Notifications", href: "/changePassword" },
            { name: "Request Accepted", href: "/notificationSetting" },
            { name: "Offer Recieved", href: "/terms" },
            { name: "Feedback Reminders", href: "/terms" },
          ].map((item) => {
            var checked = false;
            if (item.name === "Enable  Notifications") {
              console.log(
                "This is grate",
                JSON.parse(localStorage.getItem("userData")).enableNotification
              );
              if (
                JSON.parse(localStorage.getItem("userData"))
                  .enableNotification === true
              ) {
                checked = true;
              }
            } else if (item.name === "Feedback Reminders") {
              if (
                JSON.parse(localStorage.getItem("userData"))
                  .feedbackReminders === true
              ) {
                checked = true;
              }
            } else if (item.name === "Request Accepted") {
              if (
                JSON.parse(localStorage.getItem("userData")).requestAccepted ===
                true
              ) {
                checked = true;
              }
            } else if (item.name === "Offer Recieved") {
              if (
                JSON.parse(localStorage.getItem("userData")).offerReceived ===
                true
              ) {
                checked = true;
              }
            }
            return (
              <Grid
                container
                direction="row"
                style={{
                  background: "white",
                  height: 50,
                  borderBottom: "1px solid #e9e9e9",
                  cursor: "pointer",
                }}
                alignItems="center"
              >
                <Link to={item.href} id={item.href}></Link>
                <Grid item md={10} xs={10}>
                  <p style={{ margin: 0, marginLeft: 20, fontWeight: "600" }}>
                    {item.name}
                  </p>
                </Grid>
                <Grid item md={2} xs={2}>
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      if (item.name === "Enable  Notifications") {
                        enableMyNotifications({
                          enableNotification: true,
                        });
                      } else if (item.name === "Feedback Reminders") {
                        enableMyNotifications({
                          feedbackReminders: true,
                        });
                      } else if (item.name === "Request Accepted") {
                        enableMyNotifications({
                          requestAccepted: true,
                        });
                      } else if (item.name === "Offer Recieved") {
                        enableMyNotifications({
                          offerReceived: true,
                        });
                      }
                    }}
                    checked={checked}
                    // onClick={() => {
                    //   document.getElementById(item.href).click();
                    // }}
                  ></Switch>
                </Grid>
              </Grid>
            );
          })}{" "}
          <button
            className={classes.button}
            style={{ position: "absolute", bottom: 10 }}
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
export default withRouter(NotificationSetting);
