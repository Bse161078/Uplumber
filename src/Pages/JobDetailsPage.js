import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { needModificationOffer } from "../ApiHelper";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 12,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [markComplete, setMarkComplete] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState("text");
  const [jobData, setJobData] = useState(null);
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [needModifications, setNeedModifications] = React.useState(false);
  const [modification, setModification] = React.useState(false);
  const [modificationText, setModificationText] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Contacts");
  const [openLoader, setOpenLoader] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
    setMarkComplete(true);
  };
  const position = [51.505, -0.09];
  //console.log("THis is great", props);

  useEffect(() => {
    if (localStorage.getItem("job")) {
      setJobData(JSON.parse(localStorage.getItem("job")));
    }
  }, []);
  console.log("This is the job", jobData);
  const needModification = () => {
    setOpenLoader(true);
    needModificationOffer(jobData._id, modificationText).then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          console.log(res.data);
          setNeedModifications(true);
          setModification(true);
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
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Service Details"}
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
        {modification ? (
          <Grid
            container
            direction="row"
            justify="center"
            spacing={1}
            style={{
              background: "#ff9100",
              height: "max-content",
              position: "absolute",
            }}
          >
            {" "}
            <p style={{ color: "white", width: "100%", textAlign: "center" }}>
              Job in Modification
            </p>
          </Grid>
        ) : markComplete ? (
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
              Job Completed
            </p>
          </Grid>
        ) : (
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
        )}
        {jobData && (
          <Grid
            container
            direction="row"
            style={{
              marginTop: 100,
              height: 60,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Grid item md={2} xs={2}>
              <img
                src={jobData.providerImage}
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
                  {jobData.providerName}
                </p>
                <Rating
                  value={jobData.providerRating}
                  style={{ fontSize: 10 }}
                ></Rating>
                <span style={{ fontSize: 10 }}>
                  {jobData.providerRating}({jobData.providerReviews}){" "}
                </span>
                <div style={{ width: "100%" }}></div>
                <span style={{ fontSize: 10 }}>
                  ${jobData.pricePerHour} / hr
                </span>
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
                    {jobData.itemName}
                  </p>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Travel Time
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.estimatedTravelTime}
                </p>
              </Grid>{" "}
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>Service</span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {" "}
                  {jobData.serviceName}
                </p>
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
              <button className={classes.button} style={{ marginTop: 10 }}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  Accept New Completion Date
                </Grid>
              </button>
              <button
                className={classes.button}
                style={{ marginTop: 10 }}
                onClick={() => {
                  setBottomState(true);
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  Job Acceptance
                </Grid>
              </button>
              <button
                className={classes.button}
                style={{
                  marginTop: 10,
                  background: "#efefef",
                  color: "black",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setNeedModifications(true);
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  Need Modification
                </Grid>
              </button>
            </Grid>
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
                setMarkComplete(true);
              }}
            >
              Submit
            </button>
          </Grid>
        </Drawer>

        <Drawer
          anchor={"bottom"}
          open={needModifications}
          onClose={() => {
            setNeedModifications(false);
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
              Need Modification
            </p>
            <p className={classes.label}>Write Description</p>
            <input
              className={classes.input}
              placeholder="Write Something"
              style={{ border: "none" }}
              onChange={(e) => {
                setModificationText(e.target.value);
              }}
            ></input>
            <button
              className={classes.button}
              onClick={() => {
                needModification();
              }}
            >
              Submit
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(ProviderDetail);
