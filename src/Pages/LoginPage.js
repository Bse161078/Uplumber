import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginPic from "../assets/loginPic.png";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import { Login, resetPassword } from "../ApiHelper";
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
                  console.log(res);
                  if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201
                  ) {
                    setOpenLoader(false);

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data._id);

                    localStorage.setItem("email", email);
                    document.getElementById("home").click();
                  }
                },
                (error) => {
                  notify("Something went wrong!");
                  setOpenLoader(false);
                  console.log("This is response", error);
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
                if (!validator.validate(newEmail)) {
                  console.log("THis is the email", newEmail);
                  notify("Please Enter a valid Email");
                } else if (newPassword === "") {
                  notify("Please Enter a password");
                } else if (newPassword != confirmNewPassword) {
                  notify("Password do not match");
                } else {
                  setOpenLoader(true);
                  var data = {
                    email: newEmail,
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
                      notify("There was a problem changing password!");
                      setOpenLoader(false);
                      console.log("This is response", error);
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
