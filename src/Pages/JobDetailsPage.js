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
import {
  needModificationOffer,
  markOrderComplete,
  acceptNewCompletionDate,
  setProviderReviews,
  sendCustomerNotification,
} from "../ApiHelper";

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
  const [commentText, setCommentText] = React.useState("");
  const [rating, setRating] = React.useState(null);
  const [openLoader, setOpenLoader] = useState(false);

  const [leadUnpaid, setLeadUnpaid] = React.useState(false);
  const [notStarted, setNotStarted] = React.useState(false);
  const [plumberOnWay, setPlumberOnWay] = React.useState(false);
  const [jobDelivered, setJobDelivered] = React.useState(false);

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
    console.log(
      "THis is the job in job details",
      JSON.parse(localStorage.getItem("job"))
    );

    setJobData(JSON.parse(localStorage.getItem("job")));
    if (localStorage.getItem("job")) {
      if (JSON.parse(localStorage.getItem("job")).status === "") {
        setLeadUnpaid(true);
      }
      if (JSON.parse(localStorage.getItem("job")).status === "pending") {
        setNotStarted(true);
      }
      if (JSON.parse(localStorage.getItem("job")).status === "onTheWay") {
        setPlumberOnWay(true);
      }
      if (JSON.parse(localStorage.getItem("job")).status === "delivered") {
        setJobDelivered(true);
      }

      if (
        JSON.parse(localStorage.getItem("job")).status === "NeedModification"
      ) {
        setModification(true);
      }
      if (JSON.parse(localStorage.getItem("job")).status === "OrderCompleted") {
        setMarkComplete(true);
      }
    }
  }, []);
  console.log("This is the job", jobData);
  const needModification = () => {
    setOpenLoader(true);
    needModificationOffer(jobData._id, modificationText).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log(res.data);
          setNeedModifications(false);
          setModification(true);
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
  };

  const requestLocation = () => {
    setOpenLoader(true);
    sendCustomerNotification(
      jobData.providerId,
      "Send Location",
      jobData.serviceId,
      jobData._id
    ).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          console.log("Location requst", res.data);
          setOpenLoader(false);
          notify("Location Reques sent");
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
  };

  const orderComplete = () => {
    setOpenLoader(true);
    markOrderComplete(jobData._id).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200 ||
          res.statusText === 201 ||
          res.statusText === "OK" ||
          res.statusText === "Created" ||
          res.data.statusText === "OK" ||
          res.data.statusText === "Created" ||
          res.data.statusText === "OK"
        ) {
          setOpenLoader(false);
          console.log(res.data);
          setMarkComplete(true);
          setBottomState(true);
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
  };

  const acceptNewDate = () => {
    setOpenLoader(true);
    acceptNewCompletionDate(
      jobData._id,
      jobData.newEstimatedCompletionDate
    ).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log("This is the acceptNew Date response", res.data);
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
  };

  const givereRating = () => {
    setOpenLoader(true);
    setProviderReviews(
      jobData.customerId,
      jobData.providerId,
      rating,
      commentText
    ).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log("This is rating response", res.data);
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
        ) : leadUnpaid ? (
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
              Lead Unpaid
            </p>
          </Grid>
        ) : notStarted ? (
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
              Job Not Started
            </p>
          </Grid>
        ) : plumberOnWay ? (
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
              Plumber On The Way
            </p>
          </Grid>
        ) : jobDelivered ? (
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
              Job Delivered
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
                  {jobData.providerName ||
                    jobData.providerProfileId.firstName +
                      " " +
                      jobData.providerProfileId.lastName}
                </p>
                <Rating
                  value={
                    jobData.providerRating ||
                    jobData.providerProfileId.providerRating
                  }
                  style={{ fontSize: 10 }}
                ></Rating>
                <span style={{ fontSize: 10 }}>
                  {jobData.providerRating ||
                    jobData.providerProfileId.providerRating}
                  (
                  {jobData.providerReviews ||
                    jobData.providerProfileId.providerReviews}
                  ){" "}
                </span>
                <div style={{ width: "100%" }}></div>
                <span style={{ fontSize: 10 }}>
                  ${jobData.pricePerHour || jobData.labourRatePerHour} / hr
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
                    {jobData.itemName || jobData.serviceId.problem.problemItem}
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
                  {jobData.serviceName || jobData.serviceId.problem.serviceName}
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
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.providerProfileId.phoneNumber}
                </p>
              </Grid>{" "}
              <Grid item md={12} xs={12}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Provider Email
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {" "}
                  {jobData.providerProfileId.email}
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
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Work Hours
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.estimatedHours} hrs
                </p>
              </Grid>{" "}
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Completion Date
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {" "}
                  {jobData.serviceDate || jobData.serviceId.problem.serviceDate}
                </p>
              </Grid>{" "}
              <Grid item md={12} xs={12}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Labour Cost
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  $ {jobData.labourRatePerHour}
                </p>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              style={{ paddingBottom: 5, paddingTop: 5 }}
            >
              {JSON.parse(localStorage.getItem("job"))
                .newEstimatedCompletionDate &&
                JSON.parse(localStorage.getItem("job")).status != "delivered" &&
                JSON.parse(localStorage.getItem("job")).status !=
                  "NeedModification" && (
                  <button
                    className={classes.button}
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      acceptNewDate();
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      Accept New Completion Date
                    </Grid>
                  </button>
                )}
              {JSON.parse(localStorage.getItem("job")).status ===
                "delivered" && (
                <button
                  className={classes.button}
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    orderComplete();
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
              )}

              {JSON.parse(localStorage.getItem("job")).status ===
                "onTheWay" && (
                <button
                  className={classes.button}
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    requestLocation();
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    Request Location
                  </Grid>
                </button>
              )}

              {JSON.parse(localStorage.getItem("job")).status ===
                "delivered" && (
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
              )}
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
            <Rating
              style={{ fontSize: 40 }}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            ></Rating>
            <p className={classes.label}>Write Something</p>
            <input
              className={classes.input}
              placeholder="Write Something"
              style={{ border: "none" }}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            ></input>
            <button
              className={classes.button}
              onClick={() => {
                if (commentText != "" && rating != null) {
                  givereRating();
                } else {
                  notify("Please add a comment and rating");
                }
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
