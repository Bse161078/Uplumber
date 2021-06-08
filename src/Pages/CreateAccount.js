import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import { Signup } from "../ApiHelper";
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
  const [typeConfirm, setTypeConfirm] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accept, setAccept] = useState(true);
  const [openLoader, setOpenLoader] = useState(false);
  const [state, setState] = React.useState(false);

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
          <Link id="complete" to="/complete-profile"></Link>
          <ArrowBackIosIcon style={{ marginLeft: 20 }}></ArrowBackIosIcon>
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
                  Accept terms and conditions
                </span>
              </Grid>
            </Grid>
          </Grid>
        </div>{" "}
        <button
          className={classes.button}
          onClick={() => {
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
              Signup(data).then(
                (res) => {
                  if (
                    res.data.success ||
                    res.data.statusText === "OK" ||
                    res.data.statusText === "Created" ||
                    res.data.statusText === "OK"
                  ) {
                    setOpenLoader(false);
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data._id);
                    localStorage.setItem("email", email);
                    document.getElementById("complete").click();
                    notify("Account Created Succesfully!");
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
