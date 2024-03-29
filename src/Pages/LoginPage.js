import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import moment, { locale } from "moment";
import { Link } from "react-router-dom";
import LoginPic from "../assets/loginPic.png";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import {
  Login,
  sendForgotLink,
  PostARequest,
  CustomerSericeUpdateProblem,
  CustomerSericeUpdateLookingfor,
  CustomerSericeUpdateProperty,
  CustomerSericeUpdateDescriptionAndPhoto,
  CustomerSericeUpdateInssurance,
  CustomerSericeUpdateContactDetails,
  MyProfile,
  UpdateCustomerProfile,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
var validator = require("email-validator");
const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "50%",
    height: 40,
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  loginimg: {
    width: "50%",
    height: "45vh",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  label: {
    width: "50%",
    color: "#aeaeae",
    margin: 0,
    fontSize: 13,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  rememberMeDiv: {
    width: "50%",
    marginTop: 30,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  icon: {
    color: "#aeaeae",
  },
  button: {
    color: "white",
    border: "none",
    borderRadius: 15,
    width: "50%",
    background: "#1075c2",
    height: 45,
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const [type, setType] = useState("password");
  const [state, setState] = React.useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    expiryDate: localStorage.getItem("expiryDate") || new Date(),
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

  const getMyProfile = () => {
    MyProfile().then(
      (res) => {
        console.log(res.data.data, "response = ");
        if (
          (res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.status === 200) &&
          res.data.data.is_deleted === false
        ) {
          console.log(res.data, "res.data.is_deleted");
          document.getElementById("home").click();
          const activeTab = localStorage.getItem("activeTab");
          if (activeTab === "ReviewRequest") {
            document.getElementById("requestAService/0").click();
          }
        } else if (res.data.success === 404) {
          document.getElementById("home").click();
        } else if (res.data.data.is_deleted === true) {
          console.log(res.data.is_deleted, "res.data.is_deleted");
          notify("Your Profile is Deleted!");
        }
      },
      (error) => {
        setOpenLoader(false);
        if (error.response) {
          // notify(error.response.data.message);
          document.getElementById("completeProfile").click();
        }
        setOpenLoader(false);
        console.log("This is response", error.response);
      }
    );
  };

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

  const [accept, setAccept] = useState(true);
  const [openLoader, setOpenLoader] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  useEffect(() => {
    getLocation();
    // console.log(window.history, "Get history")
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
      notify("You need to login in order to post request!");
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
  const updateMyProfile = (fcmToken) => {
    var data = {
      fcmTokenWeb: localStorage.getItem("fcmToken"),
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

  const notify = (data) => toast(data);

  return (
    <div>
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
      <Link id="home" to="/homepage"></Link>
      <Link id="completeProfile" to="/complete-profile"></Link>

      <Link id="landing" to="/"></Link>
      <Grid container direction="row" justify="center" lg={12}>
        <img className={classes.loginimg} src={LoginPic}></img>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 50 }}
      >
        <p className={classes.label}>Email</p>
        <input
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
            style={{ border: "none", width: "90%" }}
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
        <Grid container direction="row" justify="center">
          <div className={classes.rememberMeDiv}>
            <Grid container direction="row">
              <Grid item md={6} xs={6}>
                <Grid container direction="row" alignItems="center">
                  <CheckCircleIcon
                    onClick={() => {
                      setAccept(!accept);
                    }}
                    style={{ fontSize: 18, color: accept ? "#1075c2" : "gray" }}
                  ></CheckCircleIcon>{" "}
                  <span
                    style={{ fontSize: 13, fontWeight: 500, marginLeft: 10 }}
                  >
                    Remember me
                  </span>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="flex-end">
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      color: "#1a7bbf",
                    }}
                    onClick={() => {
                      setState(true);
                    }}
                  >
                    Forgot Password?
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <button
          className={classes.button}
          // onClick={() => {
          //   document.getElementById("signup").click();
          // }}
          onClick={() => {
            var mail = email.replace(" ", "");
            if (!validator.validate(mail)) {
              console.log("This is an email", mail);
              notify("Please Enter a valid Email");
            } else if (password === "") {
              notify("Please Enter a password");
            } else {
              setOpenLoader(true);
              var data = {
                email: mail.toLowerCase(),
                password: password,
              };
              Login(data).then(
                (res) => {
                  console.log("This is login res", res);
                  if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201
                  ) {
                    setOpenLoader(false);
                    const user = res.data;

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data._id);
                    updateMyProfile();
                    localStorage.setItem("email", email);
                    if (localStorage.getItem("requestAfterLogin")) {
                      localStorage.removeItem("requestAfterLogin");
                      postMyRequest();
                    } else {
                      getMyProfile();
                    }
                  }
                },
                (error) => {
                  if (error.response) {
                    notify(error.response.data.message);
                  }
                  setOpenLoader(false);
                  console.log("This is response", error.response.data.message);
                }
              );
            }
            // document.getElementById("complete").click();
          }}
        >
          Log In
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
            <input
              className={classes.input}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            ></input>
            <button
              className={classes.button}
              style={{ marginBottom: 40 }}
              onClick={() => {
                var mail = newEmail.replace(" ", "");
                if (!validator.validate(mail)) {
                  console.log("THis is the email", mail);
                  notify("Please Enter a valid Email");
                } else {
                  setOpenLoader(true);
                  var data = {
                    email: mail.toLowerCase(),
                  };
                  sendForgotLink(data).then(
                    (res) => {
                      console.log("This is signup res", res);
                      if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201
                      ) {
                        setOpenLoader(false);
                        setState(false);
                        notify("Password Change Email Sent Succesfully!");
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
                // document.getElementById("complete").click();
              }}
            >
              Reset Password
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
