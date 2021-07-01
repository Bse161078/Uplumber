import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import LoginPic from "../assets/loginPic.png";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import {
  Login,
  resetPassword,
  PostARequest,
  CustomerSericeUpdateProblem,
  CustomerSericeUpdateLookingfor,
  CustomerSericeUpdateProperty,
  CustomerSericeUpdateDescriptionAndPhoto,
  CustomerSericeUpdateInssurance,
  CustomerSericeUpdateContactDetails,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
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
export default function LoginPage() {
  const classes = useStyles();
  const [type, setType] = useState("password");
  const [state, setState] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [requestData, setRequestData] = useState({
    requestDate: moment(new Date()).format("MMMM Do YYYY"),
    prfferedTime: localStorage.getItem("prfferedTime") || "As soon a possible",
    itemName: localStorage.getItem("itemName") || "Air Conditioner",
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
  });

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

  const postMyRequest = (id) => {
    if (localStorage.getItem("token") || id) {
      console.log("Posting a requeset");
      setOpenLoader(true);
      PostARequest().then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.statusText === "Success" ||
            res.statusText === "Created"
          ) {
            console.log(res.data);
            localStorage.setItem("requestId", res.data._id);
            setTimeout(() => {
              updateCustomerProblem();
            }, 600);
            setTimeout(() => {
              updateCustomerLookingFor();
            }, 800);
            setTimeout(() => {
              if (requestData.waterDamage === "Yes") {
                updateCustomerProperty();
              }
            }, 900);
            setTimeout(() => {
              updateCustomerPropertyDescriptionAndProperty();
            }, 1000);
            setTimeout(() => {
              if (requestData.waterDamage === "Yes") {
                updateCustomerPropertyInssurance();
              }
            }, 1300);
            setTimeout(() => {
              updateCustomerContactDetails();
            }, 1600);
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
        anyFloorOrWaterDamage: requestData.waterDamage === "yes" ? true : false,
        serviceCode: requestData.serviceType,
      };
      CustomerSericeUpdateProblem(data).then(
        (res) => {
          if (
            res.data.success ||
            res.status === 200 ||
            res.status === 201 ||
            res.statusText === "Success" ||
            res.statusText === "Created"
          ) {
            setOpenLoader(false);
            localStorage.removeItem("requestDate");
            localStorage.removeItem("prfferedTime");
            localStorage.removeItem("itemName");
            localStorage.removeItem("serviceType");
            localStorage.removeItem("requestOption");
            console.log(res);
            notify(res.data.message);
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
          res.status === 200 ||
          res.status === 201 ||
          res.statusText === "Success" ||
          res.statusText === "Created"
        ) {
          setOpenLoader(false);
          console.log(res);
          // notify(res.data.message);
          localStorage.removeItem("lookingFor");
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
            res.status === 200 ||
            res.status === 201 ||
            res.statusText === "Success" ||
            res.statusText === "Created"
          ) {
            setOpenLoader(false);
            console.log(res);
            // notify(res.data.message);
            localStorage.removeItem("area");
            localStorage.removeItem("structure");
            localStorage.removeItem("requestorStatus");
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
            res.status === 200 ||
            res.status === 201 ||
            res.statusText === "Success" ||
            res.statusText === "Created"
          ) {
            setOpenLoader(false);
            // notify(res.data.message);
            console.log(res);
            localStorage.removeItem("description");
            localStorage.removeItem("image");
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
      policyNumber: requestData.policyNumber,
      expiryDate: requestData.expiryDate,
      deduction: requestData.deduction,
    };
    CustomerSericeUpdateInssurance(data).then(
      (res) => {
        if (
          res.data.success ||
          res.status === 200 ||
          res.status === 201 ||
          res.statusText === "Success" ||
          res.statusText === "Created"
        ) {
          setOpenLoader(false);
          // notify(res.data.message);
          console.log(res);
          localStorage.removeItem("company");
          localStorage.removeItem("policyNumber");
          localStorage.removeItem("expiryDate");
          localStorage.removeItem("deduction");
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
        latitude: 112.0988,
        longitude: 133.4444,
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
            notify("Request has been submitted!");
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
            document.getElementById("home").click();
            // document.getElementById("complete").click();
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
      <Link id="landing" to="/"></Link>
      <img
        style={{ width: "100%" }}
        onClick={() => {
          document.getElementById("landing").click();
        }}
        src={LoginPic}
      ></img>
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
        <div style={{ width: "90%", marginTop: 30 }}>
          <Grid container direction="row">
            <Grid item md={6} xs={6}>
              <Grid container direction="row" alignItems="center">
                <CheckCircleIcon
                  onClick={() => {
                    setAccept(!accept);
                  }}
                  style={{ fontSize: 18, color: accept ? "#1075c2" : "gray" }}
                ></CheckCircleIcon>{" "}
                <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 10 }}>
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

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data._id);
                    localStorage.setItem("email", email);
                    if (localStorage.getItem("requestAfterLogin")) {
                      localStorage.removeItem("requestAfterLogin");
                      postMyRequest();
                    } else {
                      document.getElementById("home").click();
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

            <p className={classes.label} style={{ fontSize: 14, marginTop: 5 }}>
              New Password
            </p>
            <input
              className={classes.input}
              type="password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            ></input>
            <p className={classes.label} style={{ fontSize: 14, marginTop: 5 }}>
              Confirm New Password
            </p>
            <input
              className={classes.input}
              type="password"
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
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
                } else if (newPassword === "") {
                  notify("Please Enter a password");
                } else if (newPassword != confirmNewPassword) {
                  notify("Password do not match");
                } else {
                  setOpenLoader(true);
                  var data = {
                    email: mail.toLowerCase(),
                    password: newPassword,
                  };
                  resetPassword(data).then(
                    (res) => {
                      console.log("This is signup res", res);
                      if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201
                      ) {
                        setOpenLoader(false);
                        setState(false);
                        notify("Password Changed Succesfully!");
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
