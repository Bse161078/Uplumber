import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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
}));
export default function LoginPage() {
  const classes = useStyles();
  const [type, setType] = useState("text");
  const [typeConfirm, setTypeConfirm] = useState("text");

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

  return (
    <div>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ height: 60 }}
        >
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
        <p className={classes.label}>Username</p>
        <input className={classes.input}></input>
        <div
          className={classes.input}
          style={{ height: 50, marginTop: 50, paddingBottom: 10 }}
        >
          <p className={classes.label}>Password</p>
          <input
            className={classes.input}
            style={{ border: "none" }}
            type={type}
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
            type={type}
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
                <CheckCircleIcon style={{ fontSize: 18 }}></CheckCircleIcon>{" "}
                <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 10 }}>
                  Accept terms and conditions
                </span>
              </Grid>
            </Grid>
          </Grid>
        </div>{" "}
        <button className={classes.button}>Register</button>
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
            <button className={classes.button} style={{ marginBottom: 40 }}>
              Register
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
