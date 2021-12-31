import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import {Link, withRouter} from "react-router-dom";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import {
  Signup,
  PostARequest,
  CustomerSericeUpdateProblem,
  CustomerSericeUpdateLookingfor,
  CustomerSericeUpdateProperty,
  CustomerSericeUpdateDescriptionAndPhoto,
  CustomerSericeUpdateInssurance,
  CustomerSericeUpdateContactDetails,
} from "../ApiHelper";
var validator = require("email-validator");

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "90%",
    height: 40,
    fontSize: 16,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
  },
  label: {
    width: "90%",
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
function LoginPage(props) {
  const classes = useStyles();
  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");
  const [email, setEmail] = useState(localStorage.getItem("userEmail")||"");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accept, setAccept] = useState(true);
  const [openLoader, setOpenLoader] = useState(false);
  const [state, setState] = React.useState(false);

  const [requestData, setRequestData] = useState({
    requestDate: localStorage.getItem("requestDate") || new Date(),
    prfferedTime: localStorage.getItem("prfferedTime") || "As soon a possible",
    itemName: localStorage.getItem("itemName") || "Air-Conditioner",
    serviceType: localStorage.getItem("serviceType") || "Repair",
    requestOption:
      localStorage.getItem("requestOption") || "Auto accept 1st offer",
    waterDamage: localStorage.getItem("waterDamage") || "No",
    lookingFor:
      localStorage.getItem("lookingFor") != null
        ? JSON.parse(localStorage.getItem("lookingFor"))
        : ["Plumbing Technician"],
    area: localStorage.getItem("area") || "",
    structure: localStorage.getItem("structure") || "",
    requestorStatus: localStorage.getItem("requestorStatus") || "",
    description: localStorage.getItem("description"),
    image: localStorage.getItem("image")
      ? JSON.parse(localStorage.getItem("image"))
      : [],
    company: localStorage.getItem("company") || "",
    policyNumber: localStorage.getItem("policyNumber") || "",
    expiryDate: localStorage.getItem("expiryDate") || "",
    deduction: localStorage.getItem("deduction") || "",
    userName: localStorage.getItem("userName"),
    userPhone: localStorage.getItem("userPhone"),
    allowSms: localStorage.getItem("allowSms")
      ? JSON.parse(localStorage.getItem("allowSms"))
      : true,
    allowContact: "yes",
    userEmail: localStorage.getItem("userEmail"),
    userAddress: localStorage.getItem("userAddress"),
    userUnit: localStorage.getItem("userUnit"),
    userCity: localStorage.getItem("userCity"),
    userState: localStorage.getItem("userState"),
    userZipCode: localStorage.getItem("userZipCode"),
    currentLocation:
      localStorage.getItem("userCurrentLocation") &&
      JSON.parse(localStorage.getItem("userCurrentLocation")),
  });

  const [currentLocation, setCurrentLoction] = useState({
    latitude: 112.0988,
    longitude: 133.44,
  });
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
    setCurrentLoction(position.coords);
  };

  console.log("THis is reqeustor data on signup", requestData);

  useEffect(() => {
    getLocation();
  }, []);

  const postMyRequest = () => {
    if (localStorage.getItem("token")) {
      setOpenLoader(true);
      PostARequest().then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200 ||
            res.statusText === 201
          ) {
            setOpenLoader(false);
            console.log(res.data);
            localStorage.setItem("requestId", res.data._id);
              updateCustomerProblem();
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
    } else {
      notify("You need to login in ordere to post request!");
    }
  };

  const updateCustomerProblem = () => {
    if (
      requestData.requestDate != "" &&
      requestData.prfferedTime != "" &&
      requestData.itemName != "" &&
      requestData.serviceType != "" &&
      requestData.anyFloorOrWaterDamage != "" &&
      requestData.serviceType != ""
    ) {
      setOpenLoader(true);
      var data = {
        serviceDate: requestData.requestDate,
        serviceTime: requestData.prfferedTime,
        problemItem: requestData.itemName,
        serviceName: requestData.serviceType,
        requestMany:
          requestData.requestOption === "Auto accept 1st offer" ? false : true,
        autoAccept:
          requestData.requestOption === "Auto accept 1st offer" ? true : false,
        anyFloorOrWaterDamage: requestData.waterDamage === "Yes" ? true : false,
        serviceCode: requestData.serviceType,
      };
      CustomerSericeUpdateProblem(data).then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200 ||
            res.statusText === 201
          ) {
            setOpenLoader(false);
            localStorage.removeItem("requestDate");
            localStorage.removeItem("prfferedTime");
            localStorage.removeItem("itemName");
            localStorage.removeItem("serviceType");
            localStorage.removeItem("requestOption");
            console.log(res);
            // notify(res.data.message);
            updateCustomerLookingFor();
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
    } else {
      notify("Please fill  all feilds!!");
    }
  };

  const updateCustomerLookingFor = () => {
    setOpenLoader(true);
    var data = {
      lookingFor: requestData.lookingFor,
    };
    CustomerSericeUpdateLookingfor(data).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200 ||
          res.statusText === 201
        ) {
          setOpenLoader(false);
          console.log(res);
          // notify(res.data.message);
          localStorage.removeItem("lookingFor");
          updateCustomerProperty();
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

  const updateCustomerProperty = () => {
    if (
      requestData.area != "" &&
      requestData.structure != "" &&
      requestData.requestorStatus != ""
    ) {
      setOpenLoader(true);
      var data = {
        area: requestData.area,
        structure: requestData.structure,
        requesterStatus: requestData.requestorStatus,
      };
      CustomerSericeUpdateProperty(data).then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200 ||
            res.statusText === 201
          ) {
            setOpenLoader(false);
            console.log(res);
            // notify(res.data.message);
            localStorage.removeItem("area");
            localStorage.removeItem("structure");
            localStorage.removeItem("requestorStatus");
            updateCustomerPropertyDescriptionAndProperty();
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
    } else {
      notify("Please fill all fields!!");
    }
  };

  const updateCustomerPropertyDescriptionAndProperty = (tab) => {
    if (requestData.description != "") {
      setOpenLoader(true);
      var data = {
        description: requestData.description,
        photos: requestData.image,
      };
      CustomerSericeUpdateDescriptionAndPhoto(data).then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200 ||
            res.statusText === 201
          ) {
            setOpenLoader(false);
            // notify(res.data.message);
            console.log(res);
            localStorage.removeItem("description");
            localStorage.removeItem("image");
            if (requestData.waterDamage === "Yes") {
              updateCustomerPropertyInssurance();
            } else {
              updateCustomerContactDetails();
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
    } else {
      notify("Please add description!");
    }
  };

  const updateCustomerPropertyInssurance = (tab) => {
    setOpenLoader(true);
    var data = {
      company: requestData.company,
      policyNumber: localStorage.getItem("policyNumber"),
      expiryDate: requestData.expiryDate,
      deduction: localStorage.getItem("deduction"),
    };
    CustomerSericeUpdateInssurance(data).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.status === 200 ||
          res.statusText === 201
        ) {
          setOpenLoader(false);
          // notify(res.data.message);
          console.log(res);
          localStorage.removeItem("company");
          localStorage.removeItem("policyNumber");
          localStorage.removeItem("expiryDate");
          localStorage.removeItem("deduction");
          updateCustomerContactDetails();
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
  // console.log("This si t", requestData);

  const updateCustomerContactDetails = (tab) => {
    if (
      requestData.userName != "" &&
      requestData.userPhone != "" &&
      requestData.userEmail != "" &&
      requestData.userAddress != "" &&
      requestData.userCity != "" &&
      requestData.userState != "" &&
      requestData.userZipCode != ""
    ) {
      setOpenLoader(true);
      var data = {
        name: requestData.userName,
        phone: requestData.userPhone,
        allowSms: requestData.allowSms,
        email: requestData.userEmail,
        address: requestData.userAddress,
        latitude:
          localStorage.getItem("userCurrentLocation") &&
          JSON.parse(localStorage.getItem("userCurrentLocation")).latitude,
        longitude:
          localStorage.getItem("userCurrentLocation") &&
          JSON.parse(localStorage.getItem("userCurrentLocation")).longitude,
        unit: requestData.userUnit,
        city: requestData.userCity,
        state: requestData.userState,
        zipCode: requestData.userZipCode,
      };
      CustomerSericeUpdateContactDetails(data).then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200 ||
            res.statusText === 201 ||
            res.statusText === "OK"
          ) {
            setOpenLoader(false);
            // notify(res.data.message);
            console.log(res);
            localStorage.removeItem("userName");
            localStorage.removeItem("userPhone");
            localStorage.removeItem("allowSms");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userAddress");
            localStorage.removeItem("userUnit");
            localStorage.removeItem("userCity");
            localStorage.removeItem("userState");
            localStorage.removeItem("userZipCode");
            localStorage.removeItem("userCurrentLocation");
            document.getElementById("complete").click();
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
    } else {
      notify("Please provide all information!");
    }
  };


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
  const notify = (data) => toast(data);

  return (
    <div>
      {" "}
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
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ height: 60 }}
        >
          <Link
              id="complete"
              to={{
                  pathname: '/complete-profile',
                  state: { email: email,password:password }
              }}
          ></Link>
          <Link id="homepage" to="/homepage"></Link>
          <ArrowBackIosIcon
            style={{ marginLeft: 20 }}
            onClick={() => {
              document.getElementById("homepage").click();
            }}
          ></ArrowBackIosIcon>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 18,
              margin: 0,
              textAlign: "center",
              width: "85%",
            }}
          >
            Create Account
          </p>
          {/* <Grid item md={5} xs={5}>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ height: 60 }}
            >
            
            </Grid>
          </Grid>
          <Grid item md={7} xs={7}>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ height: 60 }}
            >
            
            </Grid>
          </Grid>
       */}
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 50 }}
      >
        <p className={classes.label}>Email</p>
        <input
          type="email"
          className={classes.input}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <div
          className={classes.input}
          style={{ height: 50, marginTop: 50, paddingBottom: 10 }}
        >
          <p className={classes.label}>Password</p>
          <input
            className={classes.input}
            style={{ border: "none" }}
            type={type}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
          style={{ height: 50, marginTop: 50, paddingBottom: 10 }}
        >
          <p className={classes.label}>Confirm Password</p>
          <input
            className={classes.input}
            style={{ border: "none" }}
            type={typeConfirm}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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
        <div style={{ width: "90%", marginTop: 30 }}>
          <Grid container direction="row">
            <Grid item md={12} xs={12}>
              <Grid container direction="row" alignItems="center">
                <CheckCircleIcon
                  onClick={() => {
                    setAccept(!accept);
                  }}
                  style={{ fontSize: 18, color: accept ? "#1075c2" : "gray" }}
                ></CheckCircleIcon>{" "}
                <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 10 }}>
                  Accept{" "}
                  <a
                    href="https://www.u-plumber.com/terms"
                    style={{ textDecoration: "none", color: "#1075c2" }}
                  >
                    terms and conditions
                  </a>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </div>{" "}
        <button
          className={classes.button}
          onClick={async () => {
            if (!validator.validate(email)) {
              console.log("This is an email", email);
              notify("Please Enter a valid Email");
            } else if (password === "") {
              notify("Please Enter a password");
            } else if (password != confirmPassword) {
              notify("Password do not match");
            } else {
              setOpenLoader(true);
              var data = {
                email: email,
                password: password,
              };
              /*Signup(data).then(
                (res) => {
                  console.log("This is signup res", res);
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
                    console.log("This is greate", res.data.token);
                    localStorage.setItem("tokenTemp", res.data.token);
                    localStorage.setItem("idTemp", res.data._id);
                    // localStorage.setItem("token", res.data.token);
                    // localStorage.setItem("id", res.data._id);
                    localStorage.setItem("email", email);
                    if (localStorage.getItem("requestAfterLogin")) {
                      localStorage.removeItem("requestAfterLogin");
                      postMyRequest(res.data.token);
                    } else {
                      document.getElementById("complete").click();
                    }
                    
                  }
                },
                (error) => {
                  if (error.response) {
                    notify(error.response.data.message);
                  }
                  setOpenLoader(false);
                  console.log("This is response", error.response.data.messag);
                }
              );*/

                props.history.push({
                    pathname: '/complete-profile',
                    state: { email: email,password:password }
                })
                //document.getElementById("complete").click();

            }
          }}
        >
          Register
        </button>
        <Drawer
          anchor={"bottom"}
          open={state}
          onClose={toggleDrawer("bottom", false)}
        >
          <p style={{ fontWeight: 600, fontSize: 26, textAlign: "center" }}>
            Reset your password
          </p>
          <Grid container direction="row" justify="center">
            <p style={{ width: "90%", textAlign: "center", marginTop: 0 }}>
              Enter your email and we will send you a link where you can reset
              your password
            </p>

            <p className={classes.label} style={{ fontSize: 14 }}>
              Email
            </p>
            <input className={classes.input}></input>
            <button
              className={classes.button}
              style={{ marginBottom: 40 }}
              onClick={() => {}}
            >
              Register
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(LoginPage);
