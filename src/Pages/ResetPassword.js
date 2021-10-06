import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import LoginPic from "../assets/loginPic.png";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import {
  Login,
  resetPassword,
  providerResetPassword,
  customerResetPassword,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
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
  loginimg: {
    width: "50%", height: "45vh", [theme.breakpoints.down("sm")]: {
     width: "100%",
   }
   
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
function ResetPage(props) {
  const classes = useStyles();
  const [type, setType] = useState("password");
  const [state, setState] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // console.log("This is the reset props", props.match.params);
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
      <Link id="login" to="/login"></Link>
      <Link id="landing" to="/"></Link>
      <Grid container direction="row" justify="center" lg={12} >
      <img
        className={classes.loginimg}
        src={LoginPic}
      ></img>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 50 }}
      >
        <div
          className={classes.input}
          style={{ height: 50, marginTop: 50, paddingBottom: 10 }}
        >
          <p className={classes.label}> New Password</p>
          <input
            className={classes.input}
            style={{ border: "none" }}
            type={type}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
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
          <p className={classes.label}>Confirm New Password</p>
          <input
            className={classes.input}
            style={{ border: "none" }}
            type={type}
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
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
        <button
          className={classes.button}
          // onClick={() => {
          //   document.getElementById("signup").click();
          // }}
          onClick={() => {
            if (newPassword === "") {
              notify("Please Enter a password");
            } else if (newPassword != confirmNewPassword) {
              notify("Password do not match");
            } else {
              setOpenLoader(true);
              var data = {
                password: newPassword,
              };
              if (props.match.params.type === "customer") {
                customerResetPassword(props.match.params.id, newPassword).then(
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
                      document.getElementById("login").click();
                    }
                  },
                  (error) => {
                    if (error.response) {
                      if (error.response.data.seccess) {
                        document.getElementById("login").click();
                      } else {
                        notify(error.response.data.message);
                      }
                    }
                    setOpenLoader(false);
                    console.log("This is  error response", error.response);
                  }
                );
              } else {
                providerResetPassword(props.match.params.id, newPassword).then(
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
                      window.open("uplumberpro://auth/signin")
                      // document.getElementById("login").click();
                    }
                  },
                  (error) => {
                    if (error.response) {
                      console.log("THis is error.response",error.response.data.seccess)
                      if (error.response.data.success || error.response.data.seccess) {
                      //   document.getElementById("login").click();
                      notify("Password Changed Succesfully!");
                      window.open("uplumberpro://auth/signin")
                      } 
                      else {
                        notify(error.response.data.message);
                      }
                    }
                    setOpenLoader(false);
                    console.log("This is response", error.response);
                  }
                );
              }
            }
          }}
        >
          Reset
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
            <button className={classes.button} style={{ marginBottom: 40 }}>
              Reset Password
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(ResetPage);
