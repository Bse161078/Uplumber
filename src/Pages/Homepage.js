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
import moment from "moment";
import { withRouter } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Plumber from "../assets/Plumber.png";
import firebase from "firebase";
import Rating from "@material-ui/lab/Rating";
import ExploreIcon from "@material-ui/icons/Explore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonIcon from "@material-ui/icons/Person";
import { compose, withProps, withStateHandlers } from "recompose";
import { connectFirebase } from "../Config/firebase";
// import {
//   Map,
//   TileLayer,
//   Marker,
//   Popup,
//   LayersControl,
//   MapContainer,
// } from "react-leaflet";
// import "leaflet-routing-machine";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import MessageIcon from "@material-ui/icons/Message";
// import GoogleLayer, {
//   GOOGLE_LAYER_TYPES,
//   ADDITIONAL_GOOGLE_LAYERS,
// } from "react-leaflet-google-tile-layer";
// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import {
  AllProvidersByLocation,
  PostARequest,
  GetAllRequests,
  GetAllOffers,
  GetAllContacts,
  addContactToFavorite,
  cancelAllOffers,
  MyProfile,
  UpdateCustomerProfile,
  removeFavorite,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

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
  buttonSerial: {
    color: "white",
    border: "none",
    borderRadius: 15,
    width: 70,
    background: "#1075c2",
    height: 25,
    fontSize:16,
  margin:0,
  textAlign:'center',
  marginRight:5
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const HomePage = (props) => {
  console.log("This is props", props.match.params);
  const classes = useStyles();

  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [zoom, setZoom] = React.useState(4);
  const [online, setOnline] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("NearBy");
  const [activeServiceTab, setActiveServiceTab] = React.useState("Problem");
  const [openLoader, setOpenLoader] = useState(false);
  const [allProviders, setAllProviders] = useState(null);
  const [allOffers, setAllOffers] = useState(null);
  const [allContacts, setAllContacts] = useState(null);
  const [currentLocation, setCurrentLoction] = useState(null);
  const [openPopup, setOpenPopup] = useState(null);
  const [tokenFound, setTokenFound] = useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const position = [51.505, -0.09];
  console.log("This isid", localStorage.getItem("id"));
  console.log("This is token", localStorage.getItem("token"));

  const updateMyProfile = (fcmToken) => {
    var data = {
      fcmTokenWeb: fcmToken,
    };
    console.log("THis is the data", data);
    setOpenLoader(true);
    UpdateCustomerProfile(data).then(
      (res) => {
        if (res.data.success || res.status === 200 || res.status === 201) {
          setOpenLoader(false);
          console.log(res.data.data);
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

  const getToken = (setTokenFound) => {
    return firebase
      .messaging()
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          updateMyProfile(currentToken);
          setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  };

  const onMessageListener = () =>
    new Promise((resolve) => {
      firebase.messaging().onMessage((payload) => {
        resolve(payload);
      });
    });

  const calculateTheStatus = (item) => {
    var calculatedStatus = "";
    if (item.isAccepted) {
      calculatedStatus = "Offer Accepted";
      if (item.status === "pending") {
        calculatedStatus = "Job Not Started";
      } else if (item.status === "started") {
        calculatedStatus = "Job Started";
      } else if (item.status === "OrderCompleted") {
        calculatedStatus = "Job Completed";
      } else if (item.status === "onTheWay") {
        calculatedStatus = "Plumber On Way";
      } else if (item.status === "delivered") {
        calculatedStatus = "Delivered";
      } else if (item.status === "NeedModification") {
        calculatedStatus = "Need Modification";
      } else if (item.status === "OrderCompleted") {
        calculatedStatus = "Order Completed";
      } else if (item.status === "OrderCancelled") {
        calculatedStatus = "Order Cancelled";
      }
    } else {
      if (item.status === "OrderCancelled") {
        calculatedStatus = "Order Cancelled";
      } else {
        calculatedStatus = "Offer Created";
      }
    }
    return calculatedStatus;
  };

  const OfferCards = (props) => {
    var calculatedStatus = "";
    calculatedStatus = calculateTheStatus(props.item);
    var type = "";
    if (props.item.isOrderCompleted) {
      type = "Completed";
    } else if (props.item.isAccepted === true) {
      if (props.item.isNeedModification === true) {
        type = "In Modification";
      } else {
        type = "Accepted";
      }
    } else {
      type = "Pending";
    }
    if (props.item.isServiceCancelled == true) {
      type = "Cancelled";
    }
    // console.log("This sis great", props.item.providerProfileId);

    return calculatedStatus !== "Offer Created" &&
      calculatedStatus !== "Order Cancelled" &&
      calculatedStatus !== "Order Completed" &&
      calculatedStatus !== "Job Completed" ? (
      <Paper style={{ width: "90%", padding: 10, marginBottom: 10 }}>
        <Link
          id={"details" + props.item._id}
          to={"/details/" + props.item._id}
        ></Link>
        <Link
          id={"jobdetails" + props.item._id}
          to={"/jobDetails/" + props.item._id}
        ></Link>
        <Grid
          container
          direction="row"
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("This si he click", props.item);
            if (
              props.item.isAccepted != null
                ? props.item.isAccepted === false
                : props.item.serviceId.isAccepted === false
            ) {
              if (calculatedStatus != "Order Cancelled") {
                document.getElementById("details" + props.item._id).click();
                localStorage.setItem("job", JSON.stringify(props.item));
              } else {
                console.log("This is props item", props.item);
                localStorage.setItem("job", JSON.stringify(props.item));
                document.getElementById("jobdetails" + props.item._id).click();
              }
            } else if (
              props.item.isAccepted === true ||
              props.item.serviceId.isAccepted === true
            ) {
              console.log("This is props item", props.item);
              localStorage.setItem("job", JSON.stringify(props.item));
              document.getElementById("jobdetails" + props.item._id).click();
            }
          }}
        >
          <Grid item md={2} xs={2}>
            <img
              src={
                props.item.providerImage ||
                props.item.providerProfileId.profileImage
              }
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            ></img>
          </Grid>
          <Grid item md={6} xs={6}>
            <Grid container direction="row" style={{ marginLeft: 5 }}>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {props.item.providerName ||
                  props.item.providerProfileId.firstName +
                    " " +
                    props.item.providerProfileId.lastName}
              </p>
              <Rating
                value={
                  props.item.providerRating ||
                  props.item.providerProfileId.providerRating
                }
                style={{ fontSize: 10 }}
              ></Rating>
              <span style={{ fontSize: 10 }}>
                {props.item.providerRating ||
                  props.item.providerProfileId.providerRating}
                (
                {props.item.providerReviews ||
                  props.item.providerProfileId.providerReviews}
                ){" "}
              </span>
              <div style={{ width: "100%" }}></div>
              <span style={{ fontSize: 10 }}>
                ${props.item.pricePerHour || props.item.labourRatePerHour} / hr
              </span>
            </Grid>
          </Grid>
          <Grid item md={4} xs={4}>
            <div
              style={{
                background:
                  props.item.isAccepted === true ? "#e7f9e9" : "#e7f1f9",
                fontSize: 10,
                borderRadius: 10,
                padding: 4,
                textAlign: "center",
                color: props.item.isAccepted === true ? "#23c739" : "#60a3d6",
                cursor: "pointer",
              }}
            >
              {calculatedStatus}
            </div>
            {/* {type != "Completed" &&
              type != "Cancelled" &&
              type != "Accepted" &&
              calculatedStatus != "Order Cancelled" &&
              calculatedStatus != "Job Completed" &&
              calculatedStatus != "Job Not Started" && (
                <div
                  style={{
                    background: "red",
                    fontSize: 10,
                    borderRadius: 10,
                    padding: 4,
                    textAlign: "center",
                    color: "white",
                    cursor: "pointer",
                    marginTop: 4,
                  }}
                  onClick={() => {
                    if (
                      type != "Completed" &&
                      type != "Cancelled" &&
                      type != "Accepted"
                    ) {
                      cancleTheOffers(props.item.serviceId);
                    } else if (type === "Completed") {
                      notify("This order is already completed!!");
                    } else if (type === "Cancelled") {
                      notify("This order is already cancelled!!");
                    }
                  }}
                >
                  Cancel
                </div>
              )} */}
          </Grid>
        </Grid>
        <div style={{ width: "100%", border: "1px solid #f6f6f6" }}></div>
        <Grid
          container
          direction="row"
          justify="center"
          onClick={() => {
            console.log("This si he click", props.item);
            if (
              props.item.isAccepted != null
                ? props.item.isAccepted === false
                : props.item.serviceId.isAccepted === false
            ) {
              if (calculatedStatus != "Order Cancelled") {
                document.getElementById("details" + props.item._id).click();
                localStorage.setItem("job", JSON.stringify(props.item));
              } else {
                console.log("This is props item", props.item);
                localStorage.setItem("job", JSON.stringify(props.item));
                document.getElementById("jobdetails" + props.item._id).click();
              }
            } else if (
              props.item.isAccepted === true ||
              props.item.serviceId.isAccepted === true
            ) {
              console.log("This is props item", props.item);
              localStorage.setItem("job", JSON.stringify(props.item));
              document.getElementById("jobdetails" + props.item._id).click();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Date</span>
            <p style={{ fontSize: 10, margin: 0 }}>
              {props.item.serviceDate ||
                props.item.serviceId.problem.serviceDate}
            </p>
          </Grid>
          <Grid item md={6} xs={6}>
            <span style={{ color: "#60a3d6", fontSize: 10 }}>Item</span>
            <p style={{ fontSize: 10, margin: 0 }}>
              {" "}
              {props.item.itemName || props.item.serviceId.problem.problemItem}
            </p>
          </Grid>
        </Grid>
      </Paper>
    ) : (
      <div></div>
    );
  };

  const ContactCards = (props) => {
    // console.log("This is item", props.item);
    var user = props.item;
    console.log("THis is the user", user);
    var isFavorite = false;
    var favoritePlumber = props.item.customerProfileId.favouritPlumbers;
    favoritePlumber.map((plum) => {
      if (plum === props.item.providerProfileId._id) {
        isFavorite = true;
      }
    });

    var calculatedStatus = "";
    calculatedStatus = calculateTheStatus(props.item);
    if (
      calculatedStatus !== "Order Cancelled" &&
      calculatedStatus !== "Order Completed" &&
      calculatedStatus !== "Job Completed"
    ) {
      return (
        <Paper style={{ width: "90%", padding: 10, marginBottom: 10 }}>
          <Link
            id={"jobdetails" + props.item._id}
            to={"/jobDetails/" + props.item._id}
          ></Link>
          <Grid
            container
            direction="row"
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   // document.getElementById("jobdetails" + props.item._id).click();
            // }}
          >
            <Grid item md={2} xs={2}>
              <img
                src={user.providerProfileId.profileImage}
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              ></img>
            </Grid>
            <Grid item md={6} xs={6}>
              <Grid container direction="row" style={{ marginLeft: 5 }}>
                <p
                  style={{
                    width: "100%",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {user.providerProfileId.firstName +
                    " " +
                    user.providerProfileId.lastName}
                </p>
                <Rating value={5} style={{ fontSize: 10 }}></Rating>
                <span style={{ fontSize: 10 }}>
                  {user.providerProfileId.averageRating}(
                  {user.providerProfileId.ratings.length}){" "}
                </span>
                <div style={{ width: "100%" }}></div>
                <span style={{ fontSize: 10 }}>
                  ${user.providerProfileId.hourlyRates} / hr
                </span>
              </Grid>
            </Grid>
            <Grid item md={4} xs={4}>
              <Grid container direction="row">
                <p style={{fontSize:12, margin:0}}>
                {moment(user.serviceId.problem.serviceDate).format("MMMM Do YYYY")}
                </p>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <p className={classes.buttonSerial}>
                 SR {user.serviceId.serviceRequestNumber}
                </p>

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
                    {isFavorite ? (
                      <FavoriteIcon
                        onClick={() => {
                          removeFromFavorite(
                            user.providerProfileId._id,
                            !user.providerProfileId.isLike
                          );
                        }}
                        style={{ fontSize: 20 }}
                      ></FavoriteIcon>
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        onClick={() => {
                          addToFavorite(
                            user.providerProfileId._id,
                            !user.providerProfileId.isLike
                          );
                        }}
                        style={{ fontSize: 20 }}
                      ></FavoriteBorderOutlinedIcon>
                    )}
                  </Grid>
                </Paper>
              </Grid>
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.open(`tel:${user.providerProfileId.phoneNumber}`);
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
                <MessageIcon
                  style={{ fontSize: 18 }}
                  onClick={() => {
                    window.open(
                      `sms:${user.providerProfileId.phoneNumber}&body=Hi there i have recently placed on order you`
                    );
                  }}
                ></MessageIcon>{" "}
                Message
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      );
    } else {
      return <div></div>;
    }
  };

  const getMyProfile = () => {
    setOpenLoader(true);
    MyProfile().then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log(res.data.data);
          var user = res.data.data;
          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userAddress", user.address);
          localStorage.setItem("userUnit", user.unit);
          localStorage.setItem("userCity", user.city);
          localStorage.setItem("userState", user.state);
          localStorage.setItem("userZipCode", user.zipcode);
          localStorage.setItem(
            "userName",
            user.firstName + " " + user.lastName
          );
          localStorage.setItem("userPhone", user.phoneNumber);
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

  const addToFavorite = (id, like) => {
    setOpenLoader(true);
    addContactToFavorite(id, like).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          // notify(res.data.message);
          getAllMyOffers();
          console.log("This is the response of add to favorite", res.data);
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

  const removeFromFavorite = (id, like) => {
    setOpenLoader(true);
    removeFavorite(id, like).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          // notify(res.data.message);
          getAllMyOffers();
          console.log("This is the response of remove favorite", res.data);
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

  const getAllMyOffers = () => {
    setOpenLoader(true);
    GetAllOffers().then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          // setOpenLoader(true);
          // notify(res.data.message);
          console.log("These are customer offeres", res.data);
          localStorage.setItem("allOffers", JSON.stringify(res.data.Customers));
          setAllOffers(res.data.Customers);
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

  const getAllMyContacts = () => {
    setOpenLoader(true);
    GetAllContacts().then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200 ||
          res.statusText === 201
        ) {
          // setOpenLoader(false);
          // notify(res.data.message);
          setOpenLoader(false);
          console.log("These are customer contacts", res.data);
          localStorage.setItem(
            "allContacts",
            JSON.stringify(res.data.Customers)
          );
          setAllContacts(res.data.Customers);
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

  const getAllProvidersbyLocation = (lat, long, distance) => {
    // setOpenLoader(true);
    AllProvidersByLocation(lat, long, distance).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200
        ) {
          setOpenLoader(false);
          console.log("This is res for plumber", res);
          if (res.data.data.length === 0) {
            notify("No providers were found withing this radius!!");
          } else {
            localStorage.setItem("allProviders", JSON.stringify(res.data.data));
            setAllProviders(res.data.data);
          }
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

  const postMyRequest = () => {
    document.getElementById("requestAService/0").click();
    // if (localStorage.getItem("token")) {
    //   setOpenLoader(true);
    //   PostARequest().then(
    //     (res) => {
    //       if (
    //         res.data.success ||
    //         res.status === 200 ||
    //         res.status === 201 ||
    //         res.status === 200 ||
    //         res.statusText === 201 ||
    //         res.statusText === "OK" ||
    //         res.statusText === "Created" ||
    //         res.data.statusText === "OK" ||
    //         res.data.statusText === "Created" ||
    //         res.data.statusText === "OK"
    //       ) {
    //         setOpenLoader(false);
    //         console.log(res.data);
    //         localStorage.setItem("requestId", res.data._id);
    //         document.getElementById("requestAService/0").click();
    //       }
    //     },
    //     (error) => {
    //           if(error.response)
    // {
    //   notify(error.response.data.message);
    // }
    //       setOpenLoader(false);
    //       console.log("This is response", error.response);
    //     }
    //   );
    // } else {
    //   notify("You need to login in ordere to post request!");
    // }
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return true;
    } else {
      alert("App need your location work properly");
    }
    return false;
  };

  const showPosition = (position) => {
    console.log("This is the position", position.coords);
    if (localStorage.getItem("already") === null) {
      setCurrentLoction(position.coords);
      setZoom(12);
    }
    if (localStorage.getItem("already") === null) {
      localStorage.setItem("already", "already");
      setInterval(() => {
        getAllProvidersbyLocation(
          position.coords.latitude,
          position.coords.longitude,
          100000000000
        );
      }, 10000);
    }
  };
  const [already, setAlready] = useState(false);
  useEffect(async () => {
    getLocation();

    let fb = await connectFirebase();
    getToken(setTokenFound);
    console.log("This is fb", fb);
    if (localStorage.getItem("allProviders")) {
      setAllProviders(JSON.parse(localStorage.getItem("allProviders")));
    }
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("allOffers")) {
        setAllOffers(JSON.parse(localStorage.getItem("allOffers")));
      }

      if (localStorage.getItem("allContacts")) {
        setAllContacts(JSON.parse(localStorage.getItem("allContacts")));
      }
      getAllMyOffers();
      getAllMyContacts();
      getMyProfile();
      if (props.match.params.id === "contacts") {
        setActiveTab("Services");
      }
    }
  }, []);
  const notify = (data) => toast(data);
  // if (allProviders) {
  //   console.log("These are latlong", currentLocation);
  // }
  // console.log("These are latlong", currentLocation);
  // console.log("THis is zoom", zoom);

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2mTVqK-uOK_Pbo0tTXyUtUP84cClbS9Q&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: (
        <div
          style={{
            maxHeight: "calc( 100vh - 150px )",
            height: "calc( 100vh - 150px )",
          }}
        />
      ),
      mapElement: <div style={{ height: "100%" }} />,
    }),
    withStateHandlers(
      () => ({
        isOpen: false,
      }),
      {
        onToggleOpen:
          ({ isOpen }) =>
          () => ({
            isOpen: !isOpen,
          }),
      }
    ),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={
        currentLocation
          ? {
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }
          : { lat: -34.397, lng: 150.644 }
      }
    >
      {allProviders &&
        allProviders.map((item) => {
          // console.log("THis isthe lat long", item.location);
          if (item.isOnline) {
            var averageRating = 0;
            item.ratings &&
              item.ratings.map((item) => {
                averageRating = averageRating + item;
              });
            if (item.ratings.length > 0) {
              averageRating = averageRating / item.ratings.length;
            }

            return (
              <Marker
                id="findMarker"
                icon={Plumber}
                position={{ lat: item.location[1], lng: item.location[0] }}
                onClick={props.onToggleOpen}
                onClick={() => {
                  setOpenPopup(item.providerId);
                }}
              >
                {openPopup === item.providerId && (
                  <InfoWindow
                    onCloseClick={() => {
                      setOpenPopup(null);
                    }}
                  >
                    <div style={{ width: 100 }}>
                      <Grid container direction="row" justify="center">
                        <img
                          src={item.profileImage}
                          style={{ width: 50, height: 50, borderRadius: 40 }}
                        ></img>
                        <p
                          style={{
                            width: "100%",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          {item.firstName + " " + item.lastName}
                        </p>
                        <Rating
                          value={averageRating}
                          style={{ fontSize: 10 }}
                        ></Rating>
                        <span style={{ fontSize: 10 }}>
                          {averageRating}({item.ratings && item.ratings.length}){" "}
                        </span>
                        <p
                          style={{
                            fontSize: 10,
                            width: "100%",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          ${item.hourlyRates + "/hr"}
                        </p>
                      </Grid>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          }
        })}
    </GoogleMap>
  ));

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

      <Grid>
        <Link id={"requestAService/0"} to={"requestAService/0"}></Link>
        {/* <div style={{ width: "100%" }}></div> */}
        {activeTab === "NearBy" ? (
          <MyMapComponent key="map"></MyMapComponent>
        ) : activeTab === "Offers" ? (
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
              <div style={{ height: 120, width: "100%" }}></div>
            </Grid>
          </Grid>
        ) : (
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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              style={{ height: "max-content" }}
            >
              {allOffers &&
                allOffers.map((item, index) => {
                  return (
                    <ContactCards index={index} item={item}></ContactCards>
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
              <Sidebar postMyRequest={postMyRequest}></Sidebar>
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
            zIndex: 10000000,
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
                style={{ color: activeTab === "Services" ? "black" : "gray" }}
                onClick={() => {
                  setActiveTab("Services");
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
                  Services
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default withRouter(HomePage);
