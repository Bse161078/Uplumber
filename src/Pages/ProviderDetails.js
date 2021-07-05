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
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import {
  acceptOffer,
  getProviderReviews,
  sendCustomerNotification,
  markOrderCancelled,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [typeConfirm, setTypeConfirm] = useState("text");
  const [openLoader, setOpenLoader] = useState(false);
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Contacts");
  const [reviews, setReviews] = useState(false);

  const sendCustomeNotification = (text, serviceId) => {
    setOpenLoader(true);
    sendCustomerNotification(
      jobData.providerId,
      text,
      serviceId,
      jobData._id
    ).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log("Accept Notification", res.data);
          // notify("Location Request sent");
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

  const orderCancel = () => {
    setOpenLoader(true);
    markOrderCancelled(jobData._id).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
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

  const acceptTheOffer = () => {
    setOpenLoader(true);
    acceptOffer(jobData._id).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log("This is accepted", res.data);
          sendCustomeNotification(
            "Your request for " + jobData.serviceId._id + "has been accepted",
            jobData.serviceId._id
          );
          setOfferAccepted(true);
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

  const providerReviews = (jobData) => {
    setOpenLoader(true);
    getProviderReviews(jobData.providerId).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log(res.data);
          setReviews(res.data.Customer);
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

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];

  useEffect(() => {
    if (localStorage.getItem("job")) {
      setJobData(JSON.parse(localStorage.getItem("job")));
      providerReviews(JSON.parse(localStorage.getItem("job")));
    }
  }, []);
  console.log("This is the job", jobData);
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
                onClick={() => {
                  orderCancel();
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
                  acceptTheOffer();
                }}
              >
                Accept
              </Grid>
            </Grid>
          </Grid>
        )}
        {jobData && (
          <Grid
            container
            direction="row"
            justify="center"
            style={{ height: "max-content" }}
          >
            <img
              src={jobData.providerImage}
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
                {" "}
                ${jobData.pricePerHour || jobData.labourRatePerHour} / hr
              </span>
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

                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.serviceDate || jobData.serviceId.problem.serviceDate}
                </p>
              </Grid>
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>Item</span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.itemName || jobData.serviceId.problem.problemItem}
                </p>
              </Grid>
              {/* estimatedDistance: "20 miles"
​
estimatedTravelTime: "20 minutes" */}
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Distance
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.estimatedDistance}
                </p>
              </Grid>
              <Grid item md={6} xs={6}>
                <span style={{ color: "#60a3d6", fontSize: 10 }}>
                  Estimated Travel Time
                </span>
                <p style={{ fontSize: 10, margin: 0 }}>
                  {jobData.estimatedTravelTime}
                </p>
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
                  {jobData.providerName ||
                    jobData.providerProfileId.firstName +
                      " " +
                      jobData.providerProfileId.lastName}
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
              {reviews &&
                reviews.map((item) => {
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
                              <Rating
                                value={5}
                                style={{ fontSize: 12 }}
                              ></Rating>
                              <span style={{ fontSize: 12 }}>5.0(433) </span>
                              <div style={{ width: "100%" }}></div>
                              <span style={{ fontSize: 12 }}>$25 / hr</span>
                              <div style={{ width: "100%" }}></div>
                              <span>{item.comment}</span>
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
