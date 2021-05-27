import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Switch,
  withStyles,
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
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MessageIcon from "@material-ui/icons/Message";
import {
  AllProviders,
  PostARequest,
  GetAllRequests,
  GetAllOffers,
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
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        border: `2px solid #1075c2`,
      },
    },
    "&$focusVisible $thumb": {
      color: "#1075c2",
      border: `2px solid #1075c2`,
    },
  },
  thumb: {
    width: 24,
    height: 24,
    color: "#1075c2",
  },
  track: {
    borderRadius: 26 / 2,
    border: `2px solid #1075c2`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
export default function HomePage(pros) {
  const classes = useStyles();

  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [online, setOnline] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("NearBy");
  const [activeServiceTab, setActiveServiceTab] = React.useState("Problem");
  const [openLoader, setOpenLoader] = useState(false);
  const [allProviders, setAllProviders] = useState(null);
  const [allOffers, setAllOffers] = useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const position = [51.505, -0.09];
  console.log("This isid", localStorage.getItem("id"));
  const OfferCards = (props) => {
    var type = props.item;
    if (props.item.isAccepted === true) {
      type = "jobStarted";
    }

    return (
      <Paper style={{ width: "90%", padding: 10, marginBottom: 10 }}>
        <Link
          id={"details" + props.item._id}
          to={"/details/" + props.item._id}
        ></Link>
        <Link
          id={"jobdetails" + props.item._id}
          to={"/jobDetails/" + props.item._id}
        ></Link>
        <Grid container direction="row">
          <Grid item md={2} xs={2}>
            <img
              src={props.item.providerImage}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            ></img>
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
                {props.item.providerName}
              </p>
              <Rating
                value={props.item.providerRating}
                style={{ fontSize: 10 }}
              ></Rating>
              <span style={{ fontSize: 10 }}>
                {props.item.providerRating}({props.item.providerReviews}){" "}
              </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 10 }}>
                ${props.item.pricePerHour} / hr
              </span>
            </Grid>
          </Grid>
          <Grid item md={3} xs={3}>
            <div
              style={{
                background:
                  props.item.status === "Pending" ? "#e7f9e9" : "#e7f1f9",
                fontSize: 10,
                borderRadius: 10,
                padding: 4,
                textAlign: "center",
                color: props.item.status === "Pending" ? "#23c739" : "#60a3d6",
                cursor: "pointer",
              }}
              onClick={() => {
                if (props.item.isAccepted === false) {
                  document.getElementById("details" + props.item._id).click();
                } else if (props.item.isAccepted === true) {
                  document
                    .getElementById("jobdetails" + props.item._id)
                    .click();
                }
              }}
            >
              {props.item.status}
            </div>
          </Grid>
        </Grid>
        <div style={{ width: "100%", border: "1px solid #f6f6f6" }}></div>
        <Grid container direction="row" justify="center">
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Date</span>
            <p style={{ fontSize: 10, margin: 0 }}>{props.item.serviceDate}</p>
          </Grid>
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Item</span>
            <p style={{ fontSize: 10, margin: 0 }}> {props.item.itemName}</p>
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

  const getAllMyOffers = () => {
    setOpenLoader(true);
    GetAllOffers().then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          // notify(res.data.message);
          console.log("These are customer offeres", res.data);
          setAllOffers(res.data.Customers);
        }
      },
      (error) => {
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };

  const getAllProviders = () => {
    setOpenLoader(true);
    AllProviders().then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          console.log(res.data.Providers);
          setAllProviders(res.data.Providers);
        }
      },
      (error) => {
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };

  const postMyRequest = () => {
    setOpenLoader(true);
    PostARequest().then(
      (res) => {
        if (res.statusText === "OK" || res.statusText === "Created") {
          setOpenLoader(false);
          console.log(res.data);
          localStorage.setItem("requestId", res.data._id);
          document.getElementById("requestAService/0").click();
        }
      },
      (error) => {
        notify("Something went wrong!");
        setOpenLoader(false);
        console.log("This is response", error);
      }
    );
  };

  useEffect(() => {
    getAllProviders();
    getAllMyOffers();
  }, []);
  const notify = (data) => toast(data);
  return (
    <div style={{ background: "#f2f2f2" }}>
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
          maxHeight: "calc( 100vh - 150px )",
          minHeight: "calc( 100vh - 150px )",
          overflowY: "scroll",
          // background: "gray",
        }}
      >
        <Link id={"requestAService/0"} to={"requestAService/0"}></Link>
        {/* <div style={{ width: "100%" }}></div> */}
        {activeTab === "NearBy" ? (
          <Map
            center={
              allProviders && [
                allProviders[0].latitude,
                allProviders[0].longitude,
              ]
            }
            zoom={4}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {allProviders &&
              allProviders.map((item) => {
                return (
                  <Marker position={[item.latitude, item.longitude]}>
                    <Popup style={{ width: 120 }}>
                      <Grid container direction="row" justify="center">
                        <img
                          src={item.profileImage}
                          style={{ width: 40, height: 40, borderRadius: "50%" }}
                        ></img>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            margin: 0,
                            fontWeight: 600,
                          }}
                        >
                          {item.firstName + " " + item.lastName}
                        </p>
                        <Grid container direction="row">
                          <Rating value={5} style={{ fontSize: 10 }}></Rating>
                          <span style={{ fontSize: 10 }}>5.0(433) </span>
                        </Grid>
                        <span style={{ fontSize: 10 }}>$25 / hr</span>
                      </Grid>
                    </Popup>
                  </Marker>
                );
              })}
          </Map>
        ) : activeTab === "Offers" ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{ height: "max-content" }}
          >
            {allOffers &&
              allOffers.map((item, index) => {
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

        <Paper
          style={{
            width: "100%",
            position: "absolute",
            zIndex: 1000,
            bottom: 0,
            borderRadius: 40,
          }}
          onClick={() => {
            // setBottomState(!bottomState);
          }}
        >
          <Grid
            container
            direction="row"
            justify="center"
            // alignItems="center"
            style={{
              height: bottomState == true ? 300 : 150,
              width: "100%",
              padding: 20,
            }}
          >
            <button
              className={classes.button}
              style={{
                height: 50,
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginLeft: 10,
                minWidth: "90%",
                fontSize: 11,
                width: "max-content",
                background: "#1075c2",
                color: "white",
              }}
              onClick={() => {
                postMyRequest();
                //
              }}
            >
              Request A Service
            </button>
          </Grid>{" "}
        </Paper>
        <Paper
          elevation={10}
          style={{
            height: 60,
            background: "white",
            position: "absolute",
            zIndex: 100000000,
            bottom: 0,
            width: "100vw",
            // borderTop: "1px solid gray",
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
